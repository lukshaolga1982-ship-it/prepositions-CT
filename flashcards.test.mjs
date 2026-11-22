import test from 'node:test';
import assert from 'node:assert/strict';
import {parseFlashcards,updateFlashcardProgress} from '../flashcards.js';

test('imports two-column tab-delimited expressions and preserves Russian text',()=>{
  assert.deepEqual(parseFlashcards('look after\tзаботиться о\nbe interested in\tинтересоваться'),[
    {id:'c1',front:'look after',back:'заботиться о'},
    {id:'c2',front:'be interested in',back:'интересоваться'}
  ]);
});
test('rejects missing tabs and oversized decks',()=>{
  assert.throws(()=>parseFlashcards('look after — заботиться'),/Tab/);
  assert.throws(()=>parseFlashcards('a\tb\n'.repeat(201)),/200/);
  assert.throws(()=>parseFlashcards(''),/хотя бы одну/);
});
test('difficult entries survive a known mark until explicitly cleared',()=>{
  const first=updateFlashcardProgress({},'deck','c1','difficult');
  const second=updateFlashcardProgress(first,'deck','c1','known');
  assert.deepEqual(second.deck.difficult,['c1']);
  assert.deepEqual(second.deck.known,['c1']);
  assert.deepEqual(updateFlashcardProgress(second,'deck','c1','clear').deck.difficult,[]);
});
