import fs from 'node:fs';
const path=new URL('../data/expressions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(path,'utf8'));
const examples={
exp_0271:['She finds it difficult to cope ___ stress.','How do you cope ___ so much homework?','The team coped ___ the unexpected changes.'],
exp_0385:['Small businesses often face serious ___.','The project faced several technical ___.','Many families face financial ___.'],
exp_0386:['The town was faced ___ a difficult choice.','We were faced ___ an unexpected problem.','The school is faced ___ a shortage of teachers.'],
exp_0445:['Please forgive me ___ arriving late.','She forgave her friend ___ the mistake.','Can you forgive him ___ forgetting your birthday?'],
exp_0446:['Children under five can enter ___ free.','You can download the guide ___ free.','The museum offers admission ___ free on Sundays.'],
exp_0447:['The repairs were carried out free ___ charge.','Visitors can borrow headphones free ___ charge.','This service is provided free ___ charge.'],
exp_0448:['The outdoor concert is free ___ the public.','The exhibition will be free ___ the public.','The lectures are free ___ the public this month.'],
exp_0451:['I read the instructions from beginning ___ end.','They watched the film from beginning ___ end.','She followed the story from beginning ___ end.'],
exp_0452:['He read the novel from cover ___ cover.','I studied the handbook from cover ___ cover.','She read the magazine from cover ___ cover.'],
exp_0453:['We could see the lighthouse ___ a distance.','He recognised his friend ___ a distance.','The mountains looked blue ___ a distance.'],
exp_0455:['The family travelled from Australia ___ Belarus.','The parcel was sent from Australia ___ Belarus.','Their route took them from Australia ___ Belarus.'],
exp_0457:['He was covered in mud from head ___ toe.','She wore black from head ___ toe.','The child was soaked from head ___ toe.'],
exp_0458:['Read the text from left ___ right.','The arrows move from left ___ right.','Write the numbers from left ___ right.'],
exp_0461:['From now ___, we will start on time.','From now ___, please save your work regularly.','She promised to be more careful from now ___.'],
exp_0463:['The musicians travelled from town ___ town.','The exhibition moves from town ___ town.','He went from town ___ town looking for work.'],
exp_0464:['There is a bench in front ___ the library.','The bus stopped in front ___ the school.','She stood in front ___ the mirror.'],
exp_0465:['The room was full ___ people.','Her bag is full ___ books.','The garden is full ___ flowers in spring.'],
exp_0466:['The new adventure film is full ___ action.','That book is full ___ action from the first chapter.','The final episode was full ___ action.'],
exp_0467:['After a good sleep, the children were full ___ beans.','My grandfather is still full ___ beans at eighty.','She arrived at the party full ___ beans.'],
exp_0471:['I hope to study abroad ___ the future.','What would you like to do ___ the future?','Electric cars may become cheaper ___ the future.'],
exp_0472:['She gazed ___ the stars for a long time.','He gazed ___ the painting in silence.','The child gazed ___ the colourful balloons.'],
exp_0473:['___ general, students enjoyed the course.','___ general, the weather here is mild.','People ___ general prefer clear instructions.'],
exp_0475:['She wants to get acquainted ___ her new colleagues.','We got acquainted ___ the local traditions.','The students got acquainted ___ each other during the trip.'],
exp_0477:['We went to the mountains to get away ___ the crowds.','She needed to get away ___ the noise.','The rabbit got away ___ the fox.'],
exp_0478:['He got back ___ London last night.','When did you get back ___ your holiday?','She got back ___ school at four o’clock.'],
exp_0479:['You will get better ___ speaking with practice.','He wants to get better ___ chess.','She got better ___ solving maths problems.'],
exp_0482:['What time does your train get ___?','The flight got ___ two hours late.','Our bus usually gets ___ before noon.'],
exp_0603:['She has no problems ___ the new software.','He has no problems ___ reading English texts.','We had no problems ___ finding the address.'],
exp_0607:['Good friends help us in times ___ difficulty.','Neighbours supported one another in times ___ difficulty.','Families often come together in times ___ difficulty.'],
exp_1003:['We need to find a solution ___ this problem.','The team proposed a solution ___ the traffic issue.','There is no simple solution ___ the crisis.'],
exp_1025:['The campaigners struggle ___ discrimination.','The villagers struggled ___ the unfair law.','Many people struggle ___ injustice.'],
exp_1026:['She struggles ___ difficult grammar rules.','He is struggling ___ a heavy suitcase.','The company struggled ___ rising costs.']
};
let n=0;
for(const item of data.expressions){const s=examples[item.id];if(!s)continue;if(s.length!==3||s.some(x=>(x.match(/___/g)||[]).length!==1))throw Error(item.id);item.sentences=s;item.gapSentence=s[0];item.example=s[0].replace('___',item.answer);item.editorialStatus='reviewed';n++}
if(n!==32)throw Error(`Unexpected card count ${n}`);
fs.writeFileSync(path,JSON.stringify(data,null,2)+'\n');console.log('Reviewed:',n);
