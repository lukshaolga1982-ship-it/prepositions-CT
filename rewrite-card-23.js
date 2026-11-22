import fs from 'node:fs';
const path=new URL('../data/expressions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(path,'utf8'));
const examples={
exp_0086:['Children are particularly ___ risk near busy roads.','The historic building is ___ risk of flooding.','Without a helmet, cyclists are ___ greater risk of injury.'],
exp_0110:['The newspaper reported an attack ___ the village.','There was an unexpected attack ___ their computer system.','The attack ___ the castle began before sunrise.'],
exp_0289:['The chemicals pose a danger ___ wildlife.','Fast traffic is a danger ___ small children.','The fire presented a serious danger ___ nearby homes.'],
exp_0414:['Someone tried to set fire ___ the empty building.','The vandals set fire ___ a rubbish bin.','Never set fire ___ dry grass in summer.'],
exp_0483:['Please get in touch ___ me if you have questions.','She got in touch ___ her former teacher.','We should get in touch ___ the organiser before Friday.'],
exp_0484:['He got ___ photography during his holidays.','She got ___ the car and closed the door.','My brother got ___ cycling last year.'],
exp_0485:['The ball flew ___ the net just before the whistle.','The fish swam ___ a fishing net.','The tennis ball rolled ___ the loose net.'],
exp_0486:['She got ___ cheerleading at her new school.','My cousin wants to get ___ cheerleading this term.','Several students got ___ cheerleading after the demonstration.'],
exp_0488:['The strange idea got ___ his head during the journey.','Once the thought got ___ her head, she could not forget it.','The tune got ___ my head and stayed there all day.'],
exp_0489:['He got into the habit ___ reading before bed.','She got into the habit ___ checking her notes.','They got into the habit ___ walking after dinner.'],
exp_0490:['You could get ___ trouble if you ignore the rules.','He got ___ trouble for being late.','The children got ___ trouble when they broke the window.'],
exp_0496:['She gets on really well ___ her classmates.','I get on really well ___ my neighbours.','He got on really well ___ his new coach.'],
exp_0497:['That constant tapping gets ___ my nerves.','His rude comments got ___ her nerves.','The buzzing mosquito was getting ___ our nerves.'],
exp_0499:['We managed to get out ___ the locked room.','She got out ___ the car carefully.','The hikers struggled to get out ___ the deep snow.'],
exp_0501:['He is trying to get out ___ the habit of biting his nails.','She got out ___ the habit of staying up late.','I want to get out ___ the habit of skipping breakfast.'],
exp_0502:['It took her months to get ___ the disappointment.','He finally got ___ his fear of flying.','She needed time to get ___ the illness.'],
exp_0503:['She gets paid ___ teaching online.','The artist was paid ___ designing the poster.','Do volunteers get paid ___ their work?'],
exp_0505:['We need to get rid ___ these old boxes.','She got rid ___ the broken chair.','The town hopes to get rid ___ plastic waste.'],
exp_0507:['After the repairs, residents regained a sense ___ safety.','The new lighting gave people a sense ___ safety.','Children need a strong sense ___ safety at school.'],
exp_0510:['How do you get ___ the station from here?','We got ___ the airport before dawn.','She gets ___ school by bus.'],
exp_0512:['Please get ___ the point; we are running out of time.','It took him ten minutes to get ___ the point.','Can you get ___ the point of your story?'],
exp_0513:['She soon got used ___ living in a new city.','You will get used ___ the early mornings.','He is getting used ___ speaking English every day.'],
exp_0514:['She gave a bone ___ the dog.','The child gave a large bone ___ the puppy.','He gave another bone ___ his pet.'],
exp_0515:['The journalist made a comment ___ the recent decision.','She refused to make a comment ___ the case.','The teacher made a helpful comment ___ my essay.'],
exp_0516:['The scientist gave a lecture ___ the students.','She gave a lecture ___ first-year medical students.','The historian gave a lecture ___ a packed audience.'],
exp_0643:['The lost hikers were ___ danger as night fell.','The animals are ___ danger of extinction.','The swimmers realised they were ___ danger.'],
exp_0725:['Wear a helmet to keep yourself safe ___ injury.','The shelter keeps animals safe ___ bad weather.','These gloves keep your hands safe ___ sharp edges.'],
exp_0915:['The fence protects the garden ___ hungry rabbits.','Sunscreen helps protect your skin ___ the sun.','Warm clothes protected the children ___ the cold.'],
exp_0978:['The criminals set fire ___ the warehouse.','Someone set fire ___ the pile of leaves.','They threatened to set fire ___ the old shed.'],
exp_1116:['The guide warned us ___ the slippery path.','Doctors warn people ___ the dangers of smoking.','The sign warns visitors ___ falling rocks.'],
exp_1117:['The forecast warned ___ a severe storm.','Officials warned residents ___ an approaching flood.','The report warns ___ possible delays.'],
exp_1118:['The teacher warned us ___ copying answers.','Experts warn ___ leaving batteries in the heat.','The doctor warned him ___ skipping meals.']
};
let n=0;
for(const item of data.expressions){const s=examples[item.id];if(!s)continue;if(s.length!==3||s.some(x=>(x.match(/___/g)||[]).length!==1))throw Error(item.id);if(item.id==='exp_0507'){item.expression='a sense of safety';item.translation='чувство безопасности'}if(item.id==='exp_0515'){item.expression='make a comment on';item.translation='прокомментировать, высказаться по поводу'}item.sentences=s;item.gapSentence=s[0];item.example=s[0].replace('___',item.answer);item.editorialStatus='reviewed';n++}
if(n!==32)throw Error(`Unexpected card count ${n}`);
fs.writeFileSync(path,JSON.stringify(data,null,2)+'\n');console.log('Reviewed:',n);
