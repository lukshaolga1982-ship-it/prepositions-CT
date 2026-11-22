import fs from 'node:fs';
const path = new URL('../data/expressions.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const examples = {
  exp_0054: ['I found several useful articles ___ climate change.', 'She read three articles ___ modern education.', 'The magazine published an article ___ healthy habits.'],
  exp_0150: ['The inspector insisted on doing everything ___ the book.', 'Our manager wants every procedure followed ___ the book.', 'She always does things ___ the book and never breaks the rules.'],
  exp_0439: ['The notice is provided ___ information only.', 'These figures are included ___ information.', 'The document is available ___ information purposes.'],
  exp_0504: ['We need to get ready ___ tomorrow’s exam.', 'She got ready ___ the presentation.', 'The team is getting ready ___ the competition.'],
  exp_0820: ['He feels nostalgic ___ his childhood home.', 'She became nostalgic ___ her school days.', 'The old photograph made me nostalgic ___ the past.'],
  exp_0821: ['This issue has nothing to do ___ our project.', 'His decision has nothing to do ___ money.', 'The delay had nothing to do ___ the weather.'],
  exp_0822: ['Many residents objected ___ the new building plan.', 'She objected ___ working late every evening.', 'The students objected ___ the proposed rule.'],
  exp_0823: ['The old house is occupied ___ a family of four.', 'Every seat was occupied ___ a passenger.', 'The city was occupied ___ foreign troops.'],
  exp_0824: ['An interesting idea occurred ___ me during the lesson.', 'It never occurred ___ him to check the address.', 'A possible solution suddenly occurred ___ her.'],
  exp_0825: ['___ course, you can borrow my notes.', 'We will help you, ___ course.', '___ course, the answer depends on the context.'],
  exp_0826: ['We went hiking ___ a sunny day in May.', 'They visited the beach ___ a sunny day.', 'The festival took place ___ a sunny day.'],
  exp_0828: ['You may join us ___ condition that you arrive on time.', 'She agreed to help ___ condition that everyone participated.', 'We can go outside ___ condition that it stops raining.'],
  exp_0830: ['We travelled to the village ___ foot.', 'She usually goes to school ___ foot.', 'It is easier to explore the old town ___ foot.'],
  exp_0832: ['The meeting will take place ___ Monday.', 'We have an English lesson ___ Tuesday.', 'She is leaving for Minsk ___ Monday.'],
  exp_0833: ['I usually relax on my day ___.', 'She went hiking on her day ___.', 'He enjoys cooking on his day ___.'],
  exp_0834: ['The tickets will go ___ sale tomorrow.', 'These shoes are ___ sale this week.', 'The new album is now ___ sale.'],
  exp_0835: ['We changed our route on the advice ___ the guide.', 'She applied for the course on the advice ___ her teacher.', 'He visited the doctor on the advice ___ his parents.'],
  exp_0836: ['The athletes gathered ___ the arena before the event.', 'Thousands of people cheered ___ the arena.', 'The performers rehearsed ___ the arena.'],
  exp_0837: ['The decision was made on the basis ___ the evidence.', 'Students were selected on the basis ___ their results.', 'The report was written on the basis ___ recent research.'],
  exp_0839: ['___ the contrary, the second task was quite easy.', 'He was not angry; ___ the contrary, he was delighted.', 'The weather did not improve; ___ the contrary, it got worse.'],
  exp_0841: ['Is your name ___ the list?', 'We added three new students ___ the list.', 'She checked whether her name was ___ the list.'],
  exp_0842: ['There are several vegetarian dishes ___ the menu.', 'Is soup ___ the menu today?', 'The café has added a new dessert ___ the menu.'],
  exp_0843: ['I heard about the event ___ the news.', 'The story appeared ___ the news last night.', 'We saw the announcement ___ the news.'],
  exp_0844: ['She spent an hour ___ the phone.', 'He was talking ___ the phone when I arrived.', 'I heard the result while I was ___ the phone.'],
  exp_0845: ['We heard the weather forecast ___ the radio.', 'The song was played ___ the radio.', 'She first heard the interview ___ the radio.'],
  exp_0847: ['The workshop is ___ the schedule for Friday.', 'I checked whether the presentation was ___ the schedule.', 'The event appears ___ the schedule for next week.'],
  exp_0848: ['We had dinner ___ the ship.', 'The passengers were already ___ the ship.', 'She spent three days ___ the ship.'],
  exp_0849: ['The children played ___ the shore.', 'A small village stands ___ the shore of the lake.', 'We found several shells ___ the shore.'],
  exp_0931: ['I try to read ___ English every day.', 'She prefers to read novels ___ English.', 'The teacher encouraged us to read ___ English.'],
  exp_0932: ['Are you ready ___ the exam?', 'She is ready ___ the next challenge.', 'We are ready ___ the presentation.'],
  exp_0942: ['The officer reported ___ his superior.', 'The manager reports directly ___ the director.', 'Please report ___ the reception desk on arrival.'],
  exp_1012: ['The fire quickly spread ___ nearby buildings.', 'The news spread ___ other schools.', 'The infection spread ___ several neighbouring towns.'],
  exp_1128: ['The students wrote essays ___ their holidays.', 'She wants to write ___ her travels.', 'He wrote an article ___ protecting the environment.']
};
for (const item of data.expressions) {
  const sentences = examples[item.id];
  if (!sentences) continue;
  if (sentences.length !== 3 || sentences.some(s => (s.match(/___/g) || []).length !== 1)) throw Error(item.id);
  if (item.id === 'exp_0150') { item.expression = 'by the book'; item.translation = 'строго по правилам'; item.answer = 'by'; item.acceptedAnswers = ['by']; }
  if (item.id === 'exp_0836') { item.expression = 'in the arena'; item.translation = 'на арене'; item.answer = 'in'; item.acceptedAnswers = ['in']; }
  item.sentences = sentences;
  item.gapSentence = sentences[0];
  item.example = sentences[0].replace('___', item.answer);
  item.editorialStatus = 'reviewed';
}
fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
console.log('Reviewed:', Object.keys(examples).length);
