import fs from 'node:fs';
const path=new URL('../data/expressions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(path,'utf8'));
const reviewed={
exp_0104:['We saw a wonderful play ___ the theatre.','The family spent the afternoon ___ the museum.','We watched a documentary ___ the cinema.'],
exp_0437:['The children played the game ___ fun.','He painted the picture just ___ fun.','We sometimes sing together ___ fun.'],
exp_0468:['We were not competing; we played just ___ fun.','She learns new songs ___ fun.','The friends took funny photos ___ fun.'],
exp_0469:['Please do not make fun ___ your classmates.','Some children made fun ___ his unusual accent.','It is unkind to make fun ___ other people.'],
exp_0487:['She got ___ music when she was ten.','He got ___ jazz after hearing a live concert.','I got ___ classical music thanks to my teacher.'],
exp_0556:['We usually go ___ holiday in August.','My family went ___ holiday last summer.','They hope to go ___ holiday by the sea.'],
exp_0790:['Nobody should make fun ___ a person’s mistakes.','He made fun ___ his own dancing skills.','She does not like it when people make fun ___ her friends.'],
exp_0831:['We are going ___ holiday next week.','She met her best friend while ___ holiday.','They took hundreds of photos ___ holiday.'],
exp_0999:['He is rather slow ___ solving difficult puzzles.','She can be slow ___ understanding unfamiliar instructions.','Some students are slow ___ writing long essays.'],
exp_1000:['The kitchen smells ___ freshly baked bread.','The flowers smell ___ honey in the evening.','His jacket smelled ___ smoke after the bonfire.'],
exp_1001:['The little girl smiled ___ her grandmother.','He smiled ___ the audience before speaking.','The teacher smiled ___ us when we finished.'],
exp_1002:['She likes to socialise ___ people from different countries.','We socialised ___ our classmates after the concert.','He finds it easy to socialise ___ new people.'],
exp_1004:['I feel sorry ___ the injured animal.','She felt sorry ___ her friend after the accident.','We were sorry ___ the children who missed the trip.'],
exp_1005:['That melody sounds familiar ___ me.','His name sounded familiar ___ the teacher.','Does this story sound familiar ___ you?'],
exp_1009:['She hopes to specialise ___ modern history.','The company specialises ___ educational software.','He decided to specialise ___ sports medicine.'],
exp_1011:['I spend too much time ___ social media.','She spends an hour ___ homework every day.','We spent the afternoon ___ our school project.'],
exp_1013:['We stood at the edge ___ the lake.','A small café stands at the edge ___ the park.','The children stopped at the edge ___ the forest.'],
exp_1014:['What does this abbreviation stand ___?','The letters UNESCO stand ___ a long organisation name.','The symbol can stand ___ peace and friendship.'],
exp_1015:['Her bright red coat stood out ___ the crowd.','The white house stands out ___ the darker buildings.','His unusual idea stood out ___ the others.'],
exp_1016:['Please do not stare ___ strangers.','The children stared ___ the magician in amazement.','He stared ___ the painting for several minutes.'],
exp_1017:['We stayed ___ a small hotel near the sea.','They decided to stay ___ a guesthouse.','She stayed ___ her friend’s house for the weekend.'],
exp_1018:['You should stay away ___ the dangerous cliff.','The doctor advised him to stay away ___ sugary drinks.','Please stay away ___ the wet paint.'],
exp_1019:['We decided to stay ___ because it was raining.','She stayed ___ the library until it closed.','The children stayed ___ the classroom during the break.'],
exp_1020:['I sometimes stay ___ late to finish a book.','He stayed ___ late watching a film.','The students stayed ___ late preparing for the performance.'],
exp_1021:['She stepped ___ the room and greeted everyone.','He carefully stepped ___ the boat.','The visitors stepped ___ the quiet gallery.'],
exp_1022:['Try to stick ___ your original plan.','We need to stick ___ the rules of the game.','She stuck ___ her decision despite the criticism.'],
exp_1023:['The rain stopped us ___ going on the hike.','Nothing could stop her ___ trying again.','His parents stopped him ___ buying the expensive gadget.'],
exp_1024:['She always strives ___ excellence in her work.','Our team strives ___ better results every year.','They strive ___ equal opportunities for all students.'],
exp_1028:['Please submit your application ___ the admissions office.','He submitted the report ___ his supervisor.','Students must submit their projects ___ the teacher by Friday.'],
exp_1030:['She succeeded ___ passing the final exam.','The team succeeded ___ completing the project on time.','He finally succeeded ___ solving the problem.'],
exp_1035:['This game is suitable ___ younger children.','The room is suitable ___ small group lessons.','These shoes are suitable ___ long walks.'],
exp_1036:['Could you sum ___ the main points of the lecture?','She summed ___ the results in two sentences.','Let us sum ___ what we have learned today.'],
exp_1038:['The charity supplied families ___ warm clothing.','The school supplied students ___ free textbooks.','They supplied the village ___ clean drinking water.']
};
for(const item of data.expressions){const sentences=reviewed[item.id];if(!sentences)continue;if(sentences.length!==3||sentences.some(x=>(x.match(/___/g)||[]).length!==1))throw Error(item.id);item.sentences=sentences;item.gapSentence=sentences[0];item.example=sentences[0].replace('___',item.answer);item.editorialStatus='reviewed'}
fs.writeFileSync(path,JSON.stringify(data,null,2)+'\n');console.log('Reviewed:',Object.keys(reviewed).length);
