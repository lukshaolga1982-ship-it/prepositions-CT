import test from 'node:test';
import assert from 'node:assert/strict';
import { checkpointSets, freshCheckpoint } from '../checkpoint-data.js';

test('all seven Checkpoints have exactly 25 well-formed prompts', () => {
  assert.deepEqual(Object.keys(checkpointSets).map(Number), [1, 2, 3, 4, 5, 6, 7]);
  for (const [module, rows] of Object.entries(checkpointSets)) {
    assert.equal(rows.length, 25, `Checkpoint ${module} size`);
    const seen = new Set();
    for (const [i, [sentence, answer]] of rows.entries()) {
      assert.equal((sentence.match(/___/g) || []).length, 1, `${module}:${i + 1} gap`);
      assert.match(answer, /^[a-z]+$/, `${module}:${i + 1} answer`);
      assert.ok(!seen.has(sentence.toLowerCase()), `${module}:${i + 1} duplicate sentence`);
      seen.add(sentence.toLowerCase());
      assert.ok(!sentence.replace('___', answer).includes('___'));
    }
    const fresh = freshCheckpoint(Number(module));
    assert.equal(fresh.length, 25);
    assert.equal(new Set(fresh.map(x => x.id)).size, 25);
    assert.ok(fresh.every(x => x.answer === checkpointSets[module][Number(x.id.split('_')[2]) - 1][1]));
  }
});
