(() => {
  'use strict';
  const bank = window.SUPER_BANK;
  const revision = window.SUPER_REVISION;
  const levels = window.SUPER_LEVELS || [];
  const engine = window.createQuizEngine(bank, revision, levels);
  const app = document.querySelector('#app');
  const storageMessage = document.querySelector('#storage');
  const dialog = document.querySelector('#confirm-dialog');
  const key = 'sprott-super-quiz-v2';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  let attempt = null, fullResult = null, view = 'home', reviewPage = 0, onlyMissed = false;
  let pending = null, returnFocus = null, lastNavigation = {action: '', time: 0}, conflict = false;
  let notice = '';
  let writtenCleanup = null;
  const button = (action, label, primary = false, disabled = false) => `<button type="button" data-action="${action}" ${primary ? 'class="primary"' : ''} ${disabled ? 'disabled' : ''}>${label}</button>`;

  function load() {
    attempt = null; fullResult = null;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        if (localStorage.getItem('sprott-super-quiz-v1')) notice = 'The questions have been revised. Your older saved attempt remains stored separately; start a fresh attempt with this version.';
        return;
      }
      const saved = JSON.parse(raw);
      if (saved.revision !== revision || saved.version !== 2) {
        notice = 'The question bank has changed. Start a new attempt so older answers are not marked against revised questions.';
        return;
      }
      if (saved.attempt && engine.valid(saved.attempt)) attempt = saved.attempt;
      if (saved.fullResult && engine.valid(saved.fullResult) && saved.fullResult.done && saved.fullResult.full) fullResult = saved.fullResult;
      if ((saved.attempt && !attempt) || (saved.fullResult && !fullResult)) notice = 'Some saved progress was incomplete or invalid and could not be restored. You can start a new attempt.';
    } catch {
      notice = 'Saved progress could not be read. You can still practise; starting an attempt will create a new save.';
    }
  }
  function save() {
    if (conflict) return;
    try {
      localStorage.setItem(key, JSON.stringify({version: 2, revision, attempt, fullResult}));
      storageMessage.textContent = '';
    } catch {
      storageMessage.textContent = 'Progress could not be saved. Keep this tab open; leaving or reloading may lose this attempt.';
    }
  }
  function focusHeading() {
    const target = document.querySelector('#view-title');
    target?.focus({preventScroll: true});
    target?.scrollIntoView({block: 'start', behavior: 'instant'});
  }
  function confirmAction(title, message, label, callback) {
    if (pending) return;
    returnFocus = document.activeElement;
    pending = callback;
    document.querySelector('#confirm-title').textContent = title;
    document.querySelector('#confirm-message').textContent = message;
    document.querySelector('#confirm-accept').textContent = label;
    dialog.showModal();
    document.querySelector('#confirm-cancel').focus();
  }
  function cancelDialog() {
    pending = null;
    dialog.close();
    if (returnFocus?.isConnected) returnFocus.focus();
  }
  document.querySelector('#confirm-cancel').addEventListener('click', cancelDialog);
  dialog.addEventListener('cancel', event => {event.preventDefault(); cancelDialog();});
  document.querySelector('#confirm-accept').addEventListener('click', () => {
    const callback = pending;
    pending = null;
    dialog.close();
    if (callback) callback();
  });

  function coverageTable(rows, scored = true) {
    return `<div class="scroll"><table><thead><tr><th scope="col">Study area</th><th scope="col">Questions</th>${scored ? '<th scope="col">Explored</th><th scope="col">Coverage</th>' : ''}</tr></thead><tbody>${rows.map(r => `<tr><th scope="row">${escape(r.label)}</th><td>${r.total}</td>${scored ? `<td>${r.correct}</td><td class="${r.correct === r.total ? 'good' : 'muted'}">${(100 * r.correct / r.total).toFixed(1)}%</td>` : ''}</tr>`).join('')}</tbody></table></div>`;
  }
  function home() {
    if (writtenCleanup) {writtenCleanup(); writtenCleanup = null;}
    view = 'home';
    const groups = [...new Set(bank.map(q => q.group))];
    app.innerHTML = `<div class="eyebrow">Learn the answer. Understand the distinction.</div><h1 id="view-title" tabindex="-1">The Super-Quiz.</h1><p class="lead">758 original questions with immediate teaching, explanations for every choice and study references.</p>${notice ? `<p class="notice">${escape(notice)}</p>` : ''}<div class="stats"><div><strong>758</strong>questions included</div><div><strong>758 / 758</strong>original pairings matched</div><div><strong>2,915</strong>answer-choice lessons</div></div><section aria-label="Study levels" class="level-grid"><article class="panel"><div class="eyebrow">Level 1 · Intensive</div><h2>Hardest 100</h2><p>Advanced rounds, integrated scenarios and close distinctions.</p>${button('start100', 'Start hardest 100', true)}</article><article class="panel"><div class="eyebrow">Level 2 · Broad practice</div><h2>Broad 400</h2><p>The hardest 100, plus wider practice across every study area.</p>${button('start400', 'Start 400 questions', true)}</article><article class="panel"><div class="eyebrow">Level 3 · Complete</div><h2>All 758</h2><p>Every original question. Nothing sampled out.</p>${button('start', 'Start all 758 questions', true)}</article></section><p class="muted">The 100-question set is selected by question design, using the original advanced rounds and scenarios. Difficulty is a judgment, not measured exam statistics. Each attempt shuffles its selected set.</p><section class="panel"><h2>Written recall from your PDF</h2><p>Practise 80 write-in questions with key-point checks, the PDF model answers, and your own final assessment. Your drafts save separately from the multiple-choice quiz.</p>${button('open-written', 'Open written practice', true)}</section><section class="panel"><h2>Learn as you go</h2><p>Choose an answer and learn immediately. You will see the correct response, why it fits, where to study it, and how each alternative differs. For select-all questions, choose your set and press “Check my answer.”</p><p class="muted">Take breaks when you need. You can compare choices and revisit lessons without a pass/fail target. Answers, lessons explored and option order save in this browser.</p><div class="actions">${attempt ? button('resume', attempt.done ? 'View study summary' : 'Resume saved attempt', true) : ''}${fullResult && fullResult !== attempt ? button('full-result', 'View latest full-study summary') : ''}</div><form id="focus-form"><label for="group">Focus on one study area</label><div class="actions"><select id="group" name="group">${groups.map(g => `<option>${escape(g)}</option>`).join('')}</select><button type="submit">Start focused practice</button></div></form><p class="muted">A new attempt replaces current progress after confirmation. Your latest complete-study summary is kept while you revisit material.</p></section><h2>Coverage map</h2>${coverageTable(groups.map(g => ({label: g, total: bank.filter(q => q.group === g).length})), false)}<p><a href="REVIEW.md">Original-material verification</a> · <a href="COVERAGE.md">Coverage and limits</a></p>`;
  }
  function begin(ids, full, level = null) {
    const run = () => {
      attempt = engine.start(ids, full, level);
      attempt.lessonAnswers = {};
      reviewPage = 0; onlyMissed = false; notice = '';
      save(); renderQuestion(); focusHeading();
    };
    if (attempt) confirmAction('Start a new attempt?', 'This replaces your current attempt. Your latest full-study summary will remain available.', 'Start new attempt', run);
    else run();
  }
  function updateProgress() {
    if (view !== 'question' || !attempt) return;
    const count = engine.explored(attempt);
    document.querySelector('#progress-text').textContent = `${count} of ${attempt.ids.length} lessons explored · Question ${attempt.at + 1} of ${attempt.ids.length}`;
    document.querySelector('#progress').value = count;
    document.querySelector('#unanswered-text').textContent = `${attempt.ids.length - count} lessons remain to explore. No marks are lost for taking time to learn.`;
    const id = attempt.ids[attempt.at], hasChoice = attempt.answers[id]?.length, multi = engine.byId.get(id).answer.length > 1;
    document.querySelector('#selection-status').textContent = hasChoice ? (multi && !engine.lessonVisible(attempt, id) ? 'Choices saved. Press Check my answer when you are ready.' : 'Choice saved. Read the lesson or compare another answer.') : 'Choose an answer, or open the lesson to study it first.';
    document.querySelector('[data-action="clear"]').disabled = !(attempt.answers[attempt.ids[attempt.at]]?.length);
  }
  function renderQuestion() {
    if (!attempt) {home(); return;}
    if (attempt.done) {renderResults(); return;}
    view = 'question';
    const q = engine.byId.get(attempt.ids[attempt.at]);
    const selected = attempt.answers[q.id] || [];
    const multi = q.answer.length > 1;
    app.innerHTML = `<div class="eyebrow">${levels.find(level => level.id === attempt.level)?.title || (attempt.full ? 'Full super-quiz' : 'Focused / retry practice')}</div><p id="progress-text"></p><progress id="progress" max="${attempt.ids.length}" aria-label="Lessons explored"></progress><article class="panel"><div class="eyebrow">${escape(q.group)} · ${escape(q.topic)}</div><h2 id="view-title" tabindex="-1">${escape(q.prompt)}</h2><p class="muted">${multi ? 'Select all answers that fit, then check the teaching lesson.' : 'Choose the best answer to explore its reasoning.'}</p><fieldset><legend class="sr-only">Answer choices</legend>${attempt.orders[q.id].map(i => `<label class="choice"><input type="${multi ? 'checkbox' : 'radio'}" name="answer" data-question="${escape(q.id)}" value="${i}" ${selected.includes(i) ? 'checked' : ''}><span>${escape(q.choices[i])}</span></label>`).join('')}</fieldset><p id="selection-status" class="muted" role="status" aria-live="polite"></p>${button('clear', 'Clear answer', false, !selected.length)}${multi ? button('check-answer', 'Check my answer', true, !selected.length) : ''}${button('show-lesson', 'Open the teaching lesson')}</article><div id="lesson-slot" aria-live="polite">${engine.lessonVisible(attempt, q.id) ? window.renderTeachingLesson(q, selected, bank, window.TEACHING) : ''}</div><div class="actions">${button('prev', '← Previous', false, attempt.at === 0)}${button('next', 'Next →', true, attempt.at === attempt.ids.length - 1)}${button('home', 'Save & take a break')}</div><form id="jump-form" class="actions"><label for="jump">Go to question</label><input type="number" id="jump" name="jump" min="1" max="${attempt.ids.length}" value="${attempt.at + 1}" required inputmode="numeric"><button type="submit">Go</button>${button('next-unanswered', 'Find next unstudied lesson', false, engine.explored(attempt) === attempt.ids.length)}</form><div class="actions">${button('submit', 'Finish and review learning')}</div><p class="muted">You can change choices to compare explanations. <span id="unanswered-text"></span></p>`;
    updateProgress();
  }
  function renderLessonSlot() {
    if (view !== 'question') return;
    const id = attempt.ids[attempt.at], q = engine.byId.get(id), selected = attempt.answers[id] || [];
    document.querySelector('#lesson-slot').innerHTML = engine.lessonVisible(attempt, id) ? window.renderTeachingLesson(q, selected, bank, window.TEACHING) : '';
    const check = document.querySelector('[data-action="check-answer"]'); if (check) check.disabled = !selected.length;
    document.querySelector('[data-action="next-unanswered"]').disabled = engine.explored(attempt) === attempt.ids.length;
  }
  function move(index) {
    if (!attempt || attempt.done || !Number.isInteger(index) || index < 0 || index >= attempt.ids.length || index === attempt.at) return;
    attempt.at = index; save(); renderQuestion(); focusHeading();
  }
  function safeReference(ref) {
    if (!/^(?:https:\/\/|\.\.\/)/.test(ref.href)) return '';
    return `<a href="${escape(ref.href)}" target="_blank" rel="noopener noreferrer">${escape(ref.title)}</a>`;
  }
  function needsReview() {
    return attempt.ids.filter(id => !Object.hasOwn(attempt.lessonAnswers || {}, id) || !engine.exact(attempt.lessonAnswers[id], engine.byId.get(id).answer));
  }
  function renderResults() {
    if (!attempt?.done) return;
    view = 'results';
    const result = {...engine.result(attempt), missed: needsReview()};
    const ids = onlyMissed ? result.missed : attempt.ids;
    const pages = Math.max(1, Math.ceil(ids.length / 20));
    reviewPage = Math.max(0, Math.min(reviewPage, pages - 1));
    const visible = ids.slice(reviewPage * 20, reviewPage * 20 + 20);
    app.innerHTML = `<div class="eyebrow">Study summary</div><h1 id="view-title" tabindex="-1">Study round complete.</h1><p class="lead">${engine.explored(attempt)} / ${result.total} lessons explored</p><p>Use the lessons below to consolidate what you learned. This is a study summary, not a pass/fail result.</p><div class="actions">${result.missed.length ? button('retry', 'Revisit answers to strengthen', true) : ''}${button('home', 'Return to start')}${button('export', 'Download study summary')}${fullResult && !attempt.full ? button('full-result', 'View latest full-study summary') : ''}</div><h2>Study coverage</h2>${coverageTable(result.chapters.map(row => ({...row, correct: attempt.ids.filter(id => engine.byId.get(id).group === row.label && Object.hasOwn(attempt.lessonAnswers || {}, id)).length})), true)}<p class="muted">Coverage counts lessons explored, rather than grading your ability.</p><h2>Answer review</h2><div class="actions">${button('review-filter', onlyMissed ? 'Show all answers' : 'Show items to revisit only', false, !result.missed.length)}<span>${ids.length ? `${reviewPage * 20 + 1}–${Math.min(ids.length, (reviewPage + 1) * 20)} of ${ids.length}` : 'No items currently flagged for review'}</span></div><section id="answer-review">${visible.map(id => {
      const q = engine.byId.get(id), selected = attempt.answers[id] || [];
      return `<details><summary>${attempt.ids.indexOf(id) + 1}. ${escape(q.prompt)}</summary>${window.renderTeachingLesson(q, selected, bank, window.TEACHING)}</details>`;
    }).join('')}</section><div class="actions">${button('review-prev', '← Previous review page', false, reviewPage === 0)}<span>Page ${reviewPage + 1} of ${pages}</span>${button('review-next', 'Next review page →', false, reviewPage === pages - 1)}</div>`;
  }
  function downloadResult() {
    if (!attempt?.done) return;
    try {
      const result = engine.result(attempt);
      const body = {mode: 'instructional', lessonsExplored: engine.explored(attempt), date: new Date().toISOString(), revision, full: attempt.full, total: result.total, needsReview: result.missed, questions: attempt.ids.map(id => ({id, chapter: engine.byId.get(id).group, topic: engine.byId.get(id).topic, prompt: engine.byId.get(id).prompt, source: engine.byId.get(id).source, lesson: engine.byId.get(id).explain, explored: Object.hasOwn(attempt.lessonAnswers || {}, id), correctAnswer: engine.byId.get(id).answer.map(n => engine.byId.get(id).choices[n]), selected: (attempt.answers[id] || []).map(n => engine.byId.get(id).choices[n])}))};
      const url = URL.createObjectURL(new Blob([JSON.stringify(body, null, 2)], {type: 'application/json'}));
      const link = document.createElement('a'); link.href = url; link.download = 'sprott-super-quiz-result.json';
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {storageMessage.textContent = 'The result download could not be started. Your result remains available on this page.';}
  }
  app.addEventListener('change', event => {
    if (conflict || pending || view !== 'question' || attempt?.done || event.target.name !== 'answer') return;
    const id = event.target.dataset.question;
    if (id !== attempt.ids[attempt.at]) return;
    const selected = [...app.querySelectorAll('input[name="answer"]:checked')].map(input => Number(input.value));
    if (engine.answer(attempt, id, selected)) {
      if (engine.byId.get(id).answer.length === 1) engine.teach(attempt, id);
      save(); updateProgress(); renderLessonSlot();
      document.querySelector('[data-action="next-unanswered"]').disabled = engine.explored(attempt) === attempt.ids.length;
    }
  });
  app.addEventListener('submit', event => {
    event.preventDefault();
    if (pending || conflict) return;
    if (event.target.id === 'focus-form' && view === 'home') {
      const group = document.querySelector('#group').value;
      begin(bank.filter(q => q.group === group).map(q => q.id), false);
    }
    if (event.target.id === 'jump-form' && view === 'question') {
      const input = document.querySelector('#jump');
      if (input.reportValidity()) move(Number(input.value) - 1);
    }
  });
  app.addEventListener('click', event => {
    const control = event.target.closest('[data-action]');
    if (!control || control.disabled || pending || conflict) return;
    const action = control.dataset.action;
    if (['prev', 'next', 'next-unanswered', 'review-prev', 'review-next'].includes(action)) {
      const now = performance.now();
      if (event.detail > 1 || (lastNavigation.action === action && now - lastNavigation.time < 180)) return;
      lastNavigation = {action, time: now};
    }
    if (action === 'start' && view === 'home') begin(bank.map(q => q.id), true, 'all758');
    if (action === 'start100' && view === 'home') {const level = levels.find(level => level.id === 'hard100'); begin(level.ids, false, level.id);}
    if (action === 'start400' && view === 'home') {const level = levels.find(level => level.id === 'broad400'); begin(level.ids, false, level.id);}
    if (action === 'open-written' && view === 'home') {
      view = 'written'; app.innerHTML = '<section id="written-app"></section>';
      writtenCleanup = window.mountWrittenQuiz(document.querySelector('#written-app'), () => {home(); focusHeading();});
    }
    if (action === 'resume' && view === 'home') {renderQuestion(); focusHeading();}
    if (action === 'home') {save(); home(); focusHeading();}
    if (action === 'full-result' && fullResult) {
      const restore = () => {attempt = JSON.parse(JSON.stringify(fullResult)); reviewPage = 0; onlyMissed = false; save(); renderResults(); focusHeading();};
      if (attempt && !attempt.done) confirmAction('Leave this practice attempt?', 'Your latest full-study summary will replace the current focused or retry attempt.', 'View full-study summary', restore);
      else restore();
    }
    if (view === 'question' && attempt && !attempt.done) {
      if (action === 'check-answer' || action === 'show-lesson') {
        if (action === 'check-answer' && !attempt.answers[attempt.ids[attempt.at]]?.length) return;
        engine.teach(attempt, attempt.ids[attempt.at]); save(); updateProgress(); renderLessonSlot();
        const lesson = document.querySelector('.teaching-panel'); lesson?.focus({preventScroll: true}); lesson?.scrollIntoView({block: 'start'});
      }
      if (action === 'clear') {
        engine.answer(attempt, attempt.ids[attempt.at], []);
        app.querySelectorAll('input[name="answer"]').forEach(input => {input.checked = false;});
        save(); updateProgress(); renderLessonSlot(); document.querySelector('[data-action="next-unanswered"]').disabled = engine.explored(attempt) === attempt.ids.length;
      }
      if (action === 'prev' || action === 'next') move(attempt.at + (action === 'next' ? 1 : -1));
      if (action === 'next-unanswered') {
        for (let offset = 1; offset <= attempt.ids.length; offset++) {
          const index = (attempt.at + offset) % attempt.ids.length;
          if (!Object.hasOwn(attempt.lessonAnswers || {}, attempt.ids[index])) {move(index); break;}
        }
      }
      if (action === 'submit') confirmAction('Finish this study round?', `${engine.explored(attempt)} of ${attempt.ids.length} lessons have been explored. You can review every explanation in the summary or keep studying now.`, 'Finish study round', () => {
        attempt.done = true; attempt.finished = new Date().toISOString();
        if (attempt.full) fullResult = JSON.parse(JSON.stringify(attempt));
        reviewPage = 0; onlyMissed = false; save(); renderResults(); focusHeading();
      });
    }
    if (view === 'results') {
      if (action === 'retry') begin(needsReview(), false);
      if (action === 'export') downloadResult();
      if (action === 'review-filter') {onlyMissed = !onlyMissed; reviewPage = 0; renderResults(); document.querySelector('#answer-review')?.scrollIntoView({block: 'start'});}
      if (action === 'review-prev' || action === 'review-next') {reviewPage += action === 'review-next' ? 1 : -1; renderResults(); document.querySelector('#answer-review')?.scrollIntoView({block: 'start'});}
    }
  });
  window.addEventListener('storage', event => {
    if ((event.key !== key && event.key !== null) || !attempt) return;
    conflict = true;
    if (pending) cancelDialog();
    app.querySelectorAll('button,input,select').forEach(control => {control.disabled = true;});
    storageMessage.textContent = 'Another tab changed the saved attempt. Reload this tab to use the latest saved progress before continuing.';
    const reload = document.createElement('button'); reload.type = 'button'; reload.textContent = 'Load latest saved progress';
    reload.addEventListener('click', () => {conflict = false; notice = ''; load(); storageMessage.textContent = ''; home(); focusHeading();});
    storageMessage.appendChild(reload);
  });
  load(); home();
})();
