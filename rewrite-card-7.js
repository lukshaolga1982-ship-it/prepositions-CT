import fs from 'node:fs';
const path = new URL('../data/expressions.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const examples = {
  exp_0001: ['She has remarkable ability ___ languages.', 'He showed great ability ___ mathematics.', 'The new student demonstrated ability ___ creative writing.'],
  exp_0122: ['I used to be bad ___ spelling.', 'He is bad ___ remembering names.', 'She thinks she is bad ___ maths.'],
  exp_0193: ['Every student is capable ___ making progress.', 'She is capable ___ solving difficult problems.', 'He is capable ___ working independently.'],
  exp_0492: ['I got my musical talent ___ my grandmother.', 'She got her musical talent ___ her father.', 'He believes he got his musical talent ___ his mother.'],
  exp_0575: ['My brother is good ___ drawing.', 'She has always been good ___ languages.', 'He is particularly good ___ solving puzzles.'],
  exp_0900: ['Please point ___ the correct answer.', 'She pointed ___ the picture on the wall.', 'The guide pointed ___ the old building.'],
  exp_0902: ['The teacher pointed ___ a mistake in my essay.', 'She pointed ___ the most important detail.', 'He pointed ___ that we were running out of time.'],
  exp_0906: ['I prefer tea ___ coffee.', 'She prefers reading ___ watching television.', 'Many students prefer online lessons ___ long journeys.'],
  exp_0908: ['The school presented the winner ___ a prize.', 'They presented her ___ a certificate.', 'The mayor presented the volunteers ___ awards.'],
  exp_0909: ['The students presented their project ___ the class.', 'She presented the results ___ the committee.', 'He presented his ideas ___ the school council.'],
  exp_0911: ['Our team takes pride ___ its achievements.', 'She takes pride ___ her work.', 'They take pride ___ their town’s history.'],
  exp_0912: ['He prides himself ___ his honesty.', 'She prides herself ___ being punctual.', 'The school prides itself ___ its academic results.'],
  exp_0914: ['She was promoted ___ manager last month.', 'He hopes to be promoted ___ team leader.', 'The officer was promoted ___ captain.'],
  exp_0919: ['She put a lot of effort ___ her studies.', 'He put all his energy ___ the project.', 'The team put considerable time ___ preparation.'],
  exp_0921: ['I cannot put up ___ this noise any longer.', 'She refused to put up ___ unfair treatment.', 'We had to put up ___ the delays.'],
  exp_0922: ['She was puzzled ___ the unexpected result.', 'The students were puzzled ___ the strange question.', 'He looked puzzled ___ her sudden silence.'],
  exp_0923: ['She has the qualifications ___ this position.', 'Do you have the right qualifications ___ the job?', 'He is studying to gain the qualifications ___ teaching.'],
  exp_0926: ['Buying a new car is out ___ the question this year.', 'Leaving school early is out ___ the question.', 'A second trip abroad is out ___ the question for now.'],
  exp_0927: ['She kept quiet ___ the surprise party.', 'He promised to keep quiet ___ their plans.', 'The students kept quiet ___ the secret.'],
  exp_0928: ['Prices range from ten ___ fifty euros.', 'The ages of the pupils range from twelve ___ sixteen.', 'The scores range from zero ___ one hundred.'],
  exp_0929: ['How did she react ___ the news?', 'He reacted calmly ___ the criticism.', 'The children reacted positively ___ the new game.'],
  exp_0930: ['Her reaction ___ the announcement surprised us.', 'His reaction ___ the joke was unexpected.', 'We were pleased with their reaction ___ our proposal.'],
  exp_0935: ['The article refers ___ several recent studies.', 'What does this word refer ___?', 'She referred ___ her notes during the presentation.'],
  exp_0936: ['Everyone can join regardless ___ age.', 'She treats people equally regardless ___ their background.', 'The museum welcomes visitors regardless ___ nationality.'],
  exp_0937: ['The two events are closely related ___ each other.', 'His question was related ___ the topic of the lesson.', 'These problems are related ___ climate change.'],
  exp_0938: ['You can rely ___ me for help.', 'We rely ___ public transport to get to school.', 'She relies ___ her parents for advice.'],
  exp_0939: ['This song reminds me ___ my childhood.', 'You remind me ___ an old friend.', 'The smell of fresh bread reminded her ___ home.'],
  exp_0940: ['Please remind me ___ the meeting tomorrow.', 'She reminded her brother ___ his appointment.', 'He reminded us ___ the deadline.'],
  exp_0941: ['Please remove the books ___ the table.', 'He removed the old poster ___ the wall.', 'She removed the file ___ the folder.'],
  exp_0946: ['How did the teacher respond ___ your question?', 'She responded quickly ___ the invitation.', 'He did not respond ___ my message.'],
  exp_0947: ['We received a response ___ our request.', 'Her response ___ the criticism was calm.', 'The company sent a response ___ our complaint.'],
  exp_0951: ['She hopes to return ___ her hometown one day.', 'We returned ___ the classroom after lunch.', 'He returned ___ his studies after a short break.'],
  exp_0952: ['This region is rich ___ natural resources.', 'The fruit is rich ___ vitamin C.', 'Her vocabulary is rich ___ useful expressions.']
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
