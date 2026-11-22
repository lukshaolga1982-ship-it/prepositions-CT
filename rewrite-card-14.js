import fs from 'node:fs';
const path=new URL('../data/expressions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(path,'utf8'));
const examples={
exp_0324:['His rude behaviour showed disrespect ___ the teacher.','Such comments show disrespect ___ other people.','The decision seemed like a sign of disrespect ___ the volunteers.'],
exp_0450:['Our new neighbour is friendly ___ everyone.','She was very friendly ___ the visitors.','The staff were friendly ___ the children.'],
exp_0493:['He gets no respect ___ his colleagues.','The unfair coach got no respect ___ the players.','She felt that she received no respect ___ her classmates.'],
exp_0528:['We should give respect ___ people with different opinions.','The pupils learned to give respect ___ their elders.','He always gives respect ___ his teammates.'],
exp_0697:['The children went for a walk ___ the woods.','We found a small stream ___ the wood.','Many wild animals live ___ the woods.'],
exp_0700:['She is staying ___ town this weekend.','There are several good bookshops ___ town.','My grandparents live ___ town, not in the countryside.'],
exp_0701:['Call me if you are ___ trouble.','The hikers knew they were ___ trouble when it got dark.','She offered to help anyone ___ trouble.'],
exp_0702:['The students answered the questions ___ turn.','Each player spoke ___ turn.','The children took the books ___ turn.'],
exp_0703:['The old machine is still ___ use.','This classroom is ___ use at the moment.','The bridge has been ___ use for decades.'],
exp_0704:['Parents have a strong influence ___ their children.','Music can have a positive influence ___ mood.','The weather had an influence ___ our plans.'],
exp_0705:['The teacher informed us ___ the timetable change.','Please inform the parents ___ the new rules.','She informed her colleagues ___ the decision.'],
exp_0706:['She insisted ___ checking the answers again.','He insisted ___ paying for dinner.','The coach insisted ___ regular training.'],
exp_0707:['He is interested ___ modern art.','She became interested ___ science at school.','Many students are interested ___ learning another language.'],
exp_0708:['The teacher introduced the guest ___ the class.','She introduced her friend ___ her parents.','He introduced the new student ___ everyone.'],
exp_0709:['They invited us ___ the school concert.','She invited her friend ___ her birthday party.','He invited the whole class ___ the exhibition.'],
exp_0710:['She was jealous ___ her brother’s success.','He felt jealous ___ his friend’s new bicycle.','The little girl was jealous ___ her older sister.'],
exp_0711:['The children were encouraged to join ___ the game.','She decided to join ___ the discussion.','Everyone can join ___ the singing.'],
exp_0713:['It is unkind to joke ___ someone’s appearance.','He joked ___ his own mistakes.','The friends often joke ___ their school days.'],
exp_0715:['The children jumped ___ the water.','He jumped ___ the pool without hesitation.','She watched the swimmers jump ___ the lake.'],
exp_0716:['My brother is keen ___ football.','She is keen ___ learning new languages.','He has always been keen ___ photography.'],
exp_0717:['It is difficult to keep your balance ___ a narrow beam.','The gymnast kept her balance ___ one foot.','He tried to keep his balance ___ the moving boat.'],
exp_0718:['Please keep an eye ___ my bag.','She kept an eye ___ the younger children.','Could you keep an eye ___ the oven?'],
exp_0719:['Keep away ___ the edge of the cliff.','The sign says to keep away ___ the machinery.','Children should keep away ___ dangerous chemicals.'],
exp_0720:['We try to keep in contact ___ our former classmates.','She keeps in contact ___ friends abroad.','The teacher keeps in contact ___ students’ parents.'],
exp_0721:['I want to keep in touch ___ my friends.','They kept in touch ___ each other after graduation.','She keeps in touch ___ her cousins online.'],
exp_0730:['Please be kind ___ new students.','She is always kind ___ animals.','He was kind ___ the younger children.'],
exp_0875:['The teacher is patient ___ beginners.','Please be patient ___ your little brother.','She was patient ___ the children throughout the lesson.'],
exp_0881:['The team paid respect ___ its former coach.','The students paid respect ___ the veterans.','We should pay respect ___ people who helped us.'],
exp_0944:['Everyone deserves respect ___ their opinions.','She showed great respect ___ her teacher.','He has deep respect ___ people who work hard.'],
exp_0958:['It is rude ___ interrupt other people.','She was rude ___ the shop assistant.','He apologised for being rude ___ his friend.'],
exp_0990:['We should show respect ___ older people.','The children showed respect ___ their guests.','He always shows respect ___ his opponents.'],
exp_1102:['The receptionist was unfriendly ___ the visitors.','He seemed unfriendly ___ his new classmates.','It is unfair to be unfriendly ___ people you do not know.']
};
for(const item of data.expressions){const s=examples[item.id];if(!s)continue;if(s.length!==3||s.some(x=>(x.match(/___/g)||[]).length!==1))throw Error(item.id);if(item.id==='exp_0717')item.expression='keep your balance on';item.sentences=s;item.gapSentence=s[0];item.example=s[0].replace('___',item.answer);item.editorialStatus='reviewed'}
fs.writeFileSync(path,JSON.stringify(data,null,2)+'\n');console.log('Reviewed:',Object.keys(examples).length);
