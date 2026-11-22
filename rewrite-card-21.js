import fs from 'node:fs';
const path=new URL('../data/expressions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(path,'utf8'));
const examples={
exp_0018:['The injured cyclist was admitted ___ hospital.','She was admitted ___ hospital for further tests.','The patient was admitted ___ hospital late at night.'],
exp_0163:['She is brilliant ___ solving puzzles.','He is brilliant ___ mathematics.','Our team leader is brilliant ___ organising events.'],
exp_0260:['You should consult a ___ if the pain continues.','She decided to consult a ___ about her symptoms.','He went to consult a ___ before travelling.'],
exp_0391:['Several students fell ___ during the winter.','She fell ___ while travelling abroad.','He fell ___ just before the competition.'],
exp_0409:['The room was filled ___ laughter.','Her bag was filled ___ books.','The hall was filled ___ the smell of flowers.'],
exp_0410:['Please fill ___ this application form.','She filled ___ the missing details.','The students filled ___ the questionnaire.'],
exp_0456:['They worked ___ dusk till dawn.','The rescuers searched ___ dusk till dawn.','The volunteers stayed busy ___ dusk till dawn.'],
exp_0506:['I get ___ whenever I travel by plane.','She sometimes gets ___ on long flights.','He was worried about getting ___ during the flight.'],
exp_0541:['The sun went ___ behind the hills.','We watched the lift go ___ to the ground floor.','The temperature went ___ during the night.'],
exp_0542:['I think I will go ___ the blue jacket.','She decided to go ___ the cheaper option.','He went ___ a simple design instead of a complicated one.'],
exp_0544:['My grandfather started to go ___ in his thirties.','He is beginning to go ___ at the temples.','Some people go ___ earlier than others.'],
exp_0545:['She decided to go ___ teaching after university.','He went ___ the old building to explore it.','The discussion went ___ several difficult questions.'],
exp_0546:['The gun went ___ by accident.','A loud alarm went ___ at midnight.','The firework went ___ before everyone was ready.'],
exp_0547:['The meeting went ___ for two hours.','What is going ___ in the classroom?', 'The concert went ___ despite the rain.'],
exp_0550:['We are going ___ a hike tomorrow.','The children went ___ a hike in the mountains.','She hopes to go ___ a hike at the weekend.'],
exp_0551:['The tourists went ___ a photo safari.','Our group will go ___ a photo safari in the reserve.','They went ___ a photo safari to see wild animals.'],
exp_0552:['We decided to go ___ a picnic by the lake.','The family went ___ a picnic on Sunday.','She invited her friends to go ___ a picnic.'],
exp_0553:['The children went ___ a ride at the fair.','She wants to go ___ a ride on the big wheel.','They went ___ a ride after lunch.'],
exp_0557:['We went ___ the big wheel at the fair.','The children wanted to go ___ the big wheel.','She was nervous about going ___ the big wheel.'],
exp_0559:['The little boy went ___ the merry-go-round.','We watched the children go ___ the merry-go-round.','She wanted to go ___ the merry-go-round again.'],
exp_0560:['They went ___ the rides at the amusement park.','The children wanted to go ___ the rides all afternoon.','We bought tickets to go ___ the rides.'],
exp_0561:['That style has gone out ___ fashion.','These hats went out ___ fashion years ago.','The design may soon go out ___ fashion.'],
exp_0562:['The old expression has gone out ___ use.','Some traditional tools have gone out ___ use.','The machine went out ___ use many years ago.'],
exp_0564:['We went ___ the bridge to reach the village.','She went ___ the hill before sunset.','The children went ___ the footbridge carefully.'],
exp_0565:['Walk ___ the library and turn left.','We went ___ the museum without stopping.','She walked ___ the shop on her way home.'],
exp_0570:['The children went ___ the park after school.','We often go ___ the park on Sundays.','She decided to go ___ the park for a walk.'],
exp_0572:['The price went ___ again this year.','We watched the balloon go ___ into the sky.','The temperature went ___ in the afternoon.'],
exp_0934:['He recovered ___ the flu quickly.','She is still recovering ___ the operation.','The town slowly recovered ___ the flood.'],
exp_0991:['I am sick ___ hearing the same excuse.','She is sick ___ waiting for the bus.','They were sick ___ the constant noise.'],
exp_0994:['It was silly ___ me to forget the tickets.','That was silly ___ him to say.', 'It was silly ___ us to leave so late.'],
exp_0997:['She is skilled ___ using digital tools.','He is skilled ___ repairing bicycles.','The workers are skilled ___ operating the machines.'],
exp_1034:['Many people suffer ___ seasonal allergies.','He suffers ___ back pain.','The region suffered ___ severe drought.']
};
for(const item of data.expressions){const s=examples[item.id];if(!s)continue;if(s.length!==3||s.some(x=>(x.match(/___/g)||[]).length!==1))throw Error(item.id);if(item.id==='exp_0506'){item.expression='get airsick';item.answer='airsick';item.acceptedAnswers=['airsick'];item.translation='испытывать воздушную болезнь'}if(item.id==='exp_0997')item.expression='skilled in';item.sentences=s;item.gapSentence=s[0];item.example=s[0].replace('___',item.answer);item.editorialStatus='reviewed'}
fs.writeFileSync(path,JSON.stringify(data,null,2)+'\n');console.log('Reviewed:',Object.keys(examples).length);
