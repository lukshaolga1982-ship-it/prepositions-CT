import fs from 'node:fs';
const path=new URL('../data/expressions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(path,'utf8'));
const examples={
exp_0002:['She hopes to study ___ after school.','They travelled ___ for the first time last summer.','He spent several years working ___.'],
exp_0052:['Our train arrived ___ the station on time.','Please arrive ___ the airport two hours early.','She arrived ___ the hotel just before midnight.'],
exp_0053:['We arrived ___ Warsaw late in the evening.','She arrived ___ France yesterday.','They arrived ___ London by train.'],
exp_0549:['We went ___ a guided tour of the castle.','The students went ___ a guided tour of the museum.','She hopes to go ___ a guided tour of the old town.'],
exp_0554:['Our class went ___ a school trip to Minsk.','The children are going ___ a school trip next week.','They went ___ a school trip to the nature reserve.'],
exp_0555:['We are going ___ a trip to the mountains.','She went ___ a trip with her family.','The students hope to go ___ a trip abroad.'],
exp_0619:['We decided to stay ___ a hotel near the beach.','She stayed ___ a small hotel in the city centre.','They usually stay ___ hotels when travelling.'],
exp_0633:['___ any case, we should tell the teacher.','___ any case, the tickets must be booked today.','We may be late, but ___ any case we will call you.'],
exp_0635:['Write the key words ___ bold.','The headings are printed ___ bold.','Please highlight the main terms ___ bold.'],
exp_0636:['The posters were painted ___ bright colours.','She decorated the room ___ bright colours.','The artist created the picture ___ bright colours.'],
exp_0637:['We held a concert in celebration ___ our victory.','The town organised a festival in celebration ___ its anniversary.','They planted a tree in celebration ___ the school’s birthday.'],
exp_0638:['The new model is cheaper in comparison ___ the old one.','In comparison ___ last year, sales have increased.','This task is simple in comparison ___ the final exam.'],
exp_0639:['___ conclusion, we should practise regularly.','___ conclusion, the project achieved its main goal.','___ conclusion, the results support our hypothesis.'],
exp_0640:['She is still in contact ___ her school friends.','We are in contact ___ the organisers.','He has been in contact ___ his former teacher.'],
exp_0641:['In contrast ___ the first film, the sequel is funny.','The north is colder in contrast ___ the south.','In contrast ___ her sister, she prefers quiet activities.'],
exp_0642:['The dark furniture is in contrast ___ the pale walls.','His calm voice was in contrast ___ the noise outside.','The results are in contrast ___ earlier findings.'],
exp_0644:['He is ___ debt after buying the expensive car.','The family struggled while they were ___ debt.','She wants to avoid getting ___ debt.'],
exp_0645:['Please explain your answer ___ detail.','She described the experiment ___ detail.','The teacher discussed the topic ___ detail.'],
exp_0646:['Can you explain this rule ___ English?', 'She wrote the letter ___ English.','We tried to have the whole conversation ___ English.'],
exp_0647:['He looks young, but ___ fact he is forty.','___ fact, the first answer was correct.','The journey seemed short, but ___ fact it took five hours.'],
exp_0648:['The majority voted in favour ___ the proposal.','She spoke in favour ___ the new policy.','The committee decided in favour ___ the students.'],
exp_0649:['There is a large tree in front ___ our house.','She stood in front ___ the class.','The bus stopped in front ___ the museum.'],
exp_0650:['___ general, students enjoy interactive lessons.','___ general, the weather is mild in spring.','___ general, the new system works well.'],
exp_0655:['The charity provides food for people ___ need.','We should help families ___ need.','The programme supports children ___ need.'],
exp_0656:['The roof is in need ___ repair.','This school is in need ___ new computers.','The community is in need ___ urgent support.'],
exp_0658:['The tasks are listed in order ___ priority.','We arranged the projects in order ___ priority.','The requests should be handled in order ___ priority.'],
exp_0659:['She works hard in order ___ achieve her goals.','We left early in order ___ catch the first train.','He reads every day in order ___ improve his vocabulary.'],
exp_0660:['We met the author ___ person.','She prefers to discuss important issues ___ person.','I had never seen the famous painting ___ person before.'],
exp_0714:['They planned a journey from India ___ North Africa.','The explorers travelled from India ___ North Africa.','The route led from India ___ North Africa.'],
exp_0857:['The band is ___ tour across Europe.','The singer spent six months ___ tour.','The musicians met their fans while ___ tour.'],
exp_1087:['Travelling ___ train can be relaxing.','She prefers travelling ___ bus.', 'Travelling ___ bicycle is good for the environment.'],
exp_1108:['We paid a visit ___ our grandparents.','She wants to pay a visit ___ the museum.','The class paid a visit ___ the science centre.']
};
for(const item of data.expressions){const s=examples[item.id];if(!s)continue;if(s.length!==3||s.some(x=>(x.match(/___/g)||[]).length!==1))throw Error(item.id);if(item.id==='exp_0857')item.expression='on tour';item.sentences=s;item.gapSentence=s[0];item.example=s[0].replace('___',item.answer);item.editorialStatus='reviewed'}
fs.writeFileSync(path,JSON.stringify(data,null,2)+'\n');console.log('Reviewed:',Object.keys(examples).length);
