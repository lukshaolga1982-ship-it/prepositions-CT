import test from 'node:test';
import assert from 'node:assert/strict';
import {cleanAIDrafts,collectExistingSentences} from '../ai-activity-utils.js';

test('AI exercises require answers and gaps and never exceed five valid drafts',()=>{
  const tasks=Array.from({length:8},(_,i)=>({prompt:`The student ${i} is interested ___ modern art.`,answer:'in',hint:'интересоваться'}));
  assert.equal(cleanAIDrafts('b1',tasks).length,5);
  assert.equal(cleanAIDrafts('b1',[{prompt:'He is here.',answer:'in'}]).length,0);
});
test('near-duplicate contexts are excluded from newly generated exercises',()=>{
  const history=['She looks after her younger brother while her parents work.'];
  const tasks=[{prompt:'She looks after her younger brother while the parents work ___.',answer:'hard',hint:'заботиться'}];
  assert.equal(cleanAIDrafts('quiz',tasks,history).length,0);
});
test('B7 and B19 drafts require their specific structures',()=>{
  assert.equal(cleanAIDrafts('b7',[{first:'We ___ the rules.',second:'They ___ the law.',answer:'break'}]).length,1);
  assert.equal(cleanAIDrafts('b7',[{first:'We break the rules.',second:'They ___ the law.',answer:'break'}]).length,0);
  assert.equal(cleanAIDrafts('b19',[{original:'She admires him.',template:'She ___ him.',keyword:'UP',answer:'looks up to'}]).length,1);
});
test('existing tasks are collected across all published formats',()=>{
  const texts=collectExistingSentences({quiz:[{prompt:'He ___ his sister.'}],b7:[{first:'She ___ up early.',second:'They ___ off.'}],b19:[{original:'He stopped.',template:'He ___ working.'}]});
  assert.equal(texts.length,3);
  assert.ok(texts[1].includes('They ___ off.'));
});
