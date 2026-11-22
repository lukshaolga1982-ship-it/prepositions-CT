// Pure selection helpers, shared by the browser and regression tests.
const normalize = value => String(value ?? '')
  .toLowerCase()
  .replace(/[’‘]/g, "'")
  .replace(/\bday\s+time\b/g, 'daytime')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()
  .replace(/\s+/g, ' ');

export function expressionKey(item) {
  if (item.practiceKey) return normalize(item.practiceKey);
  const label = String(item.expression || '').toLowerCase();
  const inner = [...label.matchAll(/\(([^)]+)\)/g)]
    .map(match => match[1].trim())
    .find(part => /\b(?:at|in|on|to|for|from|with|by|of|under|over|out|up|into|go|take|make|be|come|the|day)\b/.test(part));
  // E.g. "accident (by accident)" and "by accident" are one expression.
  // "bed (go to bed)" and "go to bed" are one expression.
  if (inner && !/^be\s*$/.test(inner)) return normalize(inner);
  return normalize(label.replace(/\([^)]*\)/g, '').replace(/\*/g, ''));
}

export function uniquePracticeItems(items, limit = 20, random = Math.random) {
  const pool = [...items];
  const shuffle = values => values.map(v => ({ v, n: random() }))
    .sort((a, b) => a.n - b.n).map(entry => entry.v);
  let best = [];

  // Several randomized passes avoid choosing one of two near-duplicate records
  // when another selection could provide 20 distinct expressions/sentences.
  for (let attempt = 0; attempt < 48; attempt++) {
    const chosen = [], seenExpressions = new Set(), seenSentences = new Set();
    for (const item of shuffle(pool)) {
      if (chosen.length === limit) break;
      const key = expressionKey(item);
      if (!key || seenExpressions.has(key)) continue;
      const variants = shuffle([...new Set((item.sentences?.length ? item.sentences : [item.gapSentence]).filter(Boolean))]);
      const sentence = variants.find(value => !seenSentences.has(normalize(value)));
      if (!sentence) continue;
      chosen.push({ ...item, gapSentence: sentence });
      seenExpressions.add(key);
      seenSentences.add(normalize(sentence));
    }
    if (chosen.length > best.length) best = chosen;
    if (best.length === limit) break;
  }
  // Legacy data sometimes has fewer than 20 different example sentences in a
  // card. Never repeat the expression to fill the quota; allow a shared
  // sentence temporarily until that card has been editorially rewritten.
  if (best.length < limit) {
    const expressions = new Set(best.map(expressionKey));
    for (const item of shuffle(pool)) {
      if (best.length === limit) break;
      const key = expressionKey(item);
      if (!key || expressions.has(key)) continue;
      best.push({ ...item, gapSentence: shuffle(item.sentences?.length ? item.sentences : [item.gapSentence])[0] });
      expressions.add(key);
    }
  }
  return best;
}

export function translationOptions(item, pool, random = Math.random) {
  const correct = item.translation;
  const key = normalize(correct);
  const alternatives = [...new Map(pool
    .filter(other => other.id !== item.id)
    .map(other => [normalize(other.translation), other.translation])
    .filter(([otherKey]) => otherKey && otherKey !== key)).values()];
  const options = alternatives.map(value => ({ value, n: random() }))
    .sort((a, b) => a.n - b.n).slice(0, 2).map(entry => entry.value);
  return [correct, ...options].map(value => ({ value, n: random() }))
    .sort((a, b) => a.n - b.n).map(entry => entry.value);
}

export function isAcceptedExpressionAnswer(item, given) {
  const normalized = value => String(value ?? '').trim().toLowerCase();
  return (item.acceptedAnswers?.length ? item.acceptedAnswers : [item.answer])
    .some(answer => normalized(answer) === normalized(given));
}
