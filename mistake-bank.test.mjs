import test from 'node:test';
import assert from 'node:assert/strict';
import {preserveExpressionMistake,preserveCTMistake,mergeCheckpointMistakes,recoverMistakes} from '../mistake-utils.js';
import {applyPracticeCompletion,evaluateCheckpoint} from '../progress-utils.js';
import {isTeacherPreview,isCourseCardLocked,isCheckpointLocked,shouldRecordTraining} from '../teacher-preview.js';

test('errors form a permanent set and can be repeated indefinitely',()=>{
  const state={errors:[]};
  preserveExpressionMistake(state,'exp_0123');
  preserveExpressionMistake(state,'exp_0123');
  assert.deepEqual(state.errors,['exp_0123']);
  // A later correct answer must not remove the expression.
  preserveExpressionMistake(state,'exp_0123');
  assert.deepEqual(state.errors,['exp_0123']);
});

test('Checkpoint misses remain available after a correct retake',()=>{
  const items=[{id:'checkpoint_1_1',gapSentence:'We waited ___ the bus.',answer:'for'}];
  const incorrect=evaluateCheckpoint(items,['at']);
  let bank=mergeCheckpointMistakes([],items,incorrect.answers);
  assert.equal(bank.length,1);
  assert.equal(bank[0].gapSentence,'We waited ___ the bus.');
  const correct=evaluateCheckpoint(items,['for']);
  bank=mergeCheckpointMistakes(bank,items,correct.answers);
  assert.equal(bank.length,1);
  bank=mergeCheckpointMistakes(bank,items,incorrect.answers);
  assert.equal(bank.length,1);
});

test('CT-format mistakes remain in the bank for unlimited retakes',()=>{
  const task={id:'ct_transform_7',type:'b19',answer:'gets on well with'};
  const once=preserveCTMistake([],task);
  assert.equal(once.length,1);
  assert.equal(preserveCTMistake(once,task).length,1);
  assert.equal(once[0].answer,task.answer);
});

test('historical mistakes are restored for returning students',()=>{
  const recovered=recoverMistakes({errors:[],mistakeHistory:[{expressionId:'exp_0022'}],checkpointAttempts:[{module:1,answers:[{sentence:'He is fond ___ books.',correct:'of',given:'for',ok:false}]}]});
  assert.deepEqual(recovered.errors,['exp_0022']);
  assert.equal(recovered.checkpointMistakes.length,1);
});

test('Checkpoint and mistake reviews never award stars or unlock cards',()=>{
  const state={completed:{5:82},unlocked:6,stars:4};
  assert.equal(applyPracticeCompletion(state,{checkpoint:true,cardId:5},100),false);
  assert.equal(applyPracticeCompletion(state,{review:true,cardId:5},100),false);
  assert.deepEqual(state,{completed:{5:82},unlocked:6,stars:4});
  assert.equal(applyPracticeCompletion(state,{cardId:6},90),true);
  assert.equal(state.completed[6],90);
  assert.equal(state.unlocked,7);
});

test('teacher can browse every card and checkpoint without a student account',()=>{
 assert.ok(isTeacherPreview('teacher'));
 for(let card=1;card<=35;card++)assert.equal(isCourseCardLocked('teacher',card,1),false);
 for(let module=1;module<=7;module++)assert.equal(isCheckpointLocked('teacher',module,{}),false);
 assert.equal(isCourseCardLocked('student',35,1),true);
 assert.equal(isCheckpointLocked('student',7,{}),true);
 assert.equal(shouldRecordTraining('teacher'),false);
 assert.equal(shouldRecordTraining('student'),true);
});
