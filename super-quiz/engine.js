(function (root) {
  'use strict';
  function createEngine(bank, revision) {
    const byId = new Map(bank.map(q => [q.id, q]));
    const exact = (a, b) => Array.isArray(a) && a.length === b.length && new Set(a).size === a.length && a.every(n => b.includes(n));
    const shuffle = (items, random = Math.random) => {
      const out = [...items];
      for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
      }
      return out;
    };
    function valid(attempt) {
      if (!attempt || attempt.revision !== revision || typeof attempt.full !== 'boolean' || typeof attempt.done !== 'boolean') return false;
      const ids = attempt.ids;
      if (!Array.isArray(ids) || !ids.length || new Set(ids).size !== ids.length || ids.some(id => !byId.has(id))) return false;
      if (attempt.full && (ids.length !== bank.length || bank.some(q => !ids.includes(q.id)))) return false;
      if (!Number.isInteger(attempt.at) || attempt.at < 0 || attempt.at >= ids.length) return false;
      if (!attempt.answers || typeof attempt.answers !== 'object' || Array.isArray(attempt.answers) || !attempt.orders || typeof attempt.orders !== 'object') return false;
      if (Object.keys(attempt.orders).length !== ids.length || ids.some(id => !exact(attempt.orders[id], byId.get(id).choices.map((_, i) => i)))) return false;
      for (const [id, values] of Object.entries(attempt.answers)) {
        if (!ids.includes(id) || !Array.isArray(values) || new Set(values).size !== values.length) return false;
        const q = byId.get(id);
        if (values.some(n => !Number.isInteger(n) || n < 0 || n >= q.choices.length) || (q.answer.length === 1 && values.length > 1)) return false;
      }
      return true;
    }
    function start(ids, full = false) {
      if (!ids.length || new Set(ids).size !== ids.length || ids.some(id => !byId.has(id))) throw new Error('Invalid question set');
      const attempt = {revision, full, done: false, at: 0, ids: shuffle(ids), orders: {}, answers: {}, started: new Date().toISOString()};
      for (const id of ids) attempt.orders[id] = shuffle(byId.get(id).choices.map((_, i) => i));
      if (!valid(attempt)) throw new Error('Invalid full-coverage attempt');
      return attempt;
    }
    function answer(attempt, id, values) {
      if (attempt.done || id !== attempt.ids[attempt.at]) return false;
      const q = byId.get(id);
      if (!Array.isArray(values) || new Set(values).size !== values.length || values.some(i => !Number.isInteger(i) || i < 0 || i >= q.choices.length) || (q.answer.length === 1 && values.length > 1)) return false;
      attempt.answers[id] = [...values];
      return true;
    }
    const isCorrect = (attempt, id) => exact(attempt.answers[id] || [], byId.get(id).answer);
    const answered = attempt => attempt.ids.filter(id => attempt.answers[id]?.length).length;
    function result(attempt) {
      const chapters = new Map(), topics = new Map();
      let correct = 0;
      const missed = [];
      for (const id of attempt.ids) {
        const q = byId.get(id), hit = isCorrect(attempt, id);
        if (hit) correct++; else missed.push(id);
        for (const [map, key] of [[chapters, q.group], [topics, q.group + ' · ' + q.topic]]) {
          if (!map.has(key)) map.set(key, {label: key, total: 0, correct: 0});
          const row = map.get(key); row.total++; if (hit) row.correct++;
        }
      }
      const rows = [...chapters.values(), ...topics.values()];
      return {correct, total: attempt.ids.length, missed, chapters: [...chapters.values()], topics: [...topics.values()], pass: attempt.full && attempt.ids.length === bank.length && rows.every(r => r.correct * 10 >= r.total * 9)};
    }
    return {byId, exact, shuffle, valid, start, answer, isCorrect, answered, result};
  }
  if (typeof module === 'object' && module.exports) module.exports = createEngine;
  else root.createQuizEngine = createEngine;
})(typeof window === 'object' ? window : globalThis);
