const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const context = {window: {}}; vm.createContext(context);
for (const file of ['data.js', 'bank-1.js', 'bank-2.js', 'bank-3.js', 'bank-4.js', 'levels.js']) vm.runInContext(fs.readFileSync('super-quiz/' + file, 'utf8'), context);
const bank = JSON.parse(JSON.stringify(context.window.SUPER_BANK)), levels = JSON.parse(JSON.stringify(context.window.SUPER_LEVELS));
const engine = require('./super-quiz/engine.js')(bank, context.window.SUPER_REVISION, levels);
assert.deepEqual(levels.map(level => level.count), [100, 400, 758]);
for (const level of levels) {
  const attempt = engine.startLevel(level.id);
  assert.equal(attempt.ids.length, level.count); assert.equal(new Set(attempt.ids).size, level.count);
  assert(engine.valid(JSON.parse(JSON.stringify(attempt))));
  assert(attempt.ids.every(id => level.ids.includes(id)));
  for (let at = 0; at < attempt.ids.length; at++) {attempt.at = at; engine.answer(attempt, attempt.ids[at], engine.byId.get(attempt.ids[at]).answer);}
  const result = engine.result(attempt); assert.equal(result.correct, level.count); assert(result.targetMet); assert.equal(result.pass, level.full);
  const corrupt = JSON.parse(JSON.stringify(attempt)); corrupt.ids.pop(); assert(!engine.valid(corrupt));
}
assert(levels[0].ids.every(id => levels[1].ids.includes(id)));
assert(levels[1].ids.every(id => levels[2].ids.includes(id)));
assert.equal(new Set(levels[1].ids.map(id => engine.byId.get(id).group)).size, 9);
assert.throws(() => engine.startLevel('unknown'));
assert.throws(() => engine.start(levels[0].ids, true, 'hard100'));
const source = require('./super-quiz/written-source.json'), checker = require('./super-quiz/written-engine.js');
assert.equal(source.questions.length, 80); assert.equal(source.pages, 9);
for (const q of source.questions) {
  assert.equal(checker.check(q, q.answer).status, 'covered', q.id + ': model answer should reach its own checklist target');
  assert.equal(checker.check(q, '').status, 'empty');
  assert.notEqual(checker.check(q, 'unrelated random text').status, 'covered');
}
const find = n => source.questions[n - 1];
assert.equal(checker.check(find(1), 'justice; autonomy; nonmaleficence; beneficence').status, 'covered');
assert.notEqual(checker.check(find(1), 'not autonomy, not justice, not beneficence, not non-maleficence').status, 'covered');
assert.equal(checker.check(find(40), 'Protect vulnerable people. Improve care standards. Promote professional development. Maintain a database.').status, 'covered');
assert.notEqual(checker.check(find(40), 'Protect vulnerable people.').status, 'covered');
assert.equal(checker.check(find(37), 'Age, disability, race, religion, gender identity, sexual orientation.').status, 'covered');
assert.notEqual(checker.check(find(37), 'age age age age age age').status, 'covered');
assert.notEqual(checker.check(find(67), 'Repression is conscious; suppression is unconscious.').status, 'covered');
assert.equal(checker.check(find(67), 'Repression is unconscious. Suppression is conscious.').status, 'covered');
assert.notEqual(checker.check(find(68), 'Projection redirects feelings; displacement attributes feelings.').status, 'covered');
assert.equal(checker.check(find(80), 'home care, hospice, palliative care, mental health, rehabilitation').status, 'covered');
assert.notEqual(checker.check(find(80), 'home care, hospice, palliative care, mental health, rehabilitation, acute care hospitals').status, 'covered');
assert.notEqual(checker.check(find(80), 'home care home care home care home care home care').status, 'covered');
console.log('PASS: 100/400/758 sizes, unique IDs, nested sets, nine-area broad coverage, scoring and save validation; all 80 PDF models, blank/unrelated answers, distinct list counts, synonyms, negation and reversed mechanism pairings.');
