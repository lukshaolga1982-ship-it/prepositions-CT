import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { expressionKey, translationOptions, uniquePracticeItems } from '../practice-utils.js';

const data = JSON.parse(fs.readFileSync(new URL('../data/expressions.json', import.meta.url), 'utf8'));

test('thematic redistribution preserves IDs, valid card assignments and complete coverage', () => {
  assert.equal(data.expressions.length, 1135);
  assert.equal(new Set(data.expressions.map(x => x.id)).size, 1135);
  assert.equal(data.cards.length, 35);
  for (const item of data.expressions) {
    assert.ok(Number.isInteger(item.cardId) && item.cardId >= 1 && item.cardId <= 35, item.id);
    assert.equal(item.editorialStatus, 'reviewed', item.id);
  }
  for (const card of data.cards) {
    const items = data.expressions.filter(item => item.cardId === card.id);
    assert.ok(new Set(items.map(expressionKey)).size >= 20, `Card ${card.id}`);
  }
});

test('aliases of the same expression have the same key', () => {
  const byId = Object.fromEntries(data.expressions.map(item => [item.id, item]));
  for (const [a, b] of [
    ['exp_0078', 'exp_0615'], // at home
    ['exp_0130', 'exp_0567'], // go to bed
    ['exp_0005', 'exp_0175'], // by accident
  ]) {
    if (!byId[b]) continue;
    assert.equal(expressionKey(byId[a]), expressionKey(byId[b]), `${a} vs ${b}`);
  }
});

test('all 35 cards can supply 20 non-repeating expressions', () => {
  for (const card of data.cards) {
    const source = data.expressions.filter(item => item.cardId === card.id);
    for (let iteration = 0; iteration < 150; iteration++) {
      const chosen = uniquePracticeItems(source, 20);
      assert.equal(chosen.length, 20, `Card ${card.id}: not enough unique items`);
      assert.equal(new Set(chosen.map(expressionKey)).size, 20, `Card ${card.id}: duplicate expressions`);
      for (const item of chosen) {
        const options = translationOptions(item, chosen);
        assert.equal(new Set(options).size, options.length, `Card ${card.id}: duplicate choices`);
        assert.ok(options.includes(item.translation));
      }
    }
  }
});

test('every translation is in Russian, and split items are valid', () => {
  for (const item of data.expressions) assert.doesNotMatch(item.translation, /[a-z]{3,}/i, item.id);
  for (const item of data.expressions.filter(item => item.editorialStatus === 'reviewed')) {
    assert.equal(item.sentences.length, 3, item.id);
    for (const sentence of item.sentences) {
      assert.equal((sentence.match(/___/g) || []).length, 1, item.id);
    }
  }
});
