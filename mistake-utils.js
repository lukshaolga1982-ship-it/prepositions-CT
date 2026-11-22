// A permanent, repeatable bank of expressions and Checkpoint questions.
export function preserveExpressionMistake(state, id) {
  if (!state.errors.includes(id)) state.errors.push(id);
}

export function preserveCTMistake(bank = [], item) {
  return bank.some(old => old.id === item.id) ? bank : [...bank, {...item}];
}

export function mergeCheckpointMistakes(bank = [], items = [], answers = []) {
  const result = new Map(bank.map(item => [item.id, item]));
  answers.forEach((answer, index) => {
    if (answer.ok) return;
    const original = items[index];
    if (!original) return;
    const id = original.id || `checkpoint_legacy_${index}_${answer.sentence}`;
    if (!result.has(id)) result.set(id, {
      id, source: 'checkpoint',
      expression: answer.sentence.replace('___', answer.correct),
      translation: 'Задание Checkpoint',
      gapSentence: answer.sentence,
      sentences: [answer.sentence], answer: answer.correct,
      acceptedAnswers: [answer.correct]
    });
  });
  return [...result.values()];
}

export function recoverMistakes(profile) {
  const errors = [...new Set([
    ...(profile.errors || []),
    ...(profile.mistakeHistory || []).map(entry => entry.expressionId).filter(Boolean)
  ].filter(id => !String(id).startsWith('checkpoint_')))] ;
  let checkpointMistakes = [...(profile.checkpointMistakes || [])];
  for (const attempt of profile.checkpointAttempts || []) {
    const items = (attempt.answers || []).map((answer, i) => ({
      id: `checkpoint_legacy_${attempt.module}_${answer.sentence}`,
      gapSentence: answer.sentence
    }));
    checkpointMistakes = mergeCheckpointMistakes(checkpointMistakes, items, attempt.answers || []);
  }
  return { errors, checkpointMistakes };
}
