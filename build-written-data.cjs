const fs = require('node:fs'), assert = require('node:assert/strict'), {createHash} = require('node:crypto');
const source = JSON.parse(fs.readFileSync('super-quiz/written-source.json', 'utf8'));
assert.equal(source.questionCount, 80); assert.equal(source.questions.length, 80); assert.equal(new Set(source.questions.map(q => q.id)).size, 80);
for (const q of source.questions) {
  assert(q.prompt && q.answer && q.status && q.section);
  assert(q.page >= 1 && q.page <= source.pages && q.endPage >= q.page && q.endPage <= source.pages);
  assert(q.rubric.required > 0 && q.rubric.required <= q.rubric.points.length);
  for (const point of q.rubric.points) assert(point.label && (point.aliases?.length || point.patterns?.length));
}
delete source.revision;
source.revision = createHash('sha256').update(JSON.stringify(source)).digest('hex').slice(0, 16);
fs.writeFileSync('super-quiz/written-source.json', JSON.stringify(source, null, 2) + '\n');
fs.writeFileSync('super-quiz/written-data.js', 'window.WRITTEN_SOURCE=' + JSON.stringify(source) + ';\n');
console.log('Built ' + source.questionCount + ' PDF-based write-in prompts, revision ' + source.revision);
