import fs from 'node:fs';
const path=new URL('../data/expressions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(path,'utf8'));
const reviewed={
exp_0087:['The children are ___ school until three o’clock.','She met her best friend ___ school.','We learned about this topic ___ school.'],
exp_0113:['Many teenagers attend English ___ after school.','She decided to attend English ___ twice a week.','He attends English ___ at the local college.'],
exp_0359:['The students entered the ___ quietly.','Please knock before you enter the ___.','The teacher entered the ___ carrying a pile of books.'],
exp_0511:['It takes twenty minutes to get ___ school by bus.','How do you usually get ___ school?', 'She got ___ school just before the bell rang.'],
exp_0568:['I usually go ___ school on foot.','The children go ___ school by bus.','She was excited to go ___ school on the first day.'],
exp_0745:['Today we will learn ___ British traditions.','The pupils learned ___ endangered animals.','I want to learn more ___ the history of this town.'],
exp_0746:['We had to learn the poem ___ heart.','The children learned a short dialogue ___ heart.','She learned the new vocabulary ___ heart.'],
exp_0747:['We can learn ___ our mistakes.','She learned a lot ___ her first teacher.','Children often learn ___ watching adults.'],
exp_0953:['You were right ___ the date of the exam.','She was right ___ the answer after all.','I think he is right ___ this problem.'],
exp_0954:['The price rose ___ five percent last year.','The temperature rose ___ three degrees.','The number of students rose ___ nearly a hundred.'],
exp_0955:['The temperature rose ___ thirty degrees.','The price rose ___ fifty euros.','The water level rose ___ two metres.'],
exp_0964:['The teacher was satisfied ___ our results.','She felt satisfied ___ her progress.','The parents were satisfied ___ the school’s decision.'],
exp_0965:['The volunteers saved the animals ___ danger.','Her quick action saved the child ___ injury.','The firefighters saved the old house ___ destruction.'],
exp_0967:['She is saving up ___ a new laptop.','They saved up ___ their summer holiday.','He is trying to save up ___ a bicycle.'],
exp_0972:['I passed the test ___ the second time.','She visited the museum ___ the second time in June.','He tried the recipe ___ the second time and succeeded.'],
exp_0973:['I saw the comet ___ my own eyes.','She wanted to see the famous painting ___ her own eyes.','They saw the damage ___ their own eyes.'],
exp_0975:['The teacher separated the two groups ___ each other.','Please separate the red cards ___ the blue ones.','The river separates the village ___ the forest.'],
exp_0976:['She is serious ___ learning a new language.','He is serious ___ his studies.','They are serious ___ reducing waste at school.'],
exp_0977:['The soup is served ___ fresh bread.','They served the fish ___ vegetables.','Tea was served ___ biscuits after the lesson.'],
exp_0979:['We set ___ early to avoid the traffic.','The hikers set ___ just after sunrise.','They set ___ on their journey before dawn.'],
exp_0980:['It took him months to settle ___ in a new city.','The children soon settled ___ at their new school.','She hopes to settle ___ and start a family.'],
exp_0981:['I shared my notes ___ a classmate.','She shared her lunch ___ a friend.','We shared the good news ___ our families.'],
exp_0982:['Everyone was shocked ___ the unexpected announcement.','We were shocked ___ the news of the accident.','She was shocked ___ the result of the vote.'],
exp_0983:['The family was shocked ___ the sudden storm damage.','He was shocked ___ the violent scene.','The audience was shocked ___ the actor’s behaviour.'],
exp_0986:['There is a shortage ___ qualified teachers in the region.','The town has a shortage ___ clean drinking water.','A shortage ___ time prevented us from finishing.'],
exp_0987:['Please do not shout ___ your classmates.','The angry driver shouted ___ the cyclist.','She shouted ___ him for breaking the window.'],
exp_0988:['The lost tourist shouted ___ help.','She shouted ___ help when she saw the smoke.','The child began to shout ___ help.'],
exp_0989:['He shouted ___ his friend across the street.','She shouted ___ the children to come inside.','The guide shouted ___ the group from the hill.'],
exp_0992:['The two friends walked side ___ side.','We sat side ___ side during the concert.','The volunteers worked side ___ side all day.'],
exp_0993:['You can sign up ___ the school competition online.','She signed up ___ an English course.','We decided to sign up ___ the charity event.'],
exp_0996:['The children were sitting ___ a table by the window.','She was sitting ___ a table near the door.','They were sitting ___ a table and discussing the project.'],
exp_1027:['He is studying ___ his final examinations.','She studies ___ a degree in medicine.','We spent the weekend studying ___ the test.'],
exp_1065:['The experience taught him a valuable ___.','The coach wanted to teach the team a ___.','Making the same mistake twice taught her a ___.']
};
for(const item of data.expressions){const sentences=reviewed[item.id];if(!sentences)continue;if(sentences.length!==3||sentences.some(x=>(x.match(/___/g)||[]).length!==1))throw Error(item.id);item.sentences=sentences;item.gapSentence=sentences[0];item.example=sentences[0].replace('___',item.answer);item.editorialStatus='reviewed'}
fs.writeFileSync(path,JSON.stringify(data,null,2)+'\n');console.log('Reviewed:',Object.keys(reviewed).length);
