import test from 'node:test';
import assert from 'node:assert/strict';
import {suggestActivities,ACTIVITY_LABELS} from '../activity-suggestions.js';
import {parseFlashcards} from '../flashcards.js';

const sample=parseFlashcards('look after\tзаботиться\tI look after my little sister.\nlook for\tискать\tWe look for the keys every day.\nin the morning\tутром\tI exercise in the morning.');

test('third tab-separated column preserves complete context',()=>{
  assert.equal(sample[0].example,'I look after my little sister.');
  assert.equal(parseFlashcards('go home\tидти домой')[0].example,undefined);
});
test('matching covers all expressions without repeat; quiz hides entire phrase',()=>{
  const result=suggestActivities(sample);
  assert.equal(result.matching.length,3);
  assert.equal(new Set(result.matching.map(x=>x.id)).size,3);
  assert.equal(result.quiz[0].prompt,'I ___ my little sister.');
  assert.equal(result.quiz[0].answer,'look after');
});
test('articles, prepositions, B1 and B7 use valid context',()=>{
  const result=suggestActivities(sample);
  assert.ok(result.articles.some(x=>x.prompt==='I exercise in ___ morning.'&&x.answer==='the'));
  assert.ok(result.prepositions.some(x=>x.prompt==='I look ___ my little sister.'&&x.answer==='after'));
  assert.ok(result.b1.length>=2);
  assert.ok(result.b7.some(x=>x.answer==='look'&&x.first.includes('___')&&x.second.includes('___')));
});
test('no invented sentence tasks when only translations are known',()=>{
  const result=suggestActivities(parseFlashcards('invented phrase\tпридуманное выражение'));
  assert.equal(result.matching.length,1);
  for(const format of Object.keys(ACTIVITY_LABELS).filter(x=>x!=='matching'))assert.equal(result[format].length,0,format);
});
