import fs from 'node:fs';
const path = new URL('../data/expressions.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const examples = {
  exp_0436: ['___ example, you can use a dictionary to check spelling.', 'Many outdoor activities, ___ example hiking, are free.', 'Some countries, ___ example Canada, have two official languages.'],
  exp_0481: ['She always gets excellent marks ___ English.', 'He got excellent marks ___ history this term.', 'Marta hopes to get excellent marks ___ mathematics.'],
  exp_0600: ['We have an exam ___ English next week.', 'She will have an exam ___ biology on Monday.', 'The students had an exam ___ geography yesterday.'],
  exp_0852: ['Please arrive ___ time for the lesson.', 'The bus was exactly ___ time.', 'We finished the project ___ time.'],
  exp_0853: ['The dictionary is on top ___ the shelf.', 'There was snow on top ___ the mountain.', 'She put the notebook on top ___ the pile.'],
  exp_0854: ['We watched the documentary ___ TV last night.', 'The match will be shown ___ TV tonight.', 'She first saw the advert ___ TV.'],
  exp_0855: ['I met an old friend ___ the way home.', 'We stopped at a shop ___ the way home.', 'She lost her gloves ___ the way home.'],
  exp_0856: ['___ the whole, the trip was a success.', '___ the whole, I enjoyed the new course.', 'The students did well ___ the whole.'],
  exp_0858: ['The competition is open ___ all students.', 'The library is open ___ the public.', 'The programme is open ___ anyone interested in science.'],
  exp_0861: ['His opinion is opposite ___ mine.', 'Their views are almost opposite ___ ours.', 'The result was opposite ___ what we expected.'],
  exp_0862: ['She is optimistic ___ her chances of success.', 'He feels optimistic ___ the future.', 'We are optimistic ___ the results of the project.'],
  exp_0863: ['These shoes are completely out ___ fashion.', 'The old design has gone out ___ fashion.', 'That style is no longer popular and is out ___ fashion.'],
  exp_0864: ['The boat disappeared out ___ sight.', 'Keep the medicine out ___ sight of children.', 'The train soon moved out ___ sight.'],
  exp_0865: ['Skipping the final exam is out ___ the question.', 'Moving abroad this year is out ___ the question.', 'Selling the family home is out ___ the question.'],
  exp_0866: ['The hall was packed ___ excited fans.', 'The train was packed ___ passengers.', 'Her suitcase was packed ___ clothes.'],
  exp_0867: ['All her hard work finally paid ___.', 'The investment paid ___ after several years.', 'Our preparation paid ___ when we won the contest.'],
  exp_0868: ['The island is a paradise ___ nature lovers.', 'This library is a paradise ___ bookworms.', 'The museum is a paradise ___ history enthusiasts.'],
  exp_0869: ['She took part ___ the national competition.', 'Everyone can take part ___ the workshop.', 'Our class took part ___ a charity event.'],
  exp_0870: ['He decided to participate ___ the discussion.', 'Many teenagers participated ___ the survey.', 'We are going to participate ___ a science fair.'],
  exp_0871: ['She is very particular ___ keeping her desk tidy.', 'He is particular ___ the quality of his food.', 'Our teacher is particular ___ accurate spelling.'],
  exp_0872: ['Please pass ___ this message to your classmates.', 'The guide passed ___ some useful advice.', 'She passed the information ___ to the next group.'],
  exp_0873: ['Her grandfather passed ___ peacefully last year.', 'The famous writer passed ___ at the age of ninety.', 'His beloved dog passed ___ after a long illness.'],
  exp_0874: ['She is passionate ___ protecting the environment.', 'He has always been passionate ___ music.', 'Our teacher is passionate ___ helping students learn.'],
  exp_0883: ['He is rather peculiar ___ the way his food is prepared.', 'She is peculiar ___ the order of her books.', 'My grandfather is peculiar ___ keeping everything spotless.'],
  exp_0885: ['This book is perfect ___ beginners.', 'The weather is perfect ___ a picnic.', 'That room is perfect ___ small group lessons.'],
  exp_0886: ['This scarf looks perfect ___ your coat.', 'The sauce tastes perfect ___ grilled vegetables.', 'The blue curtains would look perfect ___ this furniture.'],
  exp_0887: ['The young dancers performed ___ the stage.', 'She hopes to perform ___ the stage one day.', 'The band performed ___ the stage at the festival.'],
  exp_0889: ['She persuaded me ___ the importance of daily practice.', 'The lawyer persuaded the jury ___ his client’s innocence.', 'He tried to persuade us ___ the benefits of his plan.'],
  exp_0890: ['He is pessimistic ___ his exam results.', 'She felt pessimistic ___ the future.', 'The team remained pessimistic ___ their chances.'],
  exp_0891: ['She was talking ___ the phone when I arrived.', 'He spent half an hour ___ the phone.', 'I heard the news while I was ___ the phone.'],
  exp_0893: ['Please pick ___ your books from the floor.', 'She picked ___ her sister from school.', 'He stopped to pick ___ the parcel.'],
  exp_0894: ['The castle is a famous place ___ interest.', 'The town has several places ___ interest.', 'Our guide showed us a beautiful place ___ interest.'],
  exp_0899: ['The teacher was pleased ___ our progress.', 'She was pleased ___ the final result.', 'His parents were pleased ___ his exam marks.']
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
