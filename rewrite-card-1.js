// Editorially reviewed replacements for the first thematic card.
// Keep stable expression IDs for saved mistake histories.
import fs from 'node:fs';
const path = new URL('../data/expressions.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const examples = {
  exp_0078: ['My sister is ___ home today because she is ill.', 'I usually study ___ home after dinner.', 'Nobody was ___ home when the parcel arrived.'],
  exp_0130: ['I usually go ___ bed at ten o’clock.', 'The children went ___ bed early after the trip.', 'You should go ___ bed if you feel tired.'],
  exp_0131: ['She stayed ___ bed all morning with a fever.', 'The little boy was still ___ bed when I called.', 'He likes reading ___ bed before falling asleep.'],
  exp_0132: ['The cat is hiding ___ the bed.', 'I found my missing shoe ___ the bed.', 'There is a storage box ___ the bed.'],
  exp_0216: ['Please clean your room ___ before the guests arrive.', 'The children helped clean the classroom ___ after the party.', 'We need to clean the kitchen ___ before dinner.'],
  exp_0389: ['The baby finally fell ___ after midnight.', 'I was so tired that I fell ___ on the sofa.', 'She often falls ___ while reading in bed.'],
  exp_0500: ['He got out ___ bed as soon as the alarm rang.', 'I did not want to get out ___ bed on Sunday.', 'She got out ___ bed and opened the curtains.'],
  exp_0567: ['We went ___ bed early after the long journey.', 'My parents usually go ___ bed before midnight.', 'He decided to go ___ bed instead of watching another film.'],
  exp_0606: ['I help my parents ___ the house at weekends.', 'She often helps ___ the house after school.', 'Children can help ___ the house by tidying their rooms.'],
  exp_0615: ['We spent the whole evening ___ home.', 'I left my phone ___ home by mistake.', 'They prefer eating ___ home on weekdays.'],
  exp_0616: ['It was late, so we decided to go ___.', 'After the concert, everyone went ___.', 'I cannot wait to go ___ and relax.'],
  exp_0617: ['The forest is home ___ many rare birds.', 'This lake is home ___ several species of fish.', 'The museum is home ___ an impressive collection of paintings.'],
  exp_0792: ['Could you make room ___ one more chair?', 'We moved the table to make room ___ the new sofa.', 'Please make room ___ the other passengers.'],
  exp_0818: ['There is no room ___ another desk in this classroom.', 'We have no room ___ unnecessary furniture.', 'The bag is full, so there is no room ___ your books.'],
  exp_0956: ['Is there enough room ___ everyone at the table?', 'They left room ___ a small garden behind the house.', 'There is very little room ___ another shelf.'],
  exp_0998: ['He likes to sleep ___ on Saturday mornings.', 'I usually sleep ___ when I do not have school.', 'We decided to sleep ___ after the late-night flight.'],
  exp_1081: ['Please tidy ___ your desk before you leave.', 'The children tidied ___ their toys after playing.', 'We need to tidy ___ the kitchen before our guests arrive.'],
  exp_1107: ['My grandfather used ___ walk to school every day.', 'I used ___ live in a small village.', 'She used ___ be afraid of speaking English.'],
  exp_1109: ['Many young people voted ___ the new candidate.', 'Who did you vote ___ in the school election?', 'Most members voted ___ the proposed changes.'],
  exp_1110: ['We had to wait ___ the bus in the rain.', 'Please wait ___ me outside the library.', 'They waited ___ their friends near the entrance.'],
  exp_1111: ['I usually wake ___ at seven o’clock.', 'The loud noise woke me ___ in the middle of the night.', 'She wakes ___ early on school days.'],
  exp_1112: ['We walked ___ the river after lunch.', 'They walked ___ the beach collecting shells.', 'The tourists walked ___ the narrow street.'],
  exp_1113: ['The little boy walked ___ himself for the first time.', 'He prefers to walk ___ himself after school.', 'My brother walked ___ himself to the shop.'],
  exp_1114: ['We decided to walk ___ the park after dinner.', 'The children walked ___ the room quietly.', 'She walked ___ the garden and stopped by the roses.'],
  exp_1115: ['Be careful not to walk ___ the wet grass.', 'Please do not walk ___ the freshly painted floor.', 'The tourists walked ___ the path beside the lake.'],
  exp_1120: ['Watch ___! There is a car coming!', 'Watch ___ for falling rocks on this path.', 'You should watch ___ when crossing the road.'],
  exp_1121: ['The guide showed us the way ___ of the building.', 'We finally found a way ___ of the maze.', 'The emergency signs show the way ___ of the tunnel.'],
  exp_1122: ['His family is quite well ___ and owns a large house.', 'She grew up in a well-___ neighbourhood.', 'They are better ___ now than they were ten years ago.'],
  exp_1123: ['The city is well-known ___ its historic castle.', 'Our region is well-known ___ its beautiful lakes.', 'The scientist became well-known ___ her research.'],
  exp_1124: ['She solved the problem with the help ___ her teacher.', 'We decorated the classroom with the help ___ our friends.', 'He learned to swim with the help ___ a coach.'],
  exp_1126: ['This museum is worth ___ at least once.', 'The old castle is worth ___ if you enjoy history.', 'That small seaside town is worth ___ in summer.'],
  exp_1127: ['Her achievements are worthy ___ admiration.', 'This project is worthy ___ serious consideration.', 'The young volunteer is worthy ___ our respect.'],
  exp_1130: ['We saw two pandas ___ the zoo.', 'The children spent the afternoon ___ the zoo.', 'There are several new animals ___ the zoo.']
};
for (const item of data.expressions) {
  const variants = examples[item.id];
  if (!variants) continue;
  if (variants.length !== 3 || variants.some(s => (s.match(/___/g) || []).length !== 1)) throw Error(item.id);
  item.sentences = variants;
  item.gapSentence = variants[0];
  if (item.id === 'exp_1126') {
    item.answer = 'visiting';
    item.acceptedAnswers = ['visiting'];
  }
  item.example = variants[0].replace('___', item.answer);
  item.editorialStatus = 'reviewed';
}
fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
console.log('Reviewed:', Object.keys(examples).length);
