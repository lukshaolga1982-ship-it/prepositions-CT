import fs from 'node:fs';
const path = new URL('../data/expressions.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const examples = {
  exp_0026: ['The two sides finally came ___ an agreement.', 'After a long discussion, they came ___ an agreement.', 'The neighbours came ___ an agreement about the fence.'],
  exp_0027: ['The countries reached an agreement ___ trade.', 'The groups signed an agreement ___ the use of the hall.', 'There was no agreement ___ the final date.'],
  exp_0028: ['We agreed ___ a date for the meeting.', 'The students could not agree ___ a title.', 'They finally agreed ___ the rules.'],
  exp_0029: ['I completely agree ___ your opinion.', 'She agrees ___ her teacher about the result.', 'Do you agree ___ me?'],
  exp_0048: ['The friends argued ___ which film to watch.', 'They argued ___ the price of the tickets.', 'The students argued ___ the best solution.'],
  exp_0049: ['I do not want to argue ___ you.', 'She argued ___ her brother about the computer.', 'The two players argued ___ the referee.'],
  exp_0136: ['You should believe ___ yourself.', 'Many children believe ___ magic.', 'She believes ___ the importance of education.'],
  exp_0460: ['From my point ___ view, the plan is realistic.', 'From my point ___ view, regular practice is essential.', 'From her point ___ view, the decision was unfair.'],
  exp_0654: ['___ my opinion, this book is excellent.', '___ my opinion, the second answer is correct.', '___ my opinion, we should leave early.'],
  exp_0756: ['The book is lying ___ the table.', 'The dog likes to lie ___ the sofa.', 'Her coat was lying ___ the floor.'],
  exp_0757: ['The village lies to the north ___ the lake.', 'The castle lies to the north ___ the city.', 'The mountains lie to the north ___ the valley.'],
  exp_0758: ['The article contains a link ___ the original report.', 'She sent me a link ___ the website.', 'The page has a link ___ the application form.'],
  exp_0759: ['Please listen ___ the instructions carefully.', 'She likes to listen ___ classical music.', 'We listened ___ the teacher’s explanation.'],
  exp_0760: ['He tries to live ___ his principles.', 'She lives ___ the rule that honesty comes first.', 'They believe everyone should live ___ the same moral code.'],
  exp_0761: ['My grandparents live ___ a small village.', 'She hopes to live ___ London one day.', 'Many animals live ___ the forest.'],
  exp_0762: ['The family has to live ___ a small income.', 'Many students live ___ very little money.', 'Some animals can live ___ insects alone.'],
  exp_0763: ['The holiday did not live up ___ our expectations.', 'She worked hard to live up ___ her parents’ hopes.', 'The film lived up ___ all the positive reviews.'],
  exp_0764: ['Can you look ___ my cat while I am away?', 'She looks ___ her younger brother after school.', 'He promised to look ___ the plants.'],
  exp_0765: ['Look ___ the picture and describe it.', 'She looked ___ the clock.', 'The children looked ___ the map.'],
  exp_0766: ['She likes to look back ___ her childhood.', 'He looked back ___ his school years with pleasure.', 'Looking back ___ the trip, we remember many funny moments.'],
  exp_0767: ['I am looking ___ my keys.', 'They looked ___ a quiet place to study.', 'She is looking ___ a new job.'],
  exp_0768: ['We look forward ___ seeing you again.', 'She is looking forward ___ her next lesson.', 'I look forward ___ hearing from you.'],
  exp_0769: ['You look ___ your mother.', 'This cloud looks ___ a rabbit.', 'The old house looks ___ a castle.'],
  exp_0770: ['Our windows look ___ the garden.', 'The hotel room looks ___ the sea.', 'The balcony looks ___ the main square.'],
  exp_0771: ['The child looked out ___ the window.', 'She looked out ___ the train window.', 'He leaned forward to look out ___ the door.'],
  exp_0859: ['What is your opinion ___ the new school rules?', 'She asked for his opinion ___ the film.', 'The students expressed their opinions ___ the proposal.'],
  exp_0860: ['The committee gave its opinion ___ the proposal.', 'The teacher asked for our opinion ___ the exam format.', 'She shared her opinion ___ the new policy.'],
  exp_0901: ['From my point ___ view, the first solution is better.', 'From his point ___ view, the change was necessary.', 'From the student’s point ___ view, the task was difficult.'],
  exp_0924: ['They quarrelled ___ the money.', 'The neighbours quarrelled ___ a parking space.', 'The children quarrelled ___ which game to play.'],
  exp_0925: ['She quarrelled ___ her brother yesterday.', 'He did not want to quarrel ___ his best friend.', 'The two neighbours often quarrel ___ each other.'],
  exp_1076: ['I often think ___ my future career.', 'She was thinking ___ the exam all evening.', 'We should think ___ the consequences.'],
  exp_1077: ['What do you think ___ this idea?', 'She thought ___ a clever solution.', 'I often think ___ my grandparents.']
};
for (const item of data.expressions) {
  const sentences = examples[item.id];
  if (!sentences) continue;
  if (sentences.length !== 3 || sentences.some(s => (s.match(/___/g) || []).length !== 1)) throw Error(item.id);
  if (item.id === 'exp_0048') item.expression = 'argue over';
  if (item.id === 'exp_0766') item.expression = 'look back on';
  if (item.id === 'exp_0924') item.expression = 'quarrel over';
  item.sentences = sentences;
  item.gapSentence = sentences[0];
  item.example = sentences[0].replace('___', item.answer);
  item.editorialStatus = 'reviewed';
}
fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
console.log('Reviewed:', Object.keys(examples).length);
