// Pure progress rules shared by the application and regression tests.
export function applyPracticeCompletion(state, session, score) {
  if (score < 80 || !session.cardId || session.review || session.checkpoint) return false;
  state.completed[session.cardId] = Math.max(state.completed[session.cardId] || 0, score);
  state.unlocked = Math.max(state.unlocked, Math.min(35, session.cardId + 1));
  state.stars += score === 100 ? 3 : score >= 90 ? 2 : 1;
  return true;
}

export function evaluateCheckpoint(items, submitted) {
  if (items.length !== submitted.length) throw new Error('Checkpoint answer count mismatch');
  const answers = items.map((item, index) => {
    const given = String(submitted[index] ?? '').trim().toLowerCase();
    const correct = String(item.answer).trim().toLowerCase();
    return { sentence: item.gapSentence, given, correct: item.answer, ok: given === correct };
  });
  return { answers, correct: answers.filter(item => item.ok).length };
}
