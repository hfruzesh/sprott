const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const c = {window: {}}; vm.createContext(c);
for (const file of ['data.js', 'bank-1.js', 'bank-2.js', 'bank-3.js', 'bank-4.js', 'levels.js', 'teaching.js', ...Array.from({length: 8}, (_, i) => 'teaching-' + (i + 1) + '.js'), 'teaching-ui.js']) vm.runInContext(fs.readFileSync('super-quiz/' + file, 'utf8'), c);
const bank = JSON.parse(JSON.stringify(c.window.SUPER_BANK));
const teaching = JSON.parse(JSON.stringify(c.window.TEACHING));
const levels = JSON.parse(JSON.stringify(c.window.SUPER_LEVELS));
const engine = require('./super-quiz/engine.js')(bank, c.window.SUPER_REVISION, levels);
const esc = s => String(s).replace(/[&<>"']/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char]));
let options = 0;
assert.equal(Object.keys(teaching).length, 758);
for (const q of bank) {
  const row = teaching[q.id]; assert(row); assert.equal(row.options.length, q.choices.length);
  assert(q.source && q.group && q.topic && q.explain);
  for (let index = 0; index < q.choices.length; index++) {
    const feedback = row.options[index];
    assert(feedback.note.length > 8, q.id); assert(feedback.evidence.includes(q.id));
    assert(feedback.evidence.every(id => engine.byId.has(id)));
    assert.equal(feedback.kind === 'correct', q.answer.includes(index));
    if (feedback.kind === 'original-choice-feedback') assert.equal(feedback.note, q.why.find(w => w.choice === q.choices[index]).text);
    if (feedback.kind === 'source-contrast') assert.deepEqual(feedback.evidence, [q.id]);
    const html = c.window.renderTeachingLesson(q, [index], bank, teaching);
    assert(html.includes(esc(q.source)), q.id);
    assert(html.includes(esc(q.topic)), q.id);
    assert(html.includes(esc(q.explain)), q.id);
    assert(html.includes(esc(feedback.note)), q.id);
    assert(q.answer.every(n => html.includes(esc(q.choices[n]))));
    assert(html.includes('Learn from each answer choice'));
    assert(!/undefined|\[object Object\]|TODO/.test(html), q.id);
    options++;
  }
  const correctHtml = c.window.renderTeachingLesson(q, q.answer, bank, teaching);
  assert(correctHtml.includes('Your answer matches the course key'));
}
assert.equal(options, 2915);
for (const level of levels) {
  assert(level.ids.every(id => teaching[id].options.length === engine.byId.get(id).choices.length));
  const attempt = engine.startLevel(level.id), id = attempt.ids[0], q = engine.byId.get(id);
  assert.equal(engine.explored(attempt), 0);
  assert(!engine.lessonVisible(attempt, id));
  engine.answer(attempt, id, q.answer); engine.teach(attempt, id);
  assert(engine.lessonVisible(attempt, id)); assert.equal(engine.explored(attempt), 1);
  assert(engine.valid(JSON.parse(JSON.stringify(attempt))));
  engine.answer(attempt, id, []); assert(!engine.lessonVisible(attempt, id)); assert.equal(engine.explored(attempt), 1);
  engine.teach(attempt, id); assert(engine.lessonVisible(attempt, id));
  const invalid = JSON.parse(JSON.stringify(attempt)); invalid.lessonAnswers[id] = [99]; assert(!engine.valid(invalid));
  const duplicate = JSON.parse(JSON.stringify(attempt)); duplicate.lessonAnswers[id] = [0, 0]; assert(!engine.valid(duplicate));
  attempt.done = true; assert(!engine.teach(attempt, id));
}
console.log('PASS: all 758 questions and 2,915 choice lessons have correct keys, scope, source explanations and evidence; all three study sets covered; saved lessons, stale feedback and corrupt lesson records checked.');
