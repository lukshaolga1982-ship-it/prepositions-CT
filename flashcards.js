export function parseFlashcards(input){
  const lines=String(input||'').split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
  if(lines.length>200)throw Error('Не более 200 карточек в одном наборе.');
  const cards=[];
  for(const [index,line] of lines.entries()){
    const pieces=line.split('\t').map(s=>s.trim());
    if(pieces.length<2||pieces.length>3||!pieces[0]||!pieces[1])throw Error(`Строка ${index+1}: разделите выражение, перевод и необязательное предложение клавишей Tab.`);
    if(pieces.some(s=>s.length>300))throw Error(`Строка ${index+1}: слишком длинный текст (максимум 300 символов).`);
    cards.push({id:`c${index+1}`,front:pieces[0],back:pieces[1],...(pieces[2]?{example:pieces[2]}:{})});
  }
  if(!cards.length)throw Error('Добавьте хотя бы одну пару «выражение — перевод».');
  return cards;
}
export function updateFlashcardProgress(progress,setId,cardId,kind){
  const all={...(progress||{})},prev=all[setId]||{};
  const difficult=new Set(prev.difficult||[]),known=new Set(prev.known||[]);
  if(kind==='difficult')difficult.add(cardId);
  if(kind==='known')known.add(cardId);
  if(kind==='clear')difficult.delete(cardId);
  all[setId]={difficult:[...difficult],known:[...known]};
  return all;
}
