import test from 'node:test';
import assert from 'node:assert/strict';
import {parseLearningEmbed} from '../embed-utils.js';

test('Wordwall iframe is reduced to its safe embed URL',()=>{
  const result=parseLearningEmbed('<iframe src="https://wordwall.net/embed/f761a797b2044686a6f933bbb3880fd2?themeId=42&amp;ref=oembed" width="500" onload="alert(1)"></iframe>');
  assert.deepEqual(result,{provider:'Wordwall',embedUrl:'https://wordwall.net/embed/f761a797b2044686a6f933bbb3880fd2?themeId=42&ref=oembed'});
});
test('Quizlet public embed modes are supported',()=>{
  assert.deepEqual(parseLearningEmbed("<iframe src='https://quizlet.com/2593473/match/embed?i=hf0lx&x=1jj1'></iframe>"),{provider:'Quizlet',embedUrl:'https://quizlet.com/2593473/match/embed?i=hf0lx&x=1jj1'});
});
test('rejects unsupported domains, non-embed URLs and javascript',()=>{
  for(const value of ['javascript:alert(1)','https://evil.example/embed/f761a797b2044686a6f933bbb3880fd2','https://wordwall.net/resource/12345','https://quizlet.com/2593473/flash-cards/','https://wordwall.net.evil.example/embed/f761a797b2044686a6f933bbb3880fd2']){
    assert.throws(()=>parseLearningEmbed(value));
  }
});
test('unknown query keys are discarded',()=>{
  assert.equal(parseLearningEmbed('https://quizlet.com/2593473/flashcards/embed?i=abc&unsafe=true').embedUrl,'https://quizlet.com/2593473/flashcards/embed?i=abc');
});
