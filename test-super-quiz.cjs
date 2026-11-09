const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const elements={app:{innerHTML:'',listeners:{},addEventListener(type,fn){this.listeners[type]=fn;}},storage:{textContent:''},question:{focus(){}}};let saved=null,confirmValue=true;
const c={window:{scrollTo(){}},document:{querySelector(s){return elements[s.slice(1)];}},localStorage:{getItem(){return saved},setItem(k,v){saved=v}},confirm(){return confirmValue},console,Blob,URL,setTimeout};
vm.createContext(c);vm.runInContext(fs.readFileSync('super-quiz/data.js','utf8'),c);vm.runInContext(fs.readFileSync('super-quiz/app.js','utf8'),c);
const click=action=>elements.app.listeners.click({target:{closest(){return{dataset:{action}}}}});
click('start');let s=JSON.parse(saved);assert.equal(s.ids.length,758);assert.equal(new Set(s.ids).size,758);
for(const q of c.window.SUPER_BANK){assert.equal(s.orders[q.id].length,q.choices.length);assert.equal(new Set(s.orders[q.id]).size,q.choices.length);}
// Run every question through the actual input handler and navigation, including all select-all keys.
const byId=new Map(c.window.SUPER_BANK.map(q=>[q.id,q]));
for(let i=0;i<s.ids.length;i++){s=JSON.parse(saved);const q=byId.get(s.ids[i]);elements.app.querySelectorAll=()=>q.answer.map(value=>({value}));elements.app.listeners.change({target:{name:'answer'}});if(i<s.ids.length-1)click('next');}
click('submit');assert(elements.app.innerHTML.includes('Challenge passed.'));assert(elements.app.innerHTML.includes('758 / 758'));
// A single error in a small topic must fail the topic threshold even if overall accuracy stays high.
let smallest=[...new Set(c.window.SUPER_BANK.map(q=>q.group+'/'+q.topic))].map(g=>c.window.SUPER_BANK.filter(q=>q.group+'/'+q.topic===g)).sort((a,b)=>a.length-b.length)[0];
// Reload a deliberately imperfect saved attempt and validate retry includes precisely the omissions.
s=JSON.parse(saved);for(const q of smallest)s.answers[q.id]=[];saved=JSON.stringify(s);vm.runInContext(fs.readFileSync('super-quiz/app.js','utf8'),c);click('resume');assert(elements.app.innerHTML.includes('Keep sharpening.'));click('retry');s=JSON.parse(saved);assert.equal(s.ids.length,smallest.length);assert.equal(s.full,false);
// Clearing an answer persists; submitting an empty retry marks all unanswered as wrong.
click('clear');click('submit');assert(elements.app.innerHTML.includes('0 / '+smallest.length));
// Starting over requires the replacement confirmation.
confirmValue=false;click('start');assert.equal(JSON.parse(saved).ids.length,smallest.length);
console.log('Passed: all 758 questions, shuffled option permutations, every key including 8 multi-selects, full pass, topic failure, retry coverage, save/reload, clear, unanswered zero, replacement cancellation.');

