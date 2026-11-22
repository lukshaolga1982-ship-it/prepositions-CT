import fs from 'node:fs';
const path=new URL('../data/expressions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(path,'utf8'));
const examples={
exp_0275:['My grandparents live ___ the country.','We spent the weekend ___ the country.','She prefers the peace and quiet ___ the country.'],
exp_0573:['His face went ___ with embarrassment.','She went ___ when everyone looked at her.','The little boy went ___ after making a mistake.'],
exp_0574:['This scarf goes well ___ your coat.','Blue goes ___ grey in this design.','These shoes do not go ___ that dress.'],
exp_0576:['Regular exercise is good ___ your health.','Fresh vegetables are good ___ you.','This activity is good ___ improving concentration.'],
exp_0577:['She is very good ___ young children.','He is good ___ animals.','Our new teacher is good ___ beginners.'],
exp_0578:['She graduated ___ university last year.','He hopes to graduate ___ school in June.','My sister graduated ___ medical college.'],
exp_0579:['I am grateful ___ your help.','She was grateful ___ the opportunity.','We are grateful ___ all your support.'],
exp_0580:['I am grateful ___ my teacher for the advice.','She was grateful ___ her parents.','The team is grateful ___ its supporters.'],
exp_0581:['They greeted the visitors ___ a smile.','She greeted us ___ warm words.','The host greeted everyone ___ enthusiasm.'],
exp_0583:['The child has grown out ___ his old shoes.','She eventually grew out ___ her fear of dogs.','He has grown out ___ that childhood habit.'],
exp_0584:['The man was found guilty ___ theft.','She felt guilty ___ lying to her friend.','He was guilty ___ breaking the rules.'],
exp_0586:['___ the one hand, the new phone is expensive.', '___ the other hand, it has excellent features.','___ the one hand, the plan could save time.'],
exp_0587:['Please hand ___ your homework before Friday.','She handed ___ the completed form.','The students handed ___ their essays.'],
exp_0588:['The teacher handed ___ the worksheets.','Volunteers handed ___ leaflets at the entrance.','She handed ___ the certificates to the winners.'],
exp_0589:['We hung decorations ___ the Christmas tree.','The children hung colourful ornaments ___ the tree.','She hung a star ___ the top of the tree.'],
exp_0590:['What happened ___ your bicycle?', 'Something strange happened ___ him yesterday.','I wonder what happened ___ the missing letter.'],
exp_0593:['Pollution can cause serious harm ___ the environment.','Loud noise can cause harm ___ your hearing.','The chemicals may cause harm ___ animals.'],
exp_0594:['Smoking is harmful ___ your health.','Plastic waste is harmful ___ marine life.','Too much sunlight can be harmful ___ the skin.'],
exp_0595:['You still have a ___ to improve your score.','She had a ___ to meet the writer.','Everyone deserves a ___ to succeed.'],
exp_0596:['He had a fight ___ his brother.','She did not want to have a fight ___ her friend.','The two neighbours had a fight ___ each other.'],
exp_0597:['Let us have a look ___ your project.','She had a look ___ the timetable.','He stopped to have a look ___ the painting.'],
exp_0598:['The two friends have a lot ___ common.','We discovered that we have many interests ___ common.','The sisters have very little ___ common.'],
exp_0599:['Can I have a word ___ you after class?', 'She wanted to have a word ___ the director.','He had a quiet word ___ his colleague.'],
exp_0601:['Do you have any experience ___ teaching?', 'She has experience ___ organising events.','He gained valuable experience ___ customer service.'],
exp_0602:['The school has strong links ___ the local university.','Our company has links ___ several charities.','The museum has close links ___ the community.'],
exp_0604:['She has the right qualifications ___ the job.','Do you have qualifications ___ this position?', 'He needs additional qualifications ___ teaching.'],
exp_0605:['I have not heard ___ my cousin for months.','She was happy to hear ___ an old friend.','We hope to hear ___ the organisers soon.'],
exp_0609:['The charity aims to help those ___ need.','We should always help people ___ need.','The volunteers collected clothes to help those ___ need.'],
exp_0610:['The instructions were helpful ___ the students.','This guide is helpful ___ beginners.','Her advice was very helpful ___ me.'],
exp_0676:['The family moved to a house ___ the country.','It is peaceful ___ the country.','We often spend our holidays ___ the country.'],
exp_0698:['This is one of the largest cities ___ the world.','There are many languages ___ the world.','Some of the most beautiful places ___ the world are protected.'],
exp_0884:['The charity supports people ___ need.','We donated blankets to families ___ need.','The programme provides meals for people ___ need.']
};
for(const item of data.expressions){const s=examples[item.id];if(!s)continue;if(s.length!==3||s.some(x=>(x.match(/___/g)||[]).length!==1))throw Error(item.id);if(item.id==='exp_0573'){item.expression='go red';item.translation='покраснеть';item.answer='red';item.acceptedAnswers=['red']}item.sentences=s;item.gapSentence=s[0];item.example=s[0].replace('___',item.answer);item.editorialStatus='reviewed'}
fs.writeFileSync(path,JSON.stringify(data,null,2)+'\n');console.log('Reviewed:',Object.keys(examples).length);
