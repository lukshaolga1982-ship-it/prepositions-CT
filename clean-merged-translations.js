import fs from 'node:fs';

const path = new URL('../data/expressions.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const fixes = {
  exp_0128: 'на ежедневной основе',
  exp_0196: 'заботиться о; ухаживать за',
  exp_0429: 'следовать обычаю',
  exp_0529: 'с первого взгляда',
  exp_0968: 'попрощаться с кем-либо',
  exp_0998: 'спать дольше обычного; поздно вставать',
  exp_1126: 'стоить того, чтобы сделать что-либо',
  exp_1127: 'быть достойным чего-либо'
};

for (const item of data.expressions) {
  if (fixes[item.id]) item.translation = fixes[item.id];
}

// Expressions accidentally pasted into another row's Russian translation.
// New IDs avoid changing saved progress and historical mistake references.
const additions = [
  {
    id: 'exp_1131', expression: 'on a regular basis', translation: 'регулярно; на постоянной основе',
    answer: 'on', cardId: 2,
    sentences: [
      'She practises English ___ a regular basis.',
      'The team meets ___ a regular basis to discuss progress.',
      'You should revise new vocabulary ___ a regular basis.'
    ]
  },
  {
    id: 'exp_1132', expression: 'carry on', translation: 'продолжать',
    answer: 'on', cardId: 34,
    sentences: [
      'Please carry ___ with your work while I am away.',
      'Despite the noise, the students carried ___ reading.',
      'She decided to carry ___ practising until she got it right.'
    ]
  },
  {
    id: 'exp_1133', expression: 'follow the news', translation: 'следить за новостями',
    answer: 'news', cardId: 30,
    sentences: [
      'I follow the ___ on my phone every morning.',
      'Many people follow the ___ through reliable websites.',
      'Our teacher encourages us to follow the ___ in English.'
    ]
  },
  {
    id: 'exp_1134', expression: 'say hello to', translation: 'поздороваться с кем-либо; передать привет',
    answer: 'to', cardId: 11,
    sentences: [
      'Please say hello ___ your parents for me.',
      'She stopped to say hello ___ an old friend.',
      'Remember to say hello ___ your new classmates.'
    ]
  },
  {
    id: 'exp_1135', expression: 'sleep in trees', translation: 'спать на деревьях',
    answer: 'in', cardId: 19,
    sentences: [
      'Some birds sleep ___ trees at night.',
      'These animals usually sleep ___ trees to stay safe.',
      'In the rainforest, many creatures sleep ___ trees.'
    ]
  }
];

for (const item of additions) {
  if (data.expressions.some(existing => existing.id === item.id)) continue;
  item.acceptedAnswers = [item.answer];
  item.gapSentence = item.sentences[0];
  item.example = item.gapSentence.replace('___', item.answer);
  item.translationHint = item.translation;
  item.editorialStatus = 'reviewed';
  data.expressions.push(item);
}

data.count = data.expressions.length;
fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
console.log(`Entries: ${data.count}; cleaned translations: ${Object.keys(fixes).length}; split expressions: ${additions.length}`);
