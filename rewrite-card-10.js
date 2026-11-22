import fs from 'node:fs';
const path = new URL('../data/expressions.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const examples = {
  exp_0031: ['This programme is aimed ___ young learners.', 'The campaign is aimed ___ reducing plastic waste.', 'The course is aimed ___ students preparing for exams.'],
  exp_0345: ['Millions of different species live ___ planet Earth.', 'Life ___ planet Earth depends on water.', 'There are many different climates ___ planet Earth.'],
  exp_0518: ['Can you give an explanation ___ your decision?', 'She gave a clear explanation ___ the delay.', 'The teacher asked him to give an explanation ___ his absence.'],
  exp_0788: ['The scientist made a prediction ___ future temperatures.', 'Can you make a prediction ___ the end of the story?', 'She made a prediction ___ the results of the experiment.'],
  exp_0789: ['I made an appointment ___ my dentist.', 'She made an appointment ___ the head teacher.', 'He needs to make an appointment ___ his doctor.'],
  exp_0791: ['What do you make ___ his strange behaviour?', 'I do not know what to make ___ this unexpected result.', 'What did the teacher make ___ your idea?'],
  exp_0793: ['I could not make sense ___ the final paragraph.', 'She tried to make sense ___ the complicated instructions.', 'He finally made sense ___ the difficult formula.'],
  exp_0794: ['Try to make use ___ every chance to practise English.', 'We should make better use ___ our free time.', 'The students made use ___ the online dictionary.'],
  exp_0795: ['She has been married ___ her husband for twenty years.', 'My aunt is married ___ a doctor.', 'He got married ___ his childhood friend.'],
  exp_0796: ['These shoes match well ___ your jacket.', 'She matched the curtains ___ the new carpet.', 'Try to match this scarf ___ your coat.'],
  exp_0797: ['Your opinion matters ___ me.', 'Every vote matters ___ the final result.', 'Small acts of kindness can matter ___ other people.'],
  exp_0798: ['Your support means a lot ___ me.', 'This award means a lot ___ our team.', 'Her family means a lot ___ her.'],
  exp_0799: ['Successful teams always meet their ___.', 'She works hard to meet all her ___.', 'It is important to meet project ___ on time.'],
  exp_0800: ['Our company tries to meet the client’s ___.', 'The designer worked to meet the client’s ___.', 'The new product was developed to meet the client’s ___.'],
  exp_0801: ['The two small groups merged ___ one team.', 'Several villages merged ___ a single town.', 'The streams merge ___ one river.'],
  exp_0802: ['Bear ___ mind that spelling is important.', 'Please bear ___ mind that the library closes early.', 'We should bear ___ mind the cost of the trip.'],
  exp_0803: ['Guests were invited to mingle ___ local residents.', 'She enjoys mingling ___ people from other countries.', 'Students mingled ___ the visitors after the concert.'],
  exp_0804: ['Do not miss out ___ this opportunity.', 'She missed out ___ the chance to join the team.', 'He does not want to miss out ___ the trip.'],
  exp_0805: ['I mistook him ___ his brother.', 'She mistook the noise ___ thunder.', 'The tourists mistook the old building ___ a museum.'],
  exp_0806: ['Mix the flour ___ the milk.', 'She mixed blue paint ___ yellow.', 'Do not mix these chemicals ___ water.'],
  exp_0807: ['The town built a monument ___ its founder.', 'There is a monument ___ the famous writer in the square.', 'Visitors stopped at the monument ___ the fallen soldiers.'],
  exp_0808: ['My family moved ___ a new flat last month.', 'They are planning to move ___ a bigger house.', 'She moved ___ her student accommodation in September.'],
  exp_0809: ['The street is named ___ a famous scientist.', 'Their daughter was named ___ her grandmother.', 'The school is named ___ a local poet.'],
  exp_0810: ['The park was named in honour ___ the national hero.', 'A new library was named in honour ___ the writer.', 'The award was named in honour ___ its founder.'],
  exp_0811: ['There is a growing need ___ clean water.', 'The project shows the need ___ better transport.', 'Teachers recognise the need ___ regular practice.'],
  exp_0812: ['The charity helps families in need ___ support.', 'This old building is in need ___ repair.', 'The school is in need ___ new computers.'],
  exp_0813: ['She felt nervous ___ the final exam.', 'He was nervous ___ giving his first speech.', 'They were nervous ___ the results of the competition.'],
  exp_0814: ['This subject is completely new ___ me.', 'The system is new ___ most students.', 'Living in a large city was new ___ her.'],
  exp_0815: ['I bought a newspaper ___ the newsagent’s.', 'She stopped ___ the newsagent’s before work.', 'You can find magazines ___ the newsagent’s.'],
  exp_0816: ['The library is next ___ the school.', 'She sat next ___ her best friend.', 'The post office is next ___ the bank.'],
  exp_0819: ['The village lies to the north ___ the lake.', 'Our town is to the north ___ the capital.', 'The mountains are situated to the north ___ the valley.'],
  exp_0895: ['We have a plan ___ the next school year.', 'She drew up a plan ___ the weekend.', 'The committee agreed on a plan ___ improving the park.'],
  exp_0907: ['The students are preparing ___ their final exams.', 'She prepared carefully ___ the interview.', 'We need to prepare ___ the next lesson.']
};
for (const item of data.expressions) {
  const sentences = examples[item.id];
  if (!sentences) continue;
  if (sentences.length !== 3 || sentences.some(s => (s.match(/___/g) || []).length !== 1)) throw Error(item.id);
  item.sentences = sentences;
  item.gapSentence = sentences[0];
  item.example = sentences[0].replace('___', item.answer);
  item.editorialStatus = 'reviewed';
}
fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
console.log('Reviewed:', Object.keys(examples).length);
