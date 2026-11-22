/** Accept only the iframe source of a Wordwall or Quizlet official embed. */
export function parseLearningEmbed(input){
  const raw=String(input||'').trim();
  const match=raw.match(/<iframe\b[^>]*?\bsrc\s*=\s*(["'])(.*?)\1/i);
  const candidate=match?match[2].replace(/&amp;/gi,'&'):raw;
  let url;
  try{url=new URL(candidate)}catch{throw Error('Вставьте ссылку на встраивание или HTML-код iframe из Wordwall / Quizlet.')}
  if(url.protocol!=='https:'||url.username||url.password)throw Error('Разрешены только защищённые HTTPS-ссылки.');
  const host=url.hostname.toLowerCase();
  let provider;
  if(host==='wordwall.net'||host==='www.wordwall.net'){
    if(!/^\/(?:[a-z]{2}\/)?embed\/[a-f0-9]{20,40}\/?$/i.test(url.pathname))throw Error('Для Wordwall скопируйте код через «Встроить → Iframe».');
    provider='Wordwall';
  }else if(host==='quizlet.com'||host==='www.quizlet.com'){
    if(!/^\/\d+\/(?:flashcards|match|learn|test|spell)\/embed\/?$/i.test(url.pathname))throw Error('Для Quizlet выберите «Встроить → Copy HTML» в публичном наборе.');
    provider='Quizlet';
  }else throw Error('Поддерживаются только Wordwall и Quizlet.');
  // Strip unrecognised query options, and never store or execute user HTML.
  const allowed=provider==='Wordwall'?['themeId','templateId','fontStackId','ref']:['i','x'];
  for(const key of [...url.searchParams.keys()])if(!allowed.includes(key))url.searchParams.delete(key);
  url.hash='';url.hostname=provider==='Wordwall'?'wordwall.net':'quizlet.com';
  return{provider,embedUrl:url.toString()};
}
