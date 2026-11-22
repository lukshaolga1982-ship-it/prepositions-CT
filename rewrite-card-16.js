import fs from 'node:fs';
const path=new URL('../data/expressions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(path,'utf8'));
const examples={
exp_0003:['In the absence ___ the teacher, the class worked quietly.','In the absence ___ reliable information, we had to wait.','The meeting continued in the absence ___ the director.'],
exp_0024:['We usually finish our lessons ___ the afternoon.','She likes reading ___ the afternoon.','The museum closes late ___ the afternoon.'],
exp_0091:['She started learning English at the age ___ six.','He retired at the age ___ sixty-five.','The young musician began performing at the age ___ ten.'],
exp_0093:['We stopped at the base ___ the mountain.','There is a small village at the base ___ the hill.','The climbers rested at the base ___ the cliff.'],
exp_0094:['There is a short introduction at the beginning ___ the book.','We met at the beginning ___ the school year.','Please write your name at the beginning ___ the page.'],
exp_0095:['You can buy this medicine ___ the chemist’s.','She stopped ___ the chemist’s to get a prescription.','He asked for advice ___ the chemist’s.'],
exp_0096:['We saw acrobats ___ the circus.','The children were excited ___ the zoo.','She met her friends ___ the disco.'],
exp_0097:['The climbers reached the summit at the cost ___ great effort.','The company grew at the cost ___ workers’ health.','They achieved success at the cost ___ many sacrifices.'],
exp_0099:['The answers are printed at the end ___ the book.','She thanked everyone at the end ___ the speech.','We took a group photo at the end ___ the course.'],
exp_0100:['I bought a magazine ___ the newsagent’s.','She stopped ___ the newsagent’s before school.','The newspaper is available ___ the newsagent’s.'],
exp_0101:['The children started singing ___ the same time as the adults.', 'He was listening and taking notes ___ the same time.','Both teams finished ___ the same time.'],
exp_0105:['She did not understand the situation ___ the time.','He was abroad ___ the time of the accident.','I was very busy ___ the time.'],
exp_0106:['There is a flag at the top ___ the tower.','We rested at the top ___ the hill.','The title is printed at the top ___ the page.'],
exp_0107:['We usually visit our grandparents ___ the weekend.','She plans to relax ___ the weekend.','What are you doing ___ the weekend?'],
exp_0127:['The decision was made on the basis ___ the evidence.','The applicants were selected on the basis ___ experience.','The report was prepared on the basis ___ survey results.'],
exp_0134:['At the beginning ___ the lesson, we revised new words.','She felt nervous at the beginning ___ the interview.','The teacher explained the task at the beginning ___ the class.'],
exp_0203:['Many inventions appeared ___ the twentieth century.','The city grew rapidly ___ the twentieth century.','The building was constructed ___ the twentieth century.'],
exp_0211:['She bought some vitamins ___ the chemist’s.','You can ask about this medicine ___ the chemist’s.','He picked up his prescription ___ the chemist’s.'],
exp_0228:['Do not come ___ the dangerous animal.','The dog would not come ___ the stranger.','The children were told not to come ___ the edge.'],
exp_0264:['___ the contrary, the second task was easier.','The film was not boring; ___ the contrary, it was exciting.','The weather did not improve; ___ the contrary, it got worse.'],
exp_0272:['The team succeeded at the cost ___ many sleepless nights.','The project was completed at the cost ___ considerable effort.','The victory came at the cost ___ several injuries.'],
exp_0314:['There is a clear difference ___ the two approaches.','Can you explain the difference ___ these words?','The difference ___ the results was surprising.'],
exp_0319:['We walked in the direction ___ the station.','The birds flew in the direction ___ the lake.','She pointed in the direction ___ the exit.'],
exp_0327:['We could see mountains ___ the distance.','A train appeared ___ the distance.','The lights of the town shone ___ the distance.'],
exp_0338:['In Britain, people drive ___ the left.','Visitors should remember to drive ___ the left in Japan.','The road signs remind motorists to drive ___ the left.'],
exp_0346:['There are many different climates ___ the Earth.','There are billions of people ___ the Earth.','Life ___ the Earth depends on energy from the Sun.'],
exp_0351:['The children stood at the edge ___ the lake.','A small house stands at the edge ___ the forest.','We stopped at the edge ___ the road.'],
exp_0352:['The final questions are at the end ___ the test.','There is a glossary at the end ___ the textbook.','She added a note at the end ___ the letter.'],
exp_0353:['___ the end, we found the lost keys.','The team won ___ the end.','We decided to stay at home ___ the end.'],
exp_0368:['We often go for walks ___ the evening.','She likes to read ___ the evening.','The concert starts ___ the evening.'],
exp_0383:['They remained calm in the face ___ danger.','The villagers showed courage in the face ___ the storm.','He did not give up in the face ___ difficulties.'],
exp_0400:['My grandparents live ___ a farm.','The children helped with the animals ___ the farm.','She spent the summer ___ a farm.']
};
for(const item of data.expressions){const s=examples[item.id];if(!s)continue;if(s.length!==3||s.some(x=>(x.match(/___/g)||[]).length!==1))throw Error(item.id);item.sentences=s;item.gapSentence=s[0];item.example=s[0].replace('___',item.answer);item.editorialStatus='reviewed'}
fs.writeFileSync(path,JSON.stringify(data,null,2)+'\n');console.log('Reviewed:',Object.keys(examples).length);
