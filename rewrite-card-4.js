import fs from 'node:fs';
const path=new URL('../data/expressions.json',import.meta.url);
const data=JSON.parse(fs.readFileSync(path,'utf8'));
const reviewed={
exp_0920:['Please put ___ your coat before going outside.','She put ___ her new dress for the party.','He put ___ his gloves because it was cold.'],
exp_1040:['Are you sure ___ the answer?','She was not sure ___ the date of the meeting.','I am absolutely sure ___ my decision.'],
exp_1042:['The castle is surrounded ___ high stone walls.','The island is surrounded ___ water.','The house was surrounded ___ tall trees.'],
exp_1043:['The hall was surrounded ___ an atmosphere of excitement.','Her childhood was surrounded ___ warmth and kindness.','The ceremony was surrounded ___ a sense of mystery.'],
exp_1044:['My grandmother swears ___ this traditional remedy.','Many gardeners swear ___ this method of growing tomatoes.','He swears ___ regular exercise as a way to reduce stress.'],
exp_1046:['She took a bite out ___ the fresh apple.','He took a big bite out ___ his sandwich.','The child took a small bite out ___ the biscuit.'],
exp_1047:['You should take advantage ___ the free lessons.','The tourists took advantage ___ the sunny weather.','She took advantage ___ the chance to study abroad.'],
exp_1048:['She takes ___ her mother in both looks and character.','He takes ___ his grandfather and loves telling stories.','The younger sister takes ___ her father.'],
exp_1050:['We took ___ the decorations after the holiday.','Please take ___ the old posters from the wall.','He took ___ the curtains to wash them.'],
exp_1051:['I took him ___ his brother at first.','She took the stranger ___ a famous actor.','He took my silence ___ agreement.'],
exp_1052:['Someone took the keys ___ the table.','She took a book ___ the shelf.','The children took their toys ___ the cupboard.'],
exp_1053:['The sponge can take ___ a lot of water.','It takes time to take ___ new information.','The museum is so large that it is hard to take everything ___ at once.'],
exp_1055:['Please take the weather ___ consideration.','We must take your age ___ consideration.','The committee took all suggestions ___ consideration.'],
exp_1056:['Please take ___ your shoes at the door.','He took ___ his jacket because the room was warm.','She took ___ her hat and sat down.'],
exp_1057:['She took ___ her phone to check the time.','He took ___ a notebook and began writing.','Please take ___ your books before the lesson starts.'],
exp_1058:['A larger company took ___ the small business.','She will take ___ as team leader next month.','The new manager took ___ the project in June.'],
exp_1059:['Everyone is welcome to take part ___ the competition.','She took part ___ the school concert.','Our class takes part ___ charity events every year.'],
exp_1060:['We took photos ___ the old castle.','She took several photos ___ the beautiful landscape.','Tourists often take photos ___ the city centre.'],
exp_1061:['The students take pride ___ their achievements.','She takes pride ___ her careful work.','Our town takes pride ___ its long history.'],
exp_1071:['Can you tell the difference ___ these two pictures?','It is hard to tell the difference ___ the twins.','She can tell the difference ___ real leather and imitation leather.'],
exp_1072:['I thanked my teacher ___ the extra help.','She thanked us ___ coming to the event.','He thanked his friends ___ their support.'],
exp_1073:['We are thankful ___ your kindness.','She is thankful ___ the opportunity to learn.','He felt thankful ___ the warm welcome.'],
exp_1074:['I am thankful ___ my parents for their help.','We were thankful ___ the volunteers.','She is thankful ___ her teacher for the advice.'],
exp_1075:['___ to your advice, I passed the exam.','The event was a success thanks ___ our volunteers.','We found the place quickly thanks ___ the map.'],
exp_1078:['Air pollution is a threat ___ public health.','Climate change poses a threat ___ many species.','The storm was a serious threat ___ local homes.'],
exp_1079:['Please do not throw ___ these notes.','She threw ___ the broken toy.','He threw ___ the empty bottles.'],
exp_1080:['Never throw litter out ___ a car window.','Someone threw rubbish out ___ the train.','Please do not throw litter out ___ the bus.'],
exp_1082:['I am tired ___ waiting in this long queue.','She is tired ___ hearing the same excuse.','They grew tired ___ the endless arguments.'],
exp_1083:['___ my surprise, the answer was correct.','Much ___ my surprise, everyone agreed.','___ her surprise, the room was completely empty.'],
exp_1084:['The damage increased to the extent ___ several thousand dollars.','The water rose to the extent ___ two metres above normal.','The cost rose to the extent ___ nearly half the budget.'],
exp_1085:['We still keep ___ touch with our old classmates.','I hope we can stay ___ touch after graduation.','They have been ___ touch since the conference.'],
exp_1086:['Visitors must not touch the exhibits ___ their hands.','Please do not touch the paintings ___ your hands.','The children were asked not to touch the models ___ their hands.'],
exp_1129:['Please zip ___ your jacket before going outside.','He zipped ___ his backpack and left.','She zipped ___ the suitcase before the trip.']
};
for(const item of data.expressions){const sentences=reviewed[item.id];if(!sentences)continue;if(sentences.length!==3||sentences.some(x=>(x.match(/___/g)||[]).length!==1))throw Error(item.id);if(item.id==='exp_1046'){item.expression='take a bite out of';item.answer='of';item.acceptedAnswers=['of'];item.translation='откусить кусочек от чего-либо'}item.sentences=sentences;item.gapSentence=sentences[0];item.example=sentences[0].replace('___',item.answer);item.editorialStatus='reviewed'}
fs.writeFileSync(path,JSON.stringify(data,null,2)+'\n');console.log('Reviewed:',Object.keys(reviewed).length);
