import fs from 'node:fs';
import {expressionKey} from '../practice-utils.js';
const path=new URL('../data/expressions.json',import.meta.url),data=JSON.parse(fs.readFileSync(path,'utf8'));
const byId=new Map(data.expressions.map(x=>[x.id,x]));
const distinct=card=>new Set(data.expressions.filter(x=>x.cardId===card).map(expressionKey)).size;
const changes=[];
function move(code,to){const id='exp_'+code,x=byId.get(id);if(!x)throw Error(id);if(x.cardId===to||distinct(x.cardId)<=20)return;changes.push({id,from:x.cardId,to});x.cardId=to}
// Add clear thematic expressions to the cards with the weakest fit before moving any out.
const add={
  8:'0120 0193 0247 0369 0575 0746 0847 0905 0997 1027 1031 1032',
  19:'0400 0275 1000 0570 0250 0330 0697',
  21:'0195 0627 0618 0374 0634 0973',
  22:'0543 0553 0220 1112 1113 1114 1115',
  25:'1101 0875 1102 0321 0702',
  26:'0342 0343 0604 0799 0800 0578',
  27:'0065 0877 0879 0882 0910 0867',
  30:'0054 0439 0772 0892 0969 1006',
};
for(const [to,codes] of Object.entries(add))for(const code of codes.split(' '))move(code,Number(to));
const remove={
  1:'0855',
  2:'0192 0415 0539',
  3:'0154 1099',
  5:'0866',
  7:'0408 0431',
  9:'0504 0932',
  10:'0885 0886',
  11:'0773 0774 0889',
  13:'0194 0764',
  14:'0871 0883',
  15:'1106',
  16:'0853 0861 1013',
  18:'0868',
  20:'0858',
  21:'0873',
  23:'1120',
  25:'0418',
  27:'0248',
  31:'0517',
  33:'0436 0864',
  34:'0532 0960',
};
for(const [to,codes] of Object.entries(remove))for(const code of codes.split(' '))move(code,Number(to));
for(const c of data.cards)if(distinct(c.id)<20)throw Error('Card below 20: '+c.id);
fs.writeFileSync(path,JSON.stringify(data,null,2)+'\n');
const rp=new URL('../CARD_REDISTRIBUTION_PASS_1.json',import.meta.url),r=JSON.parse(fs.readFileSync(rp,'utf8'));
r.thirdPass=changes;r.total+=changes.length;r.cards=data.cards.map(c=>({id:c.id,title:c.title,total:data.expressions.filter(x=>x.cardId===c.id).length,distinct:distinct(c.id)}));
fs.writeFileSync(rp,JSON.stringify(r,null,2)+'\n');console.log('Third pass',changes.length,'total',r.total);
