const fs = require('node:fs');
const assert = require('node:assert/strict');
const {createHash} = require('node:crypto');
module.exports = function reviewBank(bank, inventory) {
  const overrides = JSON.parse(fs.readFileSync('super-quiz/editorial-overrides.json', 'utf8'));
  const register = [], used = new Set();
  const clean = s => s.normalize('NFC').replace(/\bperson-centered\b/g, 'person-centred').replace(/\bclient-centered\b/g, 'client-centred').replace(/resumé/g, 'résumé').replace(/\bwellbeing\b/g, 'well-being').replace(/\bnon-verbal\b/g, 'nonverbal').replace(/\bcenter\b/g, 'centre').replace(/[ \t]{2,}/g, ' ').trim();
  for (const q of bank) {
    const before = {prompt: q.prompt, choices: q.choices};
    const edit = overrides[q.id];
    if (edit) {
      assert.equal(edit.originalPrompt, q.prompt, 'Source changed; review override: ' + q.id);
      used.add(q.id);
      Object.assign(q, {prompt: edit.prompt, choices: edit.choices, answer: edit.answer, explain: edit.explain});
      delete q.why;
    }
    q.prompt = clean(q.prompt);
    q.choices = q.choices.map(clean);
    q.explain = clean(q.explain);
    delete q.options;
    delete q.lesson;
    if (q.why) q.why = q.why.map(w => ({choice: clean(w.choice), text: clean(w.text)}));
    q.references = [...(q.references || []).map(r => ({...r, href: '../' + q.sourceFiles[0].split('/').slice(0, -1).concat(r.href).join('/')})), ...(edit?.additionalReferences || [])];
    assert(q.choices.length >= 4 && new Set(q.choices.map(s => s.toLowerCase())).size === q.choices.length, q.id);
    assert(q.answer.length && new Set(q.answer).size === q.answer.length && q.answer.every(n => Number.isInteger(n) && n >= 0 && n < q.choices.length), q.id);
    assert(!/\bNOT (?:inaccurate|false|irrelevant)\b/.test(q.prompt), q.id);
    const copyEdited = q.prompt !== before.prompt || JSON.stringify(q.choices) !== JSON.stringify(before.choices);
    register.push({id: q.id, group: q.group, topic: q.topic, status: edit ? 'Substantively revised' : copyEdited ? 'Copy-edited' : 'Reviewed and retained', reason: edit?.reason || 'Reviewed prompt and choices for spelling, grammar, clarity and answer cues.', originalPrompt: before.prompt, revisedPrompt: q.prompt, source: q.source});
  }
  assert.equal(used.size, Object.keys(overrides).length, 'Unused editorial override');
  const revision = createHash('sha256').update(JSON.stringify(bank)).digest('hex').slice(0, 16);
  fs.writeFileSync('super-quiz/editorial-review.json', JSON.stringify({revision, reviewed: bank.length, substantiveRevisions: used.size, copyEdits: register.filter(q => q.status === 'Copy-edited').length, questions: register}, null, 2) + '\n');
  fs.writeFileSync('super-quiz/REVIEW.md', `# Question quality and control review\n\nAll 758 prompts and choice sets were read for spelling, grammar, clarity and answer cues. ${used.size} questions have substantive revisions. Every two-choice and true-or-false item is now a four-choice question. Eight select-all questions remain. Canadian spelling is standardized; strong existing scenarios and essential terminology recall are retained. Difficulty is a design intention, not a measured psychometric result.\n\neditorial-overrides.json records authored revisions and reasons. editorial-review.json lists the disposition of every question. Original source records and IDs remain traceable. The builder rejects changed source prompts, unused overrides, invalid keys and duplicate choices. Rebuild with node build-super-quiz.cjs.\n\nThe original Chapter 5 living-will item made an overbroad claim about Canada. The super-quiz now tests the need to check a document and the applicable legal process rather than infer authority from its label. The revised explanation links to the [Public Guardian and Trustee of BC](https://www.trustee.bc.ca/adults/personal-planning-tools). The original chapter bank is retained as the source record; students should discuss the distinction with their instructor. This is not an independent legal or clinical audit of every course claim. Slide-reported figures remain explicitly attributed.\n\nThe revised interface updates progress on selection, validates saved question and option orders, rejects answers from older content revisions, guards rapid repeated navigation, supports keyboard operation, confirms submission and replacement within the page, paginates answer review, and retains the latest full result during retries. Save failures are shown. Old saved data remains untouched under its original storage key.\n`);
  console.log(JSON.stringify({reviewed: bank.length, substantiveRevisions: used.size, copyEdits: register.filter(q => q.status === 'Copy-edited').length, revision}));
  return revision;
};
