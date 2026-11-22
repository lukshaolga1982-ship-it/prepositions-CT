import fs from 'node:fs';
import {expressionKey} from '../practice-utils.js';
const path=new URL('../data/expressions.json',import.meta.url),data=JSON.parse(fs.readFileSync(path,'utf8'));
const byId=new Map(data.expressions.map(x=>[x.id,x]));
const count=id=>new Set(data.expressions.filter(x=>x.cardId===id).map(expressionKey)).size;
const changed=[];
function move(code,to){const id=`exp_${code}`,x=byId.get(id);if(!x)throw Error(id);if(x.cardId===to||count(x.cardId)<=20)return;changed.push({id,from:x.cardId,to});x.cardId=to}
// Fill thin thematic sets with stronger candidates first.
const add={
  19:'0593 0594 0626 0622 0668 0846',
  22:'0550 0531 0532 0533 0534 0539 0565 0479',
  23:'1078 0414 0499 0501 0643',
  24:'0791 0793 0805 0812 0910 0921 0991',
  25:'0706 0718 0719 0338 0584 0976 0993 1116 1117 1118',
  26:'0799 0800 0329 0837 0604',
  28:'0602 0604 0784 0799 0800 0811 0917',
  29:'0867 0874 0887 0899 0595 0582',
  30:'0705 0727 0835 0841 0872 0953 1012',
  31:'0127 0272 0593 0594 0200 1047 1075',
};
for(const [to,raw] of Object.entries(add))for(const code of raw.split(' '))if(code)move(code,Number(to));
// Remove clearly mismatched phrases after thematic cards have gained replacements.
const remove={
  2:'0962',20:'0829',21:'0537 0991',18:'0535 0536 0478 0455 0463 0422 0424 0425',
  34:'0960 0355',17:'0526 0482',
  9:'0411',15:'0497 0431 0323',
  7:'0408 0426 0427 0479',
  3:'0446 0447 0448 0514 0154',
  16:'0453 0458 0464 0472',
  33:'0451 0452 0457 0473',
};
for(const [to,raw] of Object.entries(remove))for(const code of raw.split(' '))if(code)move(code,Number(to));
for(const card of data.cards)if(count(card.id)<20)throw Error('Too few in '+card.id);
fs.writeFileSync(path,JSON.stringify(data,null,2)+'\n');
const reportPath=new URL('../CARD_REDISTRIBUTION_PASS_1.json',import.meta.url);
const report=JSON.parse(fs.readFileSync(reportPath,'utf8'));
report.secondPass=changed;report.total=report.moved.length+changed.length;
report.cards=data.cards.map(c=>({id:c.id,title:c.title,total:data.expressions.filter(x=>x.cardId===c.id).length,distinct:count(c.id)}));
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');console.log('Second pass:',changed.length,'total:',report.total);
