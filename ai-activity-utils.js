const clean=s=>String(s||'').toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9а-яё\s]+/gi,' ').replace(/\s+/g,' ').trim();
const words=s=>new Set(clean(s).split(' ').filter(Boolean));
const similarity=(a,b)=>{
  const x=words(a),y=words(b);if(!x.size||!y.size)return 0;
  const intersection=[...x].filter(w=>y.has(w)).length;
  return intersection/(x.size+y.size-intersection);
};
export const questionText=(task,format)=>format==='b7'?`${task.first||''} ${task.second||''}`:format==='b19'?`${task.original||''} ${task.template||''}`:task.prompt||'';
export function collectExistingSentences(activities){
  return Object.entries(activities||{}).flatMap(([format,tasks])=>(tasks||[]).map(task=>questionText(task,format))).filter(Boolean);
}
export function cleanAIDrafts(format,candidates,existing=[]){
  const accepted=[],seen=[...existing];
  if(!['quiz','articles','prepositions','b1','b7','b19'].includes(format)||!Array.isArray(candidates))return accepted;
  for(const original of candidates.slice(0,20)){
    if(!original||typeof original!=='object')continue;
    const fields=format==='b7'?['first','second','answer']:format==='b19'?['original','template','keyword','answer']:['prompt','answer','hint'];
    const item={id:`ai_${crypto.randomUUID?.()||Math.random().toString(36).slice(2)}`};
    let valid=true;
    for(const field of fields){
      const value=original[field];
      if(value===undefined&&field==='hint'){item.hint='';continue}
      if(typeof value!=='string'||!value.trim()||value.length>600){valid=false;break}
      item[field]=value.trim();
    }
    if(!valid)continue;
    if(format==='b7'&&(!item.first.includes('___')||!item.second.includes('___')))continue;
    if(format==='b19'&&!item.template.includes('___'))continue;
    if(!['b7','b19'].includes(format)&&!item.prompt.includes('___'))continue;
    const text=questionText(item,format);
    if(seen.some(used=>clean(text)===clean(used)||similarity(text,used)>=.78))continue;
    accepted.push(item);seen.push(text);
    if(accepted.length===5)break;
  }
  return accepted;
}
