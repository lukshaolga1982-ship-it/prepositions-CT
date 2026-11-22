import {dualContextTasks,transformationTasks} from './ct-formats.js';

const prepWords=new Set('at in on to for from with of by about into over under between against through after before without among across along around off out up down'.split(' '));
const norm=s=>String(s||'').trim().toLowerCase().replace(/\s+/g,' ');
const escaped=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const unique=items=>[...new Map(items.map(x=>[norm(x.prompt||x.first||x.original||x.front),x])).values()];
export const ACTIVITY_LABELS={matching:'Matching',quiz:'Quiz · фразы в контексте',articles:'Articles · a/an/the',prepositions:'Prepositions',b1:'B1–B3 · предлоги',b7:'B7–B8 · общее слово',b19:'B19 · перефразирование'};

export function suggestActivities(cards,bank=[]){
  const result=Object.fromEntries(Object.keys(ACTIVITY_LABELS).map(key=>[key,[]]));
  const selected=(cards||[]).filter(c=>c.front&&c.back).slice(0,200);
  result.matching=selected.map(c=>({id:c.id,front:c.front,back:c.back}));
  const contexts=[];
  for(const card of selected){
    let sentence=String(card.example||'').trim();
    if(!sentence){
      const match=bank.find(x=>norm(x.expression)===norm(card.front)&&x.gapSentence&&x.answer);
      if(match)sentence=String(match.gapSentence).replace('___',match.answer);
    }
    if(!sentence)continue;
    const match=new RegExp(escaped(card.front),'i').exec(sentence);
    if(!match)continue;
    const full=sentence.slice(match.index,match.index+match[0].length);
    contexts.push({card,sentence,matchIndex:match.index,full});
    result.quiz.push({id:card.id,prompt:sentence.slice(0,match.index)+'___'+sentence.slice(match.index+full.length),answer:card.front,hint:card.back});
    const tokens=[...full.matchAll(/\b[a-z]+\b/gi)];
    const article=tokens.find(m=>/^(a|an|the)$/i.test(m[0]));
    if(article){const start=match.index+article.index;result.articles.push({id:card.id,prompt:sentence.slice(0,start)+'___'+sentence.slice(start+article[0].length),answer:article[0].toLowerCase(),hint:card.back})}
    const prep=tokens.find(m=>prepWords.has(m[0].toLowerCase()));
    if(prep){const start=match.index+prep.index;const task={id:card.id,prompt:sentence.slice(0,start)+'___'+sentence.slice(start+prep[0].length),answer:prep[0].toLowerCase(),hint:card.back};result.prepositions.push(task);result.b1.push(task)}
  }
  const pairs=new Map();
  for(const {card,sentence} of contexts){
    const first=norm(card.front).split(' ')[0];
    if(!/^[a-z]+$/.test(first)||prepWords.has(first))continue;
    const found=new RegExp('\\b'+escaped(first)+'\\b','i').exec(sentence);
    if(!found)continue;
    const prompt=sentence.slice(0,found.index)+'___'+sentence.slice(found.index+found[0].length);
    if(!pairs.has(first))pairs.set(first,[]);pairs.get(first).push({card,prompt});
  }
  for(const [word,pool] of pairs){
    if(pool.length<2)continue;
    for(let i=0;i+1<pool.length;i+=2){
      if(pool[i].card.id===pool[i+1].card.id)continue;
      result.b7.push({id:`${pool[i].card.id}-${pool[i+1].card.id}`,first:pool[i].prompt,second:pool[i+1].prompt,answer:word});
    }
  }
  // Existing exam transformations may be reused only when their collocation
  // is actually in this teacher's set. Never fabricate paraphrases.
  const setPhrases=new Set(selected.map(c=>norm(c.front)));
  for(const item of transformationTasks){
    if([...setPhrases].some(phrase=>phrase.length>=5&&(norm(item.original).includes(phrase)||norm(item.answer).includes(phrase))))result.b19.push({...item});
  }
  // Same for proven two-context examples that are already in the exam bank.
  for(const item of dualContextTasks){
    const fullA=norm(item.first.replace('___',item.answer)),fullB=norm(item.second.replace('___',item.answer));
    if([...setPhrases].some(phrase=>phrase.length>=5&&(fullA.includes(phrase)||fullB.includes(phrase))))result.b7.push({...item});
  }
  for(const key of Object.keys(result))result[key]=unique(result[key]).slice(0,20);
  return result;
}
