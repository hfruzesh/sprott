const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const createEngine = require('./super-quiz/engine.js');
const context = {window: {}};
vm.createContext(context);
vm.runInContext(fs.readFileSync('super-quiz/data.js', 'utf8'), context);
for(let i=1;i<=4;i++)vm.runInContext(fs.readFileSync('super-quiz/bank-'+i+'.js', 'utf8'), context);
const bank = JSON.parse(JSON.stringify(context.window.SUPER_BANK));
const engine = createEngine(bank, context.window.SUPER_REVISION);
const copy = value => JSON.parse(JSON.stringify(value));
assert.equal(bank.length, 758);
assert.equal(new Set(bank.map(q => q.id)).size, 758);
assert.equal(bank.filter(q => q.answer.length > 1).length, 8);
assert(bank.every(q => q.choices.length >= 4));
const register = JSON.parse(fs.readFileSync('super-quiz/editorial-review.json', 'utf8'));
assert.equal(register.reviewed, 758);
assert.equal(register.substantiveRevisions, 180);
assert.deepEqual(register.questions.map(q => q.id), bank.map(q => q.id));
for (let round = 0; round < 5; round++) {
  const attempt = engine.start(bank.map(q => q.id), true);
  assert(engine.valid(copy(attempt)));
  assert.equal(engine.answered(attempt), 0);
  assert.equal(engine.result(attempt).correct, 0);
  for (let at = 0; at < attempt.ids.length; at++) {
    attempt.at = at;
    const id = attempt.ids[at], q = engine.byId.get(id);
    const order = attempt.orders[id];
    assert(engine.exact(order, q.choices.map((_, i) => i)));
    // Select by the displayed shuffled text; verify the original key still applies.
    const selected = order.filter(i => q.answer.map(n => q.choices[n]).includes(q.choices[i]));
    assert(engine.answer(attempt, id, selected));
    assert(engine.isCorrect(attempt, id));
    if (q.answer.length > 1) {
      for (let mask = 0; mask < 2 ** order.length; mask++) {
        const subset = order.filter((_, index) => mask & (1 << index));
        assert(engine.answer(attempt, id, subset));
        assert.equal(engine.isCorrect(attempt, id), engine.exact(subset, q.answer));
      }
      assert(!engine.answer(attempt, id, [...selected, selected[0]]));
      assert(engine.answer(attempt, id, selected));
    } else {
      for (const wrong of order.filter(n => !q.answer.includes(n))) {
        engine.answer(attempt, id, [wrong]);
        assert(!engine.isCorrect(attempt, id));
      }
      engine.answer(attempt, id, selected);
    }
  }
  assert.equal(engine.answered(attempt), 758);
  assert(engine.result(attempt).pass);
  const smallTopic = bank.find(q => bank.filter(other => other.group === q.group && other.topic === q.topic).length < 10);
  attempt.answers[smallTopic.id] = [];
  const result = engine.result(attempt);
  assert.equal(result.correct, 757);
  assert(!result.pass, 'High overall score must not hide a weak topic');
  assert.deepEqual(result.missed, [smallTopic.id]);
  const retry = engine.start(result.missed, false);
  engine.answer(retry, retry.ids[0], engine.byId.get(retry.ids[0]).answer);
  assert.equal(engine.result(retry).correct, 1);
  assert(!engine.result(retry).pass, 'Retry cannot earn a full-coverage pass');
  attempt.done = true;
  assert(!engine.answer(attempt, attempt.ids[attempt.at], []));
}
const base = engine.start(bank.map(q => q.id), true);
const invalid = [
  a => a.ids.push(a.ids[0]), a => a.ids[0] = 'unknown', a => a.ids.pop(),
  a => a.at = -1, a => a.at = .5, a => a.at = 758, a => a.revision = 'older',
  a => a.full = 'true', a => a.done = 'false', a => a.answers = [],
  a => a.orders = {}, a => a.orders[a.ids[0]][0] = 99,
  a => a.orders[a.ids[0]][0] = a.orders[a.ids[0]][1],
  a => a.answers[a.ids[0]] = [99], a => a.answers[a.ids[0]] = ['0'],
  a => a.answers[a.ids[0]] = [0, 0], a => a.answers.unknown = [],
  a => a.answers[a.ids.find(id => engine.byId.get(id).answer.length === 1)] = [0, 1]
];
for (const corrupt of invalid) {const attempt = copy(base); corrupt(attempt); assert(!engine.valid(attempt));}
for (const input of [null, [], {}, 4, 'invalid']) assert(!engine.valid(input));
assert.throws(() => engine.start([], false));
assert.throws(() => engine.start([bank[0].id, bank[0].id], false));
assert.throws(() => engine.start([bank[0].id], true));
assert(!engine.answer(base, base.ids[1], [0]), 'Stale question event must not alter current answer');
console.log('PASS: 758 question keys and every distractor across five shuffled attempts; 8 exact-set keys; 18 corrupt-save cases; topic threshold; complete retry; revision protection; stale input and post-submit guards.');
