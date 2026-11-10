const fs = require('node:fs');
const assert = require('node:assert/strict');
module.exports = function buildLevels(bank, revision) {
  const closeDistinctions = new Set(['c02', 'c05', 'c06', 'c09', 'c14', 'c17', 'c21', 'c25', 'h06', 'h18'].map(id => 'chapter-3/data.js:' + id));
  function rate(q) {
    const reasons = []; let score = 0;
    if (/^challenge/.test(q.mode || '')) {score = 100; reasons.push('Original integrated challenge round');}
    else if (q.mode === 'scenarios') {score = 98; reasons.push('Original integrated Chapter 6 scenario');}
    else if (q.difficulty === 3 || q.mode === 'level3') {score = 90; reasons.push('Original highest-difficulty round');}
    else if (closeDistinctions.has(q.id)) {score = 88; reasons.push('Close care-setting, care-level or funding distinction');}
    else {
      if (q.difficulty === 2 || q.mode === 'level2') {score += 35; reasons.push('Original applied round');}
      if (/^(A |An |You |During |After |Before |Two |Several |One |At )/.test(q.prompt)) {score += 20; reasons.push('Apply knowledge to a situation');}
      if (/\b(chang|conflict|uncertain|refus|delegat|interpret|assum|distinguish|boundary|authorization|evidence)/i.test(q.prompt)) {score += 12; reasons.push('Requires judgment or a close conceptual distinction');}
    }
    if (q.answer.length > 1) {score += 6; reasons.push('Exact-set multi-select');}
    if (q.choices.length === 2) {score = Math.min(score, 8); reasons.push('Binary recognition item; lower selection priority');}
    if (!reasons.length) reasons.push('Essential recall or terminology');
    return {id: q.id, group: q.group, score, reasons};
  }
  const ranked = bank.map(rate).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  const hard = ranked.slice(0, 100).map(q => q.id);
  const broad = new Set(hard);
  // The broader level adds at least ten questions from each original study area.
  for (const group of new Set(bank.map(q => q.group))) {
    for (const q of ranked.filter(q => q.group === group).slice(0, 10)) broad.add(q.id);
  }
  for (const q of ranked) {if (broad.size === 400) break; broad.add(q.id);}
  const levels = [
    {id: 'hard100', title: 'Hardest 100', count: 100, full: false, detail: 'Advanced rounds, integrated scenarios and close distinctions.', ids: hard},
    {id: 'broad400', title: 'Broad 400', count: 400, full: false, detail: 'Includes the hardest 100 plus practice across all nine study areas.', ids: [...broad]},
    {id: 'all758', title: 'Complete 758', count: 758, full: true, detail: 'Every original question, with nothing sampled out.', ids: bank.map(q => q.id)}
  ];
  for (const level of levels) {assert.equal(level.ids.length, level.count); assert.equal(new Set(level.ids).size, level.count); assert(level.ids.every(id => bank.some(q => q.id === id)));}
  assert(hard.every(id => broad.has(id)));
  const catalogue = {revision, method: 'Design-based difficulty selection, not measured student difficulty. Original advanced rounds and integrated scenarios rank first; binary recall ranks lower. The 400 set includes the 100 set and every study area. Question wording, choices and keys are unchanged.', levels, ranking: ranked};
  fs.writeFileSync('super-quiz/study-levels.json', JSON.stringify(catalogue, null, 2) + '\n');
  fs.writeFileSync('super-quiz/levels.js', 'window.SUPER_LEVELS=' + JSON.stringify(levels) + ';\n');
};
