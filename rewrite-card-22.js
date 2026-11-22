import fs from 'node:fs';
const path=new URL('../data/expressions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(path,'utf8'));
const examples={
exp_0103:['The children are waiting for us ___ the swimming pool.','We met our friends ___ the swimming pool.','She spends two evenings a week ___ the swimming pool.'],
exp_0519:['Teachers should give attention ___ students who need support.','We must give more attention ___ safety.','She gave special attention ___ the youngest children.'],
exp_0520:['She gave birth ___ a healthy baby.','The animal gave birth ___ two young ones.','Her sister gave birth ___ twins last week.'],
exp_0523:['Please give my regards ___ your parents.','She asked me to give her regards ___ the teacher.','He sent a message to give his regards ___ the family.'],
exp_0524:['We gave presents ___ the children.','She gave presents ___ her grandparents.','The volunteers gave small presents ___ all participants.'],
exp_0525:['The decision gave rise ___ serious questions.','The new discovery gave rise ___ further research.','The storm gave rise ___ many problems.'],
exp_0526:['Cars must give way ___ pedestrians at this crossing.','The old system gave way ___ a more modern one.','Fear eventually gave way ___ confidence.'],
exp_0527:['The coach gave advice ___ improving our fitness.','She gave useful advice ___ preparing for exams.','The teacher gave advice ___ writing a research paper.'],
exp_0529:['___ a glance, I knew something was wrong.','___ a glance, she recognised the photograph.','The difference was obvious ___ a glance.'],
exp_0530:['He went ___ his business as usual.','She quietly went ___ her daily tasks.','The workers went ___ their duties despite the noise.'],
exp_0531:['We went ___ the bridge to reach the town.','The hikers went ___ the river on a small ferry.','She went ___ the field towards the village.'],
exp_0532:['The dog went ___ the ball.','She decided to go ___ her dream of becoming a doctor.','The police went ___ the suspect.'],
exp_0533:['We went ___ the river until we reached the bridge.','The tourists went ___ the coast.','She went ___ the path through the forest.'],
exp_0534:['The children went ___ the lake on bicycles.','We went ___ the old town before dinner.','The runner went ___ the obstacles.'],
exp_0535:['She went away ___ the busy city for the weekend.','He wanted to go away ___ the noise.','The birds flew away ___ the approaching storm.'],
exp_0536:['We went back ___ the hotel after lunch.','She hopes to go back ___ her hometown.','He went back ___ his desk to finish the task.'],
exp_0537:['The milk will go ___ if you leave it outside.','The fruit went ___ in the heat.','Do not eat the cheese if it has gone ___.'],
exp_0539:['The days went ___ quickly during the holiday.','We watched the boats go ___ on the river.','As the years went ___, they became good friends.'],
exp_0540:['The constant noise was enough to make anyone go ___.','He thought he would go ___ if the delay continued.','She nearly went ___ from worry.'],
exp_0543:['We decided to go ___ a swim in the lake.','She asked her friends to go ___ a walk.','The family went ___ a picnic on Sunday.'],
exp_0682:['___ the long run, regular exercise improves health.','The decision will save money ___ the long run.','___ the long run, patience is more useful than rushing.'],
exp_0712:['He wants to join our school cricket ___.','She was excited to join the school cricket ___.','Several new players joined our cricket ___.'],
exp_0829:['Several paintings are ___ display at the gallery.','The winning projects are ___ display in the hall.','The museum has rare objects ___ display.'],
exp_0896:['Exercise plays an important role ___ staying healthy.','Teachers play a key role ___ education.','Sleep plays a major role ___ concentration.'],
exp_0897:['The boys sometimes played jokes ___ each other.','It is unkind to play jokes ___ strangers.','She played a harmless joke ___ her brother.'],
exp_0898:['The children love to play ___ their friends.','He played ___ the family dog.','She likes to play ___ building blocks.'],
exp_0959:['The frightened deer ran away ___ the hunters.','The child ran away ___ the loud noise.','The thief ran away ___ the police.'],
exp_0960:['We ran ___ an old friend at the market.','She ran ___ some unexpected problems.','He ran ___ his former teacher in town.'],
exp_0961:['We have run out ___ milk.','She ran out ___ time before finishing.','The hikers ran out ___ drinking water.'],
exp_0962:['The buses usually run ___ schedule.','The trains must run ___ schedule during the festival.','The service is designed to run ___ schedule.'],
exp_1045:['The children swam ___ the lake.','We swam ___ the sea every morning.','She enjoys swimming ___ the pool.'],
exp_1066:['We teamed up ___ another class for the project.','She teamed up ___ her friend to make a video.','The two companies teamed up ___ each other.']
};
for(const item of data.expressions){const s=examples[item.id];if(!s)continue;if(s.length!==3||s.some(x=>(x.match(/___/g)||[]).length!==1))throw Error(item.id);if(item.id==='exp_0530'){item.expression='go about one’s business';item.translation='заниматься своими делами'}if(item.id==='exp_0540'){item.expression='go insane';item.translation='сходить с ума'}if(item.id==='exp_0962')item.expression='run on schedule';item.sentences=s;item.gapSentence=s[0];item.example=s[0].replace('___',item.answer);item.editorialStatus='reviewed'}
fs.writeFileSync(path,JSON.stringify(data,null,2)+'\n');console.log('Reviewed:',Object.keys(examples).length);
