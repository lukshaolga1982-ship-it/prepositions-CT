import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {dualContextTasks,transformationTasks,buildCTTasks,isCorrectCTAnswer} from '../ct-formats.js';
import {ctTip,ctTipCounts} from '../ct-tips.js';
import {expressionKey} from '../practice-utils.js';
const data=JSON.parse(fs.readFileSync(new URL('../data/expressions.json',import.meta.url),'utf8'));
test('B1–B3 draws 20 unique expressions with preposition answers',()=>{
 for(let i=0;i<100;i++){
  const tasks=buildCTTasks('b1-b3',data.expressions);
  assert.equal(tasks.length,20);
  const source=new Map(data.expressions.map(x=>[x.id,x]));
  assert.equal(new Set(tasks.map(x=>expressionKey(source.get(x.expressionId)))).size,20);
  tasks.forEach(t=>{assert.equal((t.template.match(/___/g)||[]).length,1);assert.ok(isCorrectCTAnswer(t,t.answer))});
 }
});
test('B7–B8 has 60 unique dual-context pairs and samples 20 per session',()=>{
 assert.equal(dualContextTasks.length,60);
 assert.equal(new Set(dualContextTasks.map(x=>x.id)).size,60);
 assert.equal(new Set(dualContextTasks.map(x=>x.first+'|'+x.second)).size,60);
 for(let i=0;i<100;i++){const sample=buildCTTasks('b7-b8',data.expressions);assert.equal(sample.length,20);assert.equal(new Set(sample.map(x=>x.id)).size,20)}
 for(const task of dualContextTasks){assert.equal((task.first.match(/___/g)||[]).length,1);assert.equal((task.second.match(/___/g)||[]).length,1);assert.match(task.answer,/^[a-z]+$/);assert.ok(isCorrectCTAnswer(task,task.answer))}
});
test('B19 has 60 unique collocation-based transformations and samples 20 per session',()=>{
 assert.equal(transformationTasks.length,60);
 assert.equal(new Set(transformationTasks.map(x=>x.id)).size,60);
 assert.equal(new Set(transformationTasks.map(x=>x.template)).size,60);
 for(let i=0;i<100;i++){const sample=buildCTTasks('b19',data.expressions);assert.equal(sample.length,20);assert.equal(new Set(sample.map(x=>x.id)).size,20)}
 for(const task of transformationTasks){assert.equal((task.template.match(/___/g)||[]).length,1);assert.ok(task.original.length>10);assert.ok(task.answer.toUpperCase().split(/\W+/).includes(task.keyword),task.id);assert.ok(isCorrectCTAnswer(task,task.answer));assert.equal(isCorrectCTAnswer(task,'wrong answer'),false)}
});
test('every B7–B8 and B19 task has a Russian expression tip',()=>{
 assert.deepEqual(ctTipCounts,{dual:60,transform:60});
 for(const task of [...dualContextTasks,...transformationTasks]){
   const tip=ctTip(task);
   assert.ok(tip.length>12,`Missing tip: ${task.id}`);
   assert.match(tip,/[а-яё]/i,`Tip must contain Russian explanation: ${task.id}`);
 }
});
