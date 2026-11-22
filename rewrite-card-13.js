import fs from 'node:fs';
const path=new URL('../data/expressions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(path,'utf8'));
const examples={
exp_0212:['Children ___ three can enter free of charge.','The activity is not suitable for children ___ three.','Admission is free for children ___ three.'],
exp_0392:['She fell in love ___ him at university.','He fell in love ___ the city during his first visit.','They fell in love ___ each other many years ago.'],
exp_0563:['I am going out ___ my friends tonight.','She often goes out ___ her friends on Fridays.','He went out ___ his friends after the exam.'],
exp_0653:['She is deeply in love ___ her husband.','He has been in love ___ her for years.','They are still in love ___ each other.'],
exp_0722:['Please keep ___ trying until you succeed.','He kept ___ talking despite the noise.','She kept ___ practising for the competition.'],
exp_0723:['Keep out ___ the old building: it is unsafe.','The sign warned visitors to keep out ___ the water.','Please keep out ___ the restricted area.'],
exp_0724:['We agreed to keep quiet ___ the surprise.', 'She kept quiet ___ her plans until Friday.','He promised to keep quiet ___ the problem.'],
exp_0726:['Please keep ___ the agreed schedule.','The students must keep ___ the rules.','She tried to keep ___ her original plan.'],
exp_0727:['The app helps us keep track ___ our progress.','She uses a diary to keep track ___ her assignments.','It is difficult to keep track ___ all the changes.'],
exp_0728:['I cannot keep up ___ the fastest runners.','She reads the news to keep up ___ current events.','He worked hard to keep up ___ the class.'],
exp_0729:['Regular practice is the key ___ success.','Good communication is the key ___ teamwork.','The password is the key ___ this account.'],
exp_0731:['Someone knocked ___ the door.','She knocked ___ the office door before entering.','He knocked ___ the window to get our attention.'],
exp_0732:['The strong wind knocked ___ a tree.','The car almost knocked ___ the cyclist.','The children accidentally knocked ___ the tower of blocks.'],
exp_0733:['Do you know anything ___ this writer?','She knows a lot ___ British traditions.','I want to know more ___ the programme.'],
exp_0734:['There is a serious lack ___ clean water.','The project failed because of a lack ___ money.','The report highlights a lack ___ qualified staff.'],
exp_0736:['___ last, the bus arrived.','We found the missing keys ___ last.','After hours of waiting, the results were announced ___ last.'],
exp_0737:['Last but not ___, I want to thank our volunteers.','And last but not ___, remember to enjoy yourself.','Last but not ___, we should discuss the budget.'],
exp_0738:['The meeting lasted ___ two hours.','The concert will last ___ ninety minutes.','The holiday lasted ___ a week.'],
exp_0739:['I was late ___ school this morning.','She was late ___ her appointment.','He does not want to be late ___ the interview.'],
exp_0740:['We will discuss the details later ___.','She called me back later ___ that evening.','He finished his homework and later ___ went for a walk.'],
exp_0741:['It is unkind to laugh ___ other people.','The children laughed ___ his funny hat.','Nobody should laugh ___ a student’s mistakes.'],
exp_0742:['Could you lay the ___ before dinner?','She helped her mother lay the ___ for lunch.','The children took turns laying the ___.'],
exp_0744:['Please do not lean ___ the glass door.','She leaned ___ the wall and rested.','He leaned ___ the railing to watch the boats.'],
exp_0748:['We leave ___ London tomorrow morning.','She left ___ university at the end of August.','The train leaves ___ Minsk in ten minutes.'],
exp_0749:['The bus leaves ___ the main station.','Our flight leaves ___ Terminal Two.','The train leaves ___ Platform Three.'],
exp_0750:['Please do not leave litter ___ the beach.','Someone left litter ___ the classroom floor.','Visitors must not leave litter ___ the paths.'],
exp_0751:['Can you lend your notes ___ me?','She lent some money ___ her friend.','He lent his bicycle ___ a neighbour.'],
exp_0752:['Please do not let me ___.','She was afraid of letting her team ___.','He promised he would not let his parents ___.'],
exp_0753:['They let ___ fireworks at midnight.','The children watched adults let ___ fireworks.','The festival ended when they let ___ the fireworks.'],
exp_0754:['Please let the cat ___ of the room.','She opened the cage to let the bird ___.','The teacher let the students ___ early.'],
exp_0755:['He likes to lie ___ bed and read.', 'She lay ___ bed until noon.','The child was lying ___ bed with a fever.'],
exp_0778:['Her love ___ music began in childhood.','His love ___ his family was obvious.','They share a love ___ travelling.']
};
for(const item of data.expressions){const s=examples[item.id];if(!s)continue;if(s.length!==3||s.some(x=>(x.match(/___/g)||[]).length!==1))throw Error(item.id);item.sentences=s;item.gapSentence=s[0];item.example=s[0].replace('___',item.answer);item.editorialStatus='reviewed'}
fs.writeFileSync(path,JSON.stringify(data,null,2)+'\n');console.log('Reviewed:',Object.keys(examples).length);
