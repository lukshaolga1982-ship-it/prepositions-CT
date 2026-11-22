import fs from 'node:fs';
const path=new URL('../data/expressions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(path,'utf8'));
const examples={
exp_0023:['Many students are afraid ___ making mistakes.','She is afraid ___ spiders.','He was afraid ___ speaking in public.'],
exp_0038:['She was angry ___ her brother for taking her phone.','He was angry ___ his friend for being late.','The teacher was angry ___ the students who broke the rules.'],
exp_0056:['He felt ashamed ___ his rude behaviour.','She was ashamed ___ telling a lie.','The student was ashamed ___ his mistake.'],
exp_0591:['She was happy ___ the exam results.','He felt happy ___ the good news.','They were happy ___ winning the competition.'],
exp_0592:['Are you happy ___ the service you received?','She was happy ___ her new bicycle.','The teacher was happy ___ our progress.'],
exp_0671:['The flowers begin to bloom ___ spring.','We often go hiking ___ spring.','The weather gets warmer ___ spring.'],
exp_0672:['The two phones are similar in terms ___ price.','In terms ___ quality, this model is better.','The project was successful in terms ___ participation.'],
exp_0673:['Many important inventions appeared ___ the twentieth century.','Life changed dramatically ___ the twentieth century.','The building was constructed ___ the twentieth century.'],
exp_0674:['You can see mountains ___ the background of the photo.','A small church appears ___ the background.','The hills are visible ___ the background of the painting.'],
exp_0675:['There is a fountain in the centre ___ the square.','The museum stands in the centre ___ the city.','A large table is in the centre ___ the room.'],
exp_0678:['She remained calm in the face ___ danger.','They showed courage in the face ___ serious difficulties.','The community stayed united in the face ___ the crisis.'],
exp_0679:['There are bright flowers ___ the foreground of the picture.','A small boat appears ___ the foreground of the photo.','The artist painted a tree ___ the foreground.'],
exp_0680:['Many rare animals live ___ the jungle.','The explorers spent several days ___ the jungle.','It is often humid ___ the jungle.'],
exp_0681:['Technology has changed greatly ___ the last thirty years.','The population has grown ___ the last thirty years.','Many new schools have opened ___ the last thirty years.'],
exp_0683:['Castles were built across Europe ___ the Middle Ages.','Many towns developed ___ the Middle Ages.','People travelled mainly on foot or horseback ___ the Middle Ages.'],
exp_0684:['We met in the middle ___ the park.','She stopped in the middle ___ the road.','The story changes direction in the middle ___ the book.'],
exp_0685:['We spent our holiday ___ the mountains.','It can be cold ___ the mountains even in summer.','They went hiking ___ the mountains.'],
exp_0686:['I read about the discovery ___ the news.','The story appeared ___ the news yesterday.','We heard about the event ___ the news.'],
exp_0687:['The town lies in the north ___ the country.','Several lakes are located in the north ___ Belarus.','The climate is colder in the north ___ the region.'],
exp_0688:['People wrote more letters ___ the past.','Things were different ___ the past.','The building was a school ___ the past.'],
exp_0689:['Who is the girl ___ the photo?','There are three children ___ the picture.','You can see a beautiful lake ___ the photo.'],
exp_0690:['Try to live ___ the present instead of worrying about tomorrow.','She prefers to focus on what she can do ___ the present.','We should appreciate the opportunities we have ___ the present.'],
exp_0691:['Please solve the second problem ___ the same way.','Both groups answered ___ the same way.','They organised their notes ___ the same way.'],
exp_0692:['We sat ___ the shade of a large tree.','The children rested ___ the shade.','It was much cooler ___ the shade.'],
exp_0693:['There were hundreds of stars ___ the sky.','A dark cloud appeared ___ the sky.','We saw a rainbow ___ the sky.'],
exp_0695:['The story takes place in the time ___ the Roman Empire.','The castle was built in the time ___ the early kings.','Life was very different in the time ___ Shakespeare.'],
exp_0696:['These animals rarely survive ___ the wild.','Tigers live ___ the wild in parts of Asia.','The researchers observed the birds ___ the wild.'],
exp_0916:['She is proud ___ her achievements.','His parents are proud ___ him.','The team was proud ___ its performance.'],
exp_0963:['He was sad ___ the end of the holiday.','She felt sad ___ the news.','They were sad ___ leaving their friends.'],
exp_1041:['We were surprised ___ the unexpected result.','She was surprised ___ his sudden arrival.','He was surprised ___ the difficulty of the task.'],
exp_1103:['The students were unhappy ___ the new rules.','She felt unhappy ___ the final decision.','He was unhappy ___ the quality of the service.'],
exp_1125:['Many parents are worried ___ their children’s safety.','She is worried ___ the exam tomorrow.','He was worried ___ losing his keys.']
};
for(const item of data.expressions){const s=examples[item.id];if(!s)continue;if(s.length!==3||s.some(x=>(x.match(/___/g)||[]).length!==1))throw Error(item.id);if(item.id==='exp_0038'){item.expression='angry with somebody';item.translation='сердиться на кого-либо'}if(item.id==='exp_1041')item.expression='surprised by';item.sentences=s;item.gapSentence=s[0];item.example=s[0].replace('___',item.answer);item.editorialStatus='reviewed'}
fs.writeFileSync(path,JSON.stringify(data,null,2)+'\n');console.log('Reviewed:',Object.keys(examples).length);
