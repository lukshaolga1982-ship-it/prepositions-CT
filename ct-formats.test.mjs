import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {dualContextTasks,transformationTasks,buildCTTasks,isCorrectCTAnswer} from '../ct-formats.js';
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
test('B7–B8 has 20 dual-context pairs and one matching answer',()=>{
 assert.equal(dualContextTasks.length,20);
 assert.equal(new Set(dualContextTasks.map(x=>x.id)).size,20);
 for(const task of dualContextTasks){assert.equal((task.first.match(/___/g)||[]).length,1);assert.equal((task.second.match(/___/g)||[]).length,1);assert.match(task.answer,/^[a-z]+$/);assert.ok(isCorrectCTAnswer(task,task.answer))}
});
test('B19 has 20 collocation-based transformations preserving the keyword',()=>{
 assert.equal(transformationTasks.length,20);
 assert.equal(new Set(transformationTasks.map(x=>x.id)).size,20);
 for(const task of transformationTasks){assert.equal((task.template.match(/___/g)||[]).length,1);assert.ok(task.original.length>10);assert.ok(task.answer.toUpperCase().split(/\W+/).includes(task.keyword),task.id);assert.ok(isCorrectCTAnswer(task,task.answer));assert.equal(isCorrectCTAnswer(task,'wrong answer'),false)}
});
