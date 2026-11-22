import fs from 'node:fs';
const path = new URL('../data/expressions.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Each row: stable ID and three independently checked contexts.
const reviewed = {
  exp_0020: ['We took advantage ___ the warm weather and went hiking.', 'You should take advantage ___ every chance to practise.', 'The students took advantage ___ the extra revision lesson.'],
  exp_0025: ['I have not seen my cousin ___ ages.', 'We waited ___ ages before the bus arrived.', 'It feels as though I have been studying ___ ages.'],
  exp_0037: ['People used stone tools ___ ancient times.', 'Travel was much slower ___ ancient times.', 'Many cities were founded ___ ancient times.'],
  exp_0070: ['The train travelled at an average ___ 90 kilometres per hour.', 'Tickets sold at an average ___ ten euros each.', 'The children read at an average ___ two books a month.'],
  exp_0081: ['The clock struck twelve ___ midnight.', 'We arrived home ___ midnight.', 'The celebration began ___ midnight.'],
  exp_0082: ['The streets are quiet ___ night.', 'Some animals hunt ___ night.', 'It is difficult to see the path ___ night.'],
  exp_0090: ['___ that moment, the lights went out.', 'She did not know what to say ___ that time.', '___ that moment, everyone started cheering.'],
  exp_0108: ['We all feel nervous ___ times.', 'The weather can be unpredictable ___ times.', '___ times, I wish I could travel more.'],
  exp_0118: ['___ average, our class reads two books a month.', 'How much time do you spend online ___ average?', '___ average, the journey takes about forty minutes.'],
  exp_0143: ['I received a lovely present ___ my birthday.', 'We went to the cinema ___ my birthday.', 'My friends surprised me ___ my birthday.'],
  exp_0179: ['Some animals sleep ___ day and hunt at night.', 'The city is busy ___ day but peaceful at night.', 'The beach is crowded ___ day in summer.'],
  exp_0293: ['The situation improved day ___ day.', 'Day ___ day, her confidence began to grow.', 'We watched the garden change day ___ day.'],
  exp_0294: ['Day ___ day, the volunteers worked on the project.', 'He practised the same routine day ___ day.', 'The children waited day ___ day for the snow.'],
  exp_0295: ['She is getting stronger day ___ day.', 'The temperature rose day ___ day.', 'Our English skills improve day ___ day.'],
  exp_0296: ['I usually visit my grandparents on my day ___.', 'She went hiking on her day ___.', 'He spent his day ___ reading at home.'],
  exp_0297: ['It is much warmer ___ the daytime.', 'These birds are active ___ the daytime.', 'The park is open ___ the daytime.'],
  exp_0321: ['The teacher discouraged us ___ copying answers.', 'Bad weather discouraged them ___ going camping.', 'Her parents discouraged her ___ giving up too soon.'],
  exp_0348: ['We visited our relatives ___ Easter Day.', 'The family gathered for lunch ___ Easter Day.', 'Many people attend church ___ Easter Day.'],
  exp_0357: ['She is actively engaged ___ volunteer work.', 'The researchers are engaged ___ an important study.', 'He became engaged ___ planning the school event.'],
  exp_0417: ['She travelled abroad ___ the first time last year.', 'I tried skiing ___ the first time in January.', 'He spoke English in public ___ the first time.'],
  exp_0434: ['We have been friends ___ ages.', 'I have been waiting here ___ ages.', 'She has not visited the village ___ ages.'],
  exp_0438: ['They talked ___ hours after the reunion.', 'I studied ___ hours before the exam.', 'The children played outside ___ hours.'],
  exp_0449: ['I enjoy reading ___ my free time.', 'She plays the guitar ___ her free time.', 'What do you usually do ___ your free time?'],
  exp_0454: ['She has loved music ___ an early age.', 'He learned to swim ___ an early age.', 'Children benefit from reading ___ an early age.'],
  exp_0459: ['We worked ___ morning till night to finish the project.', 'The farmers were busy ___ morning till night.', 'She studied ___ morning till night before the competition.'],
  exp_0462: ['We visit the museum from time ___ time.', 'From time ___ time, I write to my old friends.', 'He goes hiking from time ___ time.'],
  exp_0509: ['A cup of tea helped me get ___ the day.', 'It was a hard Monday, but we got ___ the day.', 'She needed a little encouragement to get ___ the day.'],
  exp_0585: ['The lesson will begin ___ half an hour.', 'I will call you ___ half an hour.', 'The train is leaving ___ half an hour.'],
  exp_0657: ['People wrote letters much more often ___ old times.', 'Life was different ___ old times.', 'Many traditions began ___ old times.'],
  exp_0665: ['The weather has changed a lot ___ recent times.', 'Online learning has grown rapidly ___ recent times.', 'Many new technologies have appeared ___ recent times.'],
  exp_0677: ['The owls sleep ___ the daytime.', 'It is usually hot ___ the daytime in July.', 'The library is open ___ the daytime.'],
  exp_0699: ['We arrived just ___ time for the concert.', 'She finished the project ___ time to submit it.', 'Hurry up if you want to get there ___ time.'],
  exp_0817: ['The stars are easy to see ___ night.', 'We heard a strange noise ___ night.', 'The temperature drops ___ night.'],
  exp_1131: ['She practises English ___ a regular basis.', 'The team meets ___ a regular basis to discuss progress.', 'You should revise new vocabulary ___ a regular basis.'],
  exp_0065: ['We bought the books ___ a low cost.', 'The service is available ___ a low cost.', 'You can travel around the city ___ a low cost.'],
  exp_0071: ['We discussed the plan ___ breakfast.', 'The family talked about the trip ___ dinner.', 'She told us the news ___ lunch.'],
  exp_0114: ['Please pay attention ___ the teacher’s instructions.', 'You should pay attention ___ the road.', 'He paid attention ___ every detail of the task.'],
  exp_0159: ['I usually have eggs ___ breakfast.', 'She ate porridge ___ breakfast.', 'We had fruit and yoghurt ___ breakfast.'],
  exp_0160: ['We discussed our plans ___ breakfast.', 'She read the newspaper ___ breakfast.', 'The children were unusually quiet ___ breakfast.'],
  exp_0316: ['We talked about school ___ dinner.', 'My father told us a funny story ___ dinner.', 'Everyone sat together ___ dinner.'],
  exp_0317: ['We had vegetable soup ___ dinner.', 'She cooked pasta ___ dinner.', 'What are we having ___ dinner tonight?'],
  exp_0432: ['The charity collected money ___ food.', 'They exchanged their coupons ___ food.', 'The money was intended ___ food and medicine.'],
  exp_0521: ['Please give some food ___ the hungry animals.', 'The volunteers gave food ___ people in need.', 'She gave the leftover food ___ her neighbour.'],
  exp_0566: ['I went shopping ___ a new coat.', 'They went shopping ___ school supplies.', 'She went shopping ___ a birthday present.'],
  exp_0876: ['Pay attention ___ the prices on the labels.', 'Please pay attention ___ the expiry date.', 'The shop assistant paid attention ___ every customer.'],
  exp_0877: ['I promised to pay my brother ___ next week.', 'She paid the money ___ as soon as possible.', 'He borrowed ten euros and paid it ___ on Friday.'],
  exp_0879: ['Can I pay ___ the tickets by card?', 'She offered to pay ___ our lunch.', 'We paid ___ the groceries at the checkout.'],
  exp_0882: ['He paid the price ___ ignoring the warning.', 'The business paid a high price ___ its mistakes.', 'She paid the price ___ her careless decision.'],
  exp_0910: ['The new laptop is priced ___ 800 euros.', 'The tickets were priced ___ twenty euros each.', 'The coat was originally priced ___ seventy euros.'],
  exp_0984: ['We need to shop ___ fresh vegetables.', 'She likes to shop ___ clothes online.', 'They went to the market to shop ___ fruit.'],
  exp_0985: ['She went shopping ___ a wedding dress.', 'He is shopping ___ a new phone.', 'We are shopping ___ birthday gifts.'],
  exp_1088: ['The waiter treated us ___ great kindness.', 'The doctor treated the patient ___ antibiotics.', 'You should treat other people ___ respect.'],
  exp_1089: ['Can I try ___ this jacket?', 'She tried ___ three pairs of shoes.', 'I would like to try ___ the blue dress.'],
  exp_1090: ['You can try ___ the new app for free.', 'They decided to try ___ a different recipe.', 'She tried ___ the equipment before buying it.'],
  exp_1091: ['He decided to turn ___ the job offer.', 'The bank turned ___ our application.', 'She politely turned ___ the invitation.'],
  exp_1092: ['The caterpillar will turn ___ a butterfly.', 'The old building was turned ___ a museum.', 'The rain suddenly turned ___ snow.'],
  exp_1093: ['Please turn ___ the lights when you leave.', 'He turned ___ the radio before going to bed.', 'Do not forget to turn ___ the oven.'],
  exp_1094: ['Could you turn ___ the heating?', 'She turned ___ the television to watch the news.', 'He turned ___ the lamp beside his bed.'],
  exp_1095: ['The event turned ___ to be a great success.', 'It turned ___ that we had taken the wrong bus.', 'The problem turned ___ to be simpler than expected.'],
  exp_1096: ['She turned ___ her teacher for advice.', 'The children turned ___ their parents for help.', 'We can turn ___ the library when we need reliable information.'],
  exp_1097: ['Such behaviour is typical ___ young children.', 'Cold winters are typical ___ this region.', 'This mistake is typical ___ beginners.'],
  exp_1098: ['The firefighters brought the fire ___ control.', 'The situation is finally ___ control.', 'The team managed to keep the problem ___ control.'],
  exp_1099: ['Some students work well ___ pressure.', 'She remained calm ___ pressure.', 'He finds it difficult to make decisions ___ pressure.'],
  exp_1101: ['It was unfair ___ the younger children to make them wait.', 'His comments were unfair ___ the other players.', 'The new rule seems unfair ___ younger students.'],
  exp_1104: ['It is up ___ you to make the final decision.', 'The choice is entirely up ___ you.', 'Whether we leave now is up ___ the group.'],
  exp_1105: ['Please keep your contact details up ___ date.', 'This guide will help you stay up ___ date.', 'The software is now up ___ date.'],
  exp_1106: ['She was upset ___ her friend after their argument.', 'He was upset ___ his brother for losing the book.', 'The child was upset ___ her parents for being late.']
};

for (const item of data.expressions) {
  const sentences = reviewed[item.id];
  if (!sentences) continue;
  if (sentences.length !== 3 || sentences.some(s => (s.match(/___/g) || []).length !== 1)) throw Error(item.id);
  item.sentences = sentences;
  item.gapSentence = sentences[0];
  item.example = sentences[0].replace('___', item.answer);
  item.editorialStatus = 'reviewed';
  if (item.id === 'exp_0293') item.translation = 'день за днём; постепенно';
  if (item.id === 'exp_0295') item.translation = 'день за днём; постепенно';
  if (item.id === 'exp_0665') {
    item.expression = 'in recent times';
    item.translation = 'в последнее время';
  }
}
fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
console.log('Reviewed:', Object.keys(reviewed).length);
