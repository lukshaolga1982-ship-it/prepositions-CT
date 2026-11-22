import fs from 'node:fs';
const path=new URL('../data/expressions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(path,'utf8'));
const examples={
exp_0032:['We arrived ___ the airport two hours early.','The family met us ___ the airport.','She left her suitcase ___ the airport.'],
exp_0092:['Please be ___ the airport before seven.','There was a long queue ___ the airport.','He bought a magazine ___ the airport.'],
exp_0098:['There is a traffic light at the crossroads ___ King Street and Park Road.','Turn right at the crossroads ___ the two main roads.','The café is at the crossroads ___ Elm Street and Bridge Road.'],
exp_0170:['We usually travel ___ bus.','She goes to school ___ bus every day.','They reached the city centre ___ bus.'],
exp_0171:['Hurry up and get ___ the bus.','The children got ___ the bus near the station.','You need a ticket before you get ___ the bus.'],
exp_0174:['She is busy ___ her homework.','He was busy ___ a new project.','The team is busy ___ preparations for the event.'],
exp_0177:['We travelled to the city ___ train.','You can reach the airport ___ taxi.','She usually goes to work ___ car.'],
exp_0194:['She really cares ___ the environment.','He cares ___ the feelings of other people.','Many young people care ___ animal welfare.'],
exp_0195:['She cares ___ her elderly grandmother.','The nurses cared ___ the injured patients.','He stayed home to care ___ his younger sister.'],
exp_0196:['Could you take care ___ my plants while I am away?','She takes care ___ her little brother after school.','He promised to take care ___ the injured animal.'],
exp_0197:['The scientists carried ___ several experiments.','Our class carried ___ a survey last week.','The team carried ___ the plan successfully.'],
exp_0282:['Please cross the ___ at the pedestrian crossing.','The children waited before crossing the ___.','Never cross the ___ without looking both ways.'],
exp_0283:['The bakery is at the crossroads ___ two busy streets.','We met at the crossroads ___ Oak Street and Lake Road.','There is a statue at the crossroads ___ the main avenues.'],
exp_0421:['She lives ___ 45 Kupala Street, flat 30.','The office is ___ 18 Green Street, on the second floor.','His parents live ___ 7 Market Street, flat 12.'],
exp_0476:['It is easy to get ___ the city by tram.','Tourists can get ___ the city on bicycles.','The local buses help people get ___ the city.'],
exp_0491:['We got lost ___ the city on our first day.','She was afraid of getting lost ___ the city.','They got lost ___ the city without a map.'],
exp_0494:['Please get ___ the bus at the next stop.','We got ___ the bus near the museum.','She got ___ the bus and walked home.'],
exp_0495:['The passengers got ___ the bus at the station.','We got ___ the bus just before it left.','He helped the children get ___ the bus.'],
exp_0661:['The idea sounds good, but will it work ___ practice?','___ practice, the task is more difficult than it seems.','We tested the method ___ practice.'],
exp_0662:['She feels nervous when speaking ___ public.','It is important to behave politely ___ public.','He rarely talks about his problems ___ public.'],
exp_0664:['The plan sounded simple, but ___ reality it was difficult.','___ reality, the journey took much longer.','The house looks small in photos, but ___ reality it is huge.'],
exp_0667:['She gave me her notes in return ___ my help.','He offered a discount in return ___ a review.','They received food in return ___ their work.'],
exp_0669:['___ short, we need to make a decision today.','___ short, the experiment was successful.','___ short, the second option is better.'],
exp_0670:['We went hiking in spite ___ the rain.','She smiled in spite ___ her disappointment.','They finished the race in spite ___ the strong wind.'],
exp_0694:['There were thousands of people ___ the streets.','The children played ___ the streets near their homes.','Music filled the air ___ the streets of the old town.'],
exp_0838:['There were many passengers ___ the bus.','She left her umbrella ___ the bus.','We met an old friend ___ the bus.'],
exp_0850:['She saw her neighbour ___ the street.','There is a new café ___ our street.','The children were playing ___ the street.'],
exp_0878:['Can I pay ___ card?', 'She prefers to pay ___ card rather than use cash.','We paid ___ card at the restaurant.'],
exp_0957:['Can you show me the route ___ the museum?','We found a shorter route ___ the station.','The map shows the quickest route ___ the airport.'],
exp_0970:['The little boy is scared ___ dogs.','She was scared ___ walking home alone.','Many people are scared ___ heights.'],
exp_0974:['We sent postcards ___ our friends abroad.','She sends Christmas cards ___ her relatives.','They sent thank-you cards ___ the volunteers.'],
exp_1049:['Please take care ___ yourself on the trip.','He takes care ___ his grandparents.','She took care ___ the family dog while they were away.']
};
for(const item of data.expressions){const s=examples[item.id];if(!s)continue;if(s.length!==3||s.some(x=>(x.match(/___/g)||[]).length!==1))throw Error(item.id);item.sentences=s;item.gapSentence=s[0];item.example=s[0].replace('___',item.answer);item.editorialStatus='reviewed'}
fs.writeFileSync(path,JSON.stringify(data,null,2)+'\n');console.log('Reviewed:',Object.keys(examples).length);
