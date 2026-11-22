import fs from 'node:fs';
const path = new URL('../data/expressions.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const examples = {
  exp_0039: ['Do you know the answer ___ this question?', 'She finally found the answer ___ the problem.', 'The teacher explained the answer ___ the last question.'],
  exp_0057: ['He asked ___ the history of the castle.', 'The students asked ___ the examination rules.', 'She asked ___ the price of the tickets.'],
  exp_0058: ['I asked ___ some help with my homework.', 'She asked the teacher ___ advice.', 'The children asked ___ another chance.'],
  exp_0185: ['I contacted my parents ___ phone.', 'They sent the news ___ radio.', 'You can book the tickets ___ telephone.'],
  exp_0666: ['In reply ___ your email, I am sending the document.', 'She wrote a letter in reply ___ his request.', 'In reply ___ your question, the event starts at noon.'],
  exp_0772: ['Please look ___ the report before the meeting.', 'She looked ___ the photos from her holiday.', 'He looked ___ his notes before the test.'],
  exp_0773: ['We looked up ___ the stars.', 'The children looked up ___ the tall building.', 'He looked up ___ the sky as the plane flew over.'],
  exp_0774: ['The driver lost control ___ the car.', 'She was afraid of losing control ___ the situation.', 'He almost lost control ___ his emotions.'],
  exp_0775: ['She began to lose interest ___ the game.', 'Many students lose interest ___ a subject without practice.', 'He has lost interest ___ collecting stamps.'],
  exp_0776: ['We lost sight ___ the boat in the fog.', 'She lost sight ___ her friends in the crowd.', 'The hikers soon lost sight ___ the village.'],
  exp_0777: ['I do not want to lose touch ___ my school friends.', 'She lost touch ___ her cousin after moving abroad.', 'They promised not to lose touch ___ each other.'],
  exp_0779: ['The dog showed great loyalty ___ its owner.', 'She expressed her loyalty ___ the team.', 'His loyalty ___ his friends never changed.'],
  exp_0780: ['This cheese is made ___ fresh milk.', 'Paper can be made ___ recycled materials.', 'The juice is made ___ several kinds of fruit.'],
  exp_0781: ['The table is made ___ solid wood.', 'Her necklace is made ___ silver.', 'The statue is made ___ stone.'],
  exp_0782: ['Our class is made up ___ twenty students.', 'The committee is made up ___ five teachers.', 'The team is made up ___ people from different countries.'],
  exp_0783: ['He made a date ___ his girlfriend for Saturday.', 'She made a date ___ him to visit the gallery.', 'They made a date ___ each other for the following weekend.'],
  exp_0784: ['The company made a deal ___ a new supplier.', 'She made a deal ___ her brother to share the chores.', 'They made a deal ___ the local business.'],
  exp_0785: ['Your support can make a difference ___ our project.', 'Small changes can make a difference ___ the environment.', 'Her advice made a difference ___ my results.'],
  exp_0786: ['She made a great contribution ___ the research.', 'Volunteers made a great contribution ___ the event.', 'The scientist made a great contribution ___ modern medicine.'],
  exp_0787: ['He made a joke ___ the rainy weather.', 'She made a joke ___ her own mistake.', 'The teacher made a joke ___ the difficult assignment.'],
  exp_0892: ['You can contact the office ___ phone.', 'We spoke to the manager ___ phone.', 'She booked the appointment ___ phone.'],
  exp_0968: ['We said goodbye ___ our friends at the station.', 'She said goodbye ___ her classmates.', 'He stopped to say goodbye ___ his teacher.'],
  exp_0969: ['What did you say ___ your parents?', 'She said something kind ___ the new student.', 'He did not know what to say ___ his friend.'],
  exp_1006: ['She is confident when speaking ___ public.', 'Many people feel nervous speaking ___ public.', 'The course teaches students how to speak ___ public.'],
  exp_1007: ['I need to speak ___ the head teacher.', 'She spoke ___ her friend after class.', 'He wants to speak ___ the manager.'],
  exp_1008: ['Speaking ___ myself, I prefer the second option.', 'Speaking ___ myself, I enjoyed the workshop.', 'Speaking ___ myself, I would choose a smaller group.'],
  exp_1063: ['We talked ___ our plans for the summer.', 'The teacher talked ___ healthy eating.', 'She likes to talk ___ books.'],
  exp_1064: ['I talked ___ my cousin yesterday.', 'The teacher talked ___ the parents after the meeting.', 'She wants to talk ___ her friend about the problem.'],
  exp_1067: ['She told us ___ her visit to London.', 'He told the class ___ his new hobby.', 'The guide told us ___ the history of the building.'],
  exp_1068: ['I cannot tell the twins ___.', 'These two pictures are difficult to tell ___.', 'She can easily tell the two singers ___.'],
  exp_1069: ['You can tell ___ his voice that he is tired.', 'I could tell ___ her expression that something was wrong.', 'You can tell ___ the colour whether the fruit is ripe.'],
  exp_1070: ['It is hard to tell this copy ___ the original.', 'Can you tell one twin ___ the other?', 'She can tell genuine leather ___ imitation leather.'],
  exp_1134: ['Please say hello ___ your parents for me.', 'She stopped to say hello ___ an old friend.', 'Remember to say hello ___ your new classmates.']
};
for (const item of data.expressions) {
  const sentences = examples[item.id];
  if (!sentences) continue;
  if (sentences.length !== 3 || sentences.some(s => (s.match(/___/g) || []).length !== 1)) throw Error(item.id);
  if (item.id === 'exp_1064') { item.expression = 'talk with somebody'; item.translation = 'разговаривать с кем-либо'; item.answer = 'with'; item.acceptedAnswers = ['with']; }
  item.sentences = sentences;
  item.gapSentence = sentences[0];
  item.example = sentences[0].replace('___', item.answer);
  item.editorialStatus = 'reviewed';
}
fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
console.log('Reviewed:', Object.keys(examples).length);
