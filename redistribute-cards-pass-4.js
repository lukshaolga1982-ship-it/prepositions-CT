import fs from 'node:fs';import {expressionKey} from '../practice-utils.js';
const path=new URL('../data/expressions.json',import.meta.url),data=JSON.parse(fs.readFileSync(path,'utf8'));
const byId=new Map(data.expressions.map(x=>[x.id,x]));const distinct=c=>new Set(data.expressions.filter(x=>x.cardId===c).map(expressionKey)).size;
const moves=[];function move(code,to){const x=byId.get('exp_'+code);if(!x)throw Error(code);if(x.cardId===to||distinct(x.cardId)<=20)return;moves.push({id:x.id,from:x.cardId,to});x.cardId=to}
// Make information and research a coherent card before removing unrelated fixed phrases.
const inflow={
  9:'0054 0250 0330 0332 0439 0705 0788 0841 0843 0943 1012',
  18:'0187 0551 0851',
  6:'0358 0964',
  7:'0328 0973',
  2:'0354',
  11:'0344 0628 0384',
  32:'0329 0362 0572',
  33:'0370 0382 0664',
  34:'0167 0390 0395',
  19:'0402 0634',
  21:'1100 0991',
  15:'0374',
  3:'0409',
  14:'0994',
  5:'0887',
  13:'0273',
  23:'0268 0269',
};
for(const [to,raw] of Object.entries(inflow))for(const code of raw.split(' '))move(code,Number(to));
const outflow={
  2:'0832 0833',
  3:'0834',
  5:'0826',
  25:'0828',
  17:'0830',
  10:'0504 0932',
  12:'0822',
  15:'0824',
  20:'0823',
};
for(const [to,raw] of Object.entries(outflow))for(const code of raw.split(' '))move(code,Number(to));
for(const card of data.cards)if(distinct(card.id)<20)throw Error('Card '+card.id);
fs.writeFileSync(path,JSON.stringify(data,null,2)+'\n');
const rp=new URL('../CARD_REDISTRIBUTION_PASS_1.json',import.meta.url),report=JSON.parse(fs.readFileSync(rp,'utf8'));
report.fourthPass=moves;report.total+=moves.length;report.cards=data.cards.map(c=>({id:c.id,title:c.title,total:data.expressions.filter(x=>x.cardId===c.id).length,distinct:distinct(c.id)}));
fs.writeFileSync(rp,JSON.stringify(report,null,2)+'\n');console.log('Fourth pass',moves.length,'total',report.total);
