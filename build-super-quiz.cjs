const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const {createHash} = require('node:crypto');
const manifest = JSON.parse(fs.readFileSync('super-quiz/original-source-manifest.json', 'utf8'));
const baseline = 'a9a07abab679faccb9206ba9b6268623a2ff1e57';
assert.equal(manifest.baselineCommit, baseline);
const digest = value => createHash('sha256').update(value).digest('hex');
const sets = [
  ['Pre-learning', ['data.js']],
  ['Chapters 2 & 3', ['chapter-3/data.js']],
  ['Chapters 4, 5 & 10', ['chapter-4-5/data.js', 'chapter-4-5/chapter4_focus.js', 'chapter-4-5/chapter10.js', 'chapter-4-5/post_ch5_review.js', 'chapter-4-5/challenge_rounds.js']],
  ['Chapter 6', ['chapter-6/data.js']],
  ['Chapter 13', ['chapter-13/data.js']],
  ['Chapter 23', ['main/chapter-23/data.js']]
];
assert.deepEqual(sets.flatMap(([, files]) => files), manifest.files.map(file => file.path));
const bank = [], inventory = [], parity = [];
for (const [label, files] of sets) {
  const context = {window: {}};
  vm.createContext(context);
  for (const path of files) {
    const raw = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
    assert.equal(digest(raw), manifest.files.find(file => file.path === path).sha256, 'Source differs from pinned pre-change version: ' + path);
    vm.runInContext(raw, context, {filename: path});
  }
  const questions = context.window.HCA?.bank || context.window.ARCADE.questions;
  for (const original of questions) {
    const q = JSON.parse(JSON.stringify(original));
    const choices = q.options || q.choices;
    const answer = typeof q.answer === 'string' ? [choices.indexOf(q.answer)] : Array.isArray(q.answer) ? q.answer : [q.answer];
    const chapter = q.chapter || (label === 'Chapters 2 & 3' ? 3 : label === 'Chapters 4, 5 & 10' ? (['terms', 'principles', 'dilemmas'].includes(q.mode) ? 4 : 5) : null);
    const id = files[0] + ':' + q.id;
    const explanation = q.explain || q.lesson;
    const row = {...q, id, originalId: q.id, bank: label, group: chapter ? 'Chapter ' + chapter : 'Pre-learning', choices, answer, explain: explanation, source: q.source || 'HCA Pre-Learning Package, slide ' + q.slide, sourceFiles: files};
    // Only adapt reference paths and the key's storage format; never edit learning content.
    row.references = (q.references || []).map(ref => ({...ref, href: '../' + files[0].split('/').slice(0, -1).concat(ref.href).join('/')}));
    assert(row.prompt && row.explain && row.source, id);
    assert(choices.length >= 2 && new Set(choices).size === choices.length, id);
    assert(answer.length && new Set(answer).size === answer.length && answer.every(n => Number.isInteger(n) && n >= 0 && n < choices.length), id);
    const originalCorrect = typeof q.answer === 'string' ? [q.answer] : (Array.isArray(q.answer) ? q.answer : [q.answer]).map(n => choices[n]);
    assert.deepEqual(row.answer.map(n => row.choices[n]), originalCorrect, id);
    assert.equal(row.prompt, q.prompt, id);
    assert.deepEqual(row.choices, q.options || q.choices, id);
    assert.equal(row.explain, q.explain || q.lesson, id);
    parity.push({id, originalContentSha256: digest(JSON.stringify({prompt: q.prompt, choices, correct: originalCorrect, explain: explanation, why: q.why || null})), match: true});
    bank.push(row);
  }
  inventory.push({bank: label, files, count: questions.length});
}
assert.equal(bank.length, 758);
assert.equal(new Set(bank.map(q => q.id)).size, 758);
const revision = digest(JSON.stringify(bank)).slice(0, 16);
const chapters = Object.fromEntries([...new Set(bank.map(q => q.group))].map(group => [group, bank.filter(q => q.group === group).length]));
fs.writeFileSync('super-quiz/data.js', 'window.SUPER_REVISION=' + JSON.stringify(revision) + ';\nwindow.SUPER_REVISED=0;\nwindow.SUPER_BANK=[];\n');
for (let i = 0; i < 4; i++) fs.writeFileSync('super-quiz/bank-' + (i + 1) + '.js', 'window.SUPER_BANK.push(...' + JSON.stringify(bank.slice(i * 190, (i + 1) * 190)) + ');\n');
fs.writeFileSync('super-quiz/source-parity.json', JSON.stringify({baselineCommit: baseline, revision, total: bank.length, exactMatches: parity.length, changedPairings: 0, addedQuestions: 0, outsideReferencesAdded: 0, fieldsChecked: ['prompt', 'all choices', 'correct answer text/set', 'explanation', 'distractor feedback'], questions: parity}, null, 2) + '\n');
fs.writeFileSync('super-quiz/coverage.json', JSON.stringify({baselineCommit: baseline, revision, sourceFileDigests: Object.fromEntries(manifest.files.map(file => [file.path, file.sha256])), total: bank.length, inventory, chapters, questions: bank.map(q => ({id: q.id, chapter: q.group, topic: q.topic, source: q.source, answer: q.answer.map(n => q.choices[n])}))}, null, 2) + '\n');
const report = `# Original-material verification\n\nBaseline: [hfruzesh/sprott at ${baseline}](https://github.com/hfruzesh/sprott/tree/${baseline}), the repository state before the super-quiz work. All ten input files were checked against that commit, ignoring only Git CRLF/LF line-ending differences. Their SHA-256 digests are pinned in original-source-manifest.json; the builder refuses changed inputs.\n\n- 758 original records included, with every source ID preserved.\n- 758 exact matches for prompts, all answer choices, correct answer texts/sets, explanations and distractor feedback.\n- 0 added questions, 0 changed question–answer pairings and 0 outside references added.\n- The original 62 two-choice questions and 8 select-all questions are retained in their original form.\n\nThe previous 180 substantive rewrites, spelling-normalization layer and externally sourced living-will replacement have been removed from the active bank. The original wording and course keys are reproduced verbatim, including any original limitations or errors. This verifies agreement with the original quizzes; it is not an independent certification of their factual accuracy or complete textbook coverage. Original links already in the repo are retained.\n\nsource-parity.json records each question’s matching content fingerprint. coverage.json records each current key and source locator. Only question IDs are namespaced, answer keys are stored as indices, and relative reference paths are rebased for the combined interface. These storage and navigation adaptations do not change question text or answers.\n\nThe interface improvements remain: live progress, guarded navigation, validated saves, in-page confirmations, paginated review, result export and preserved full-quiz results during retries. The default experience teaches after each answer and records lessons explored, without a pass/fail target.\n\nRebuild with node build-super-quiz.cjs. Run npm test for source-parity, grading and page-control checks.\n`;
fs.writeFileSync('super-quiz/REVIEW.md', report);
fs.writeFileSync('super-quiz/COVERAGE.md', '# Super-quiz coverage\n\n' + Object.entries(chapters).map(([group, count]) => '- ' + group + ': ' + count).join('\n') + '\n\nAll 758 questions reproduce the pre-change quizzes verbatim. See [original-material verification](REVIEW.md), original-source-manifest.json and source-parity.json. No authored question revisions or added outside sources are used.\n\nThe full study set includes every record, with shuffled questions and choices. Single-choice answers teach immediately; select-all questions teach after Check my answer. Correct keys, source lessons, scope and explanations for every option are shown. Progress counts lessons explored rather than awarding a pass or fail.\n\nSaved attempts are validated against this restored bank’s content revision. Answers from the previously rewritten version are not graded against the originals. Progress saves in the current browser; storage failures are reported.\n');
console.log(JSON.stringify({baseline, total: bank.length, exactMatches: parity.length, changedPairings: 0, addedQuestions: 0, outsideReferencesAdded: 0, revision}));
require('./build-study-levels.cjs')(bank, revision);
require('./build-teaching.cjs')(bank, revision);

fs.appendFileSync('super-quiz/REVIEW.md','\n## Study modes and additional authorized source\n\nThe source-parity counts above apply to the original 758-question bank. The 100-question level selects advanced original questions; the 400-question level includes those 100 and all nine study areas; the full level includes all 758. Selection metadata is in study-levels.json. Difficulty is an editorial selection based on original round labels and question design, not measured student performance.\n\nA separate write-in section contains 80 prompts and model answers from the user-supplied HCA200_Final_Exam_Instructor_Review_QA.pdf. This newly authorized PDF source does not change or add to the 758 original multiple-choice records. written-source.json records its file digest, page locators, confidence labels and local key-point checklists. Feedback is a study aid requiring comparison with the model answer, not semantic or official marking.\n');
fs.appendFileSync('super-quiz/COVERAGE.md','\nStudy options: Hardest 100, Broad 400 and Complete 758. The separate 80-question PDF write-in section is outside the original-bank count. See [study modes](STUDY_MODES.md).\n');

fs.appendFileSync('super-quiz/REVIEW.md','\n## Instructional answer feedback\n\nThe 758 original prompts, choices, correct keys and original explanations remain unchanged. A separate teaching layer adds explanations for all 2,915 answer choices. Existing choice-specific feedback is retained. Other choices use related original course examples, source-supported decision distinctions, or explicit comparisons between the alternative and the original keyed response and rationale. Added teaching notes are explanatory material, not new question–answer pairings or independently verified clinical/legal guidance. Every teaching record cites its original question and any supporting question IDs.\n\nWhere a precise page or slide was not recorded in the original bank, the interface says so and supplies the chapter, topic, recorded section-level locator and original guide link; it does not invent page references. teaching-coverage.json records option counts and source precision for every question.\n');
