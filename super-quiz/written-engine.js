(function (root) {
  'use strict';
  const normalize = text => String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const escape = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  function check(question, answer) {
    const text = String(answer).split(/[.;!?\n]+/).map(normalize).filter(Boolean).join(' | ');
    if (!text) return {status: 'empty', found: [], missing: question.rubric.points.map(p => p.label), required: question.rubric.required, warnings: []};
    const found = [], missing = [], warnings = [];
    for (const point of question.rubric.points) {
      let hit = false;
      if (point.patterns) hit = point.patterns.some(pattern => new RegExp(pattern, 'i').test(text));
      else for (const alias of point.aliases) {
        const pattern = new RegExp('\\b' + escape(normalize(alias)) + '\\b', 'g');
        for (const match of text.matchAll(pattern)) {
          const prefix = text.slice(0, match.index);
          const negated = /\b(?:not|never|no)\s+(?:\w+\s+){0,2}$/.test(prefix);
          if (!negated || /^(?:not|no|without)\b/.test(normalize(alias))) hit = true;
        }
      }
      (hit ? found : missing).push(point.label);
    }
    if (question.id === 'written-067' && (/\brepression\s+(?:is\s+)?conscious\b/.test(text) || /\bsuppression\s+(?:is\s+)?unconscious\b/.test(text))) warnings.push('Check the pairing: the PDF distinguishes unconscious repression from conscious suppression.');
    if (question.id === 'written-068' && (/\bprojection\s+(?:is\s+)?redirect/.test(text) || /\bdisplacement\s+(?:is\s+)?attribut/.test(text))) warnings.push('Check which mechanism attributes feelings and which redirects them.');
    if (question.id === 'written-080' && /\bacute care hospitals?\b/.test(text) && !/\b(?:do not answer|not|excluding|except|no)\s+acute care hospitals?\b/.test(text)) warnings.push('The PDF says to exclude acute care hospitals from this list.');
    return {status: found.length >= question.rubric.required && !warnings.length ? 'covered' : found.length ? 'partial' : 'review', found, missing, required: question.rubric.required, warnings};
  }
  const api = {normalize, check};
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.WrittenChecker = api;
})(typeof window === 'object' ? window : globalThis);
