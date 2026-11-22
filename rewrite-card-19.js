import fs from 'node:fs';
const path=new URL('../data/expressions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(path,'utf8'));
const examples={
exp_0102:['We spent our summer holiday ___ the seaside.','The family rented a cottage ___ the seaside.','She enjoys long walks ___ the seaside.'],
exp_0187:['You can travel to the island ___ sea.','The goods were transported ___ air.','In the past, people often travelled ___ land.'],
exp_0250:['The scientists conducted important ___ on climate change.','Our class conducted ___ into local wildlife.','The team will conduct further ___ next year.'],
exp_0330:['She wants to do research ___ environmental science.','The university conducts research ___ renewable energy.','He hopes to do research ___ medicine.'],
exp_0569:['At seventeen, he decided to go ___ sea.','His father went ___ sea when he was young.','Many sailors dream of going ___ sea.'],
exp_0611:['The animals hide ___ the shade during the hottest hours.','We hid ___ the shade of a large tree.','The children stopped to hide ___ the shade.'],
exp_0612:['This fruit is high ___ vitamin C.','The meal is high ___ protein.','Some snacks are high ___ sugar.'],
exp_0613:['The family still holds out hope ___ finding the lost dog.','We hold out hope ___ a peaceful solution.','The rescue team held out hope ___ finding survivors.'],
exp_0614:['The hall can hold up ___ two hundred people.','This bottle holds up ___ two litres of water.','The stadium can hold up ___ twenty thousand spectators.'],
exp_0618:['He is hopeless ___ remembering dates.','She used to be hopeless ___ spelling.', 'I am hopeless ___ drawing portraits.'],
exp_0620:['After the journey, everyone was hungry ___ a hot meal.','The young players were hungry ___ success.','The children were hungry ___ adventure.'],
exp_0621:['The scientists hunted ___ clues in the old records.','We spent an hour hunting ___ the missing keys.','The children hunted ___ shells on the beach.'],
exp_0622:['This weather is ideal ___ a picnic.','The location is ideal ___ birdwatching.','The book is ideal ___ beginners.'],
exp_0623:['This sauce is ideal ___ grilled fish.','The soft cheese is ideal ___ fresh bread.','These vegetables are ideal ___ a light meal.'],
exp_0624:['Plastic waste has a serious impact ___ marine life.','The weather had an impact ___ our journey.','The new rules had a positive impact ___ safety.'],
exp_0625:['We were impressed ___ the beautiful scenery.','She was impressed ___ his knowledge of the subject.','The visitors were impressed ___ the exhibition.'],
exp_0626:['What are your impressions ___ the new city?','She shared her impressions ___ the museum.','He wrote about his first impressions ___ university life.'],
exp_0627:['She was ___ a good mood after the lesson.','The children were ___ a good mood all morning.','He is usually ___ a good mood on Fridays.'],
exp_0628:['Please speak ___ a low voice in the library.','She answered ___ a low voice.','He read the poem ___ a low voice.'],
exp_0629:['The room was ___ a mess after the party.','Her desk was ___ a mess.','The garden was ___ a mess after the storm.'],
exp_0630:['The artist painted the portrait ___ a unique style.','She writes ___ a unique style.','The building was designed ___ a unique style.'],
exp_0631:['The work was completed in accordance ___ the instructions.','The school acts in accordance ___ national regulations.','The contract was written in accordance ___ the law.'],
exp_0632:['Please book the tickets ___ advance.','She prepared all the materials ___ advance.','We should plan the journey ___ advance.'],
exp_0634:['It is safer to stay indoors ___ bad weather.','They continued walking ___ bad weather.','The event may be cancelled ___ bad weather.'],
exp_0663:['The paths become slippery ___ rainy weather.','It is difficult to camp ___ rainy weather.','Drive carefully ___ rainy weather.'],
exp_0668:['The hikers went into the forest in search ___ a waterfall.','She visited the library in search ___ information.','The travellers crossed the desert in search ___ water.'],
exp_0846:['The village lies ___ the river.','We rented a small house ___ the river.','The restaurant stands ___ the river near the bridge.'],
exp_0851:['We met an old friend ___ the train.','She left her scarf ___ the train.','There were few passengers ___ the train.'],
exp_0904:['It is pouring ___ rain outside.','We stayed inside because it was pouring ___ rain.','It started pouring ___ rain before the match.'],
exp_0943:['He is doing research ___ climate science.','She published research ___ language learning.','The university supports research ___ biology.'],
exp_0971:['We searched ___ information online.','The volunteers searched ___ the missing dog.','She is searching ___ a quiet place to study.'],
exp_1100:['I feel ___ the weather today.','She stayed home because she was ___ the weather.','He looked a little ___ the weather after the trip.'],
exp_1135:['Some birds sleep ___ trees at night.','These animals usually sleep ___ trees to stay safe.','In the rainforest, many creatures sleep ___ trees.']
};
for(const item of data.expressions){const s=examples[item.id];if(!s)continue;if(s.length!==3||s.some(x=>(x.match(/___/g)||[]).length!==1))throw Error(item.id);if(item.id==='exp_0904'){item.expression='pouring with rain';item.translation='идёт проливной дождь'}item.sentences=s;item.gapSentence=s[0];item.example=s[0].replace('___',item.answer);item.editorialStatus='reviewed'}
fs.writeFileSync(path,JSON.stringify(data,null,2)+'\n');console.log('Reviewed:',Object.keys(examples).length);
