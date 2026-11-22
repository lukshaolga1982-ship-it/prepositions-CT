import {uniquePracticeItems} from './practice-utils.js';

// Author-written practice analogues, with one B19 reference example from the user-supplied variant.
export const dualContextTasks=[
['The athlete ___ the world record.','The news ___ her heart.','broke'],
['He ___ on a warm sweater.','You must ___ up with the noise.','put'],
['She will ___ part in the competition.','Please ___ care of the plants.','take'],
['We need to ___ a decision.','Regular practice will ___ a difference.','make'],
['He hopes to ___ over his fear.','I ___ on well with my neighbours.','get'],
['Can you ___ after my cat?','We ___ forward to the holiday.','look'],
['Please ___ up smoking.','The coach will ___ us advice.','give'],
['They ___ off before sunrise.','Someone tried to ___ fire to the shed.','set'],
['We ___ across an old letter.','They ___ to an agreement yesterday.','came'],
['Please ___ down the volume.','The leaves ___ yellow in autumn.','turn'],
['Good parents ___ up their children with care.','These changes may ___ about improvements.','bring'],
['They ___ out an experiment.','Please ___ on with the exercise.','carry'],
['We may ___ out of time.','I ___ into an old friend yesterday.','run'],
['The hikers ___ through the forest.','We ___ on a trip every summer.','go'],
['Can you ___ the difference?','I will ___ you about the journey.','tell'],
['Please ___ attention to the sign.','We need to ___ for the tickets.','pay'],
['We must ___ in touch.','Please ___ quiet during the test.','keep'],
['The child ___ asleep quickly.','They ___ out with each other last week.','fell'],
['She will ___ into the room quietly.','I may ___ across an interesting book.','come'],
['He ___ up the old photograph.','The wind ___ down several trees.','blew']
].map(([first,second,answer],i)=>({id:`ct_dual_${i+1}`,type:'b7-b8',first,second,answer,acceptedAnswers:[answer]}));

export const transformationTasks=[
['You mustn’t take photos in the cathedral.','You ___ to take photos in the cathedral.','ALLOWED','are not allowed'],
['I am responsible for organising the trip.','It is my ___ organise the trip.','DUTY','duty to'],
['She looks after her younger brother.','She ___ her younger brother.','CARE','takes care of'],
['We are running out of time.','We ___ time.','SHORT','are short of'],
['They postponed the meeting.','They ___ the meeting.','OFF','put off'],
['Please continue working.','Please ___ working.','ON','carry on'],
['He has a good relationship with his neighbours.','He ___ his neighbours.','WELL','gets on well with'],
['She admires her teacher.','She ___ her teacher.','UP','looks up to'],
['He cannot tolerate the noise.','He cannot ___ the noise.','UP','put up with'],
['They reached an agreement.','They ___ an agreement.','CAME','came to'],
['I met my former classmate unexpectedly.','I ___ my former classmate.','INTO','ran into'],
['She admitted responsibility for the mistake.','She ___ the mistake.','BLAME','took the blame for'],
['He apologised for the delay.','He ___ the delay.','SORRY','said sorry for'],
['The project caused several problems.','The project ___ several problems.','RISE','gave rise to'],
['They succeeded in solving the problem.','They ___ the problem.','MANAGED','managed to solve'],
['She is very interested in art.','She ___ art.','KEEN','is keen on'],
['The report helped us understand the problem.','The report ___ the problem.','LIGHT','shed light on'],
['He stopped smoking.','He ___ smoking.','UP','gave up'],
['This dress is no longer fashionable.','This dress ___ fashion.','OUT','is out of'],
['She resembles her mother.','She ___ her mother.','AFTER','takes after']
].map(([original,template,keyword,answer],i)=>({id:`ct_transform_${i+1}`,type:'b19',original,template,keyword,answer,acceptedAnswers:[answer,...({0:["aren't allowed"],6:['gets along well with'],8:["can't put up with"]}[i]||[])]}));

export function buildCTTasks(format,expressions,random=Math.random){
  if(format==='b1-b3'){
    const eligible=expressions.filter(x=>/^(?:at|in|on|to|for|from|with|of|by|about|into|over|under|between|against|through|after|before|without|among|across|along|around)$/i.test(x.answer));
    return uniquePracticeItems(eligible,20,random).map(x=>({id:`ct_prep_${x.id}`,type:'b1-b3',expressionId:x.id,template:x.gapSentence,answer:x.answer,acceptedAnswers:x.acceptedAnswers||[x.answer]}));
  }
  const bank=format==='b7-b8'?dualContextTasks:format==='b19'?transformationTasks:[];
  return [...bank].map(item=>({item,order:random()})).sort((a,b)=>a.order-b.order).map(({item})=>({...item}));
}

export function isCorrectCTAnswer(item,given){
  const normal=s=>String(s||'').trim().toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ').replace(/[.!?]+$/,'');
  return (item.acceptedAnswers||[item.answer]).some(value=>normal(value)===normal(given));
}
