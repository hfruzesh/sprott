(() => {
  'use strict';
  const bank = window.SUPER_BANK;
  const revision = window.SUPER_REVISION;
  const engine = window.createQuizEngine(bank, revision);
  const app = document.querySelector('#app');
  const storageMessage = document.querySelector('#storage');
  const dialog = document.querySelector('#confirm-dialog');
  const key = 'sprott-super-quiz-v2';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  let attempt = null, fullResult = null, view = 'home', reviewPage = 0, onlyMissed = false;
  let pending = null, returnFocus = null, lastNavigation = {action: '', time: 0}, conflict = false;
  let notice = '';
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
    return `<div class="scroll"><table><thead><tr><th scope="col">Study area</th><th scope="col">Questions</th>${scored ? '<th scope="col">Correct</th><th scope="col">Score</th>' : ''}</tr></thead><tbody>${rows.map(r => `<tr><th scope="row">${escape(r.label)}</th><td>${r.total}</td>${scored ? `<td>${r.correct}</td><td class="${r.correct * 10 >= r.total * 9 ? 'good' : 'bad'}">${(100 * r.correct / r.total).toFixed(1)}%</td>` : ''}</tr>`).join('')}</tbody></table></div>`;
  }
  function home() {
    view = 'home';
    const groups = [...new Set(bank.map(q => q.group))];
    app.innerHTML = `<div class="eyebrow">Every chapter. Closer choices. Careful judgment.</div><h1 id="view-title" tabindex="-1">The Super-Quiz.</h1><p class="lead">758 reviewed questions. Nine study areas. A demanding test of what you can apply.</p>${notice ? `<p class="notice">${escape(notice)}</p>` : ''}<div class="stats"><div><strong>758</strong>questions included</div><div><strong>${window.SUPER_REVISED}</strong>substantive revisions</div><div><strong>90%</strong>target in every topic</div></div><section class="panel"><h2>Full coverage, strict marking</h2><p>Work through every question once, in shuffled order. Answers stay hidden until submission. Unanswered questions earn zero; select-all questions require the exact set. The full challenge requires at least 90% in every chapter and topic.</p><p class="muted">Take breaks when you need. Answers and option order save in this browser. This is a practice target, not an official pass mark.</p><div class="actions">${attempt ? button('resume', attempt.done ? 'View saved results' : 'Resume saved attempt', true) : ''}${button('start', 'Start all 758 questions', !attempt)}${fullResult && fullResult !== attempt ? button('full-result', 'View latest full-quiz result') : ''}</div><form id="focus-form"><label for="group">Focus on one study area</label><div class="actions"><select id="group" name="group">${groups.map(g => `<option>${escape(g)}</option>`).join('')}</select><button type="submit">Start focused practice</button></div></form><p class="muted">A new attempt replaces current progress after confirmation. Focused practice and retries do not earn the full-coverage pass. Your latest full-quiz result is kept during retries.</p></section><h2>Coverage map</h2>${coverageTable(groups.map(g => ({label: g, total: bank.filter(q => q.group === g).length})), false)}<p><a href="REVIEW.md">Question quality and review notes</a> · <a href="COVERAGE.md">Coverage and limits</a></p>`;
  }
  function begin(ids, full) {
    const run = () => {
      attempt = engine.start(ids, full);
      reviewPage = 0; onlyMissed = false; notice = '';
      save(); renderQuestion(); focusHeading();
    };
    if (attempt) confirmAction('Start a new attempt?', 'This replaces your current attempt. Your latest submitted full-quiz result will remain available.', 'Start new attempt', run);
    else run();
  }
  function updateProgress() {
    if (view !== 'question' || !attempt) return;
    const count = engine.answered(attempt);
    document.querySelector('#progress-text').textContent = `${count} of ${attempt.ids.length} answered · Question ${attempt.at + 1} of ${attempt.ids.length}`;
    document.querySelector('#progress').value = count;
    document.querySelector('#unanswered-text').textContent = `${attempt.ids.length - count} unanswered questions will score zero.`;
    document.querySelector('#selection-status').textContent = attempt.answers[attempt.ids[attempt.at]]?.length ? 'Answer recorded for this attempt.' : 'No answer selected.';
    document.querySelector('[data-action="clear"]').disabled = !(attempt.answers[attempt.ids[attempt.at]]?.length);
  }
  function renderQuestion() {
    if (!attempt) {home(); return;}
    if (attempt.done) {renderResults(); return;}
    view = 'question';
    const q = engine.byId.get(attempt.ids[attempt.at]);
    const selected = attempt.answers[q.id] || [];
    const multi = q.answer.length > 1;
    app.innerHTML = `<div class="eyebrow">${attempt.full ? 'Full super-quiz' : 'Focused / retry practice'}</div><p id="progress-text"></p><progress id="progress" max="${attempt.ids.length}" aria-label="Questions answered"></progress><article class="panel"><div class="eyebrow">${escape(q.group)} · ${escape(q.topic)}</div><h2 id="view-title" tabindex="-1">${escape(q.prompt)}</h2><p class="muted">${multi ? 'Select all correct answers. The exact set is required.' : 'Choose the single best answer.'}</p><fieldset><legend class="sr-only">Answer choices</legend>${attempt.orders[q.id].map(i => `<label class="choice"><input type="${multi ? 'checkbox' : 'radio'}" name="answer" data-question="${escape(q.id)}" value="${i}" ${selected.includes(i) ? 'checked' : ''}><span>${escape(q.choices[i])}</span></label>`).join('')}</fieldset><p id="selection-status" class="muted" role="status" aria-live="polite"></p>${button('clear', 'Clear answer', false, !selected.length)}</article><div class="actions">${button('prev', '← Previous', false, attempt.at === 0)}${button('next', 'Next →', true, attempt.at === attempt.ids.length - 1)}${button('home', 'Save & take a break')}</div><form id="jump-form" class="actions"><label for="jump">Go to question</label><input type="number" id="jump" name="jump" min="1" max="${attempt.ids.length}" value="${attempt.at + 1}" required inputmode="numeric"><button type="submit">Go</button>${button('next-unanswered', 'Find next unanswered', false, engine.answered(attempt) === attempt.ids.length)}</form><div class="actions">${button('submit', 'Submit and reveal results')}</div><p class="muted">Answers remain editable until submission. <span id="unanswered-text"></span></p>`;
    updateProgress();
  }
  function move(index) {
    if (!attempt || attempt.done || !Number.isInteger(index) || index < 0 || index >= attempt.ids.length || index === attempt.at) return;
    attempt.at = index; save(); renderQuestion(); focusHeading();
  }
  function safeReference(ref) {
    if (!/^(?:https:\/\/|\.\.\/)/.test(ref.href)) return '';
    return `<a href="${escape(ref.href)}" target="_blank" rel="noopener noreferrer">${escape(ref.title)}</a>`;
  }
  function renderResults() {
    if (!attempt?.done) return;
    view = 'results';
    const result = engine.result(attempt);
    const ids = onlyMissed ? result.missed : attempt.ids;
    const pages = Math.max(1, Math.ceil(ids.length / 20));
    reviewPage = Math.max(0, Math.min(reviewPage, pages - 1));
    const visible = ids.slice(reviewPage * 20, reviewPage * 20 + 20);
    app.innerHTML = `<div class="eyebrow">Attempt complete</div><h1 id="view-title" tabindex="-1">${result.pass ? 'Challenge passed.' : 'Keep sharpening.'}</h1><p class="lead">${result.correct} / ${result.total} correct · ${(100 * result.correct / result.total).toFixed(1)}%</p><p>${result.pass ? 'At least 90% in every chapter and topic across all 758 questions.' : attempt.full ? 'The target is 90% in every chapter and topic. Use the breakdown to identify where to practise next.' : 'This was focused or retry practice. Complete the full 758-question quiz for the full-coverage pass.'}</p><div class="actions">${result.missed.length ? button('retry', 'Retry missed / unanswered', true) : ''}${button('home', 'Return to start')}${button('export', 'Download this result')}${fullResult && !attempt.full ? button('full-result', 'View latest full-quiz result') : ''}</div><h2>Chapter results</h2>${coverageTable(result.chapters)}<details><summary>Inspect every topic</summary>${coverageTable(result.topics)}</details><h2>Answer review</h2><div class="actions">${button('review-filter', onlyMissed ? 'Show all answers' : 'Show missed / unanswered only', false, !result.missed.length)}<span>${ids.length ? `${reviewPage * 20 + 1}–${Math.min(ids.length, (reviewPage + 1) * 20)} of ${ids.length}` : 'No missed answers'}</span></div><section id="answer-review">${visible.map(id => {
      const q = engine.byId.get(id), selected = attempt.answers[id] || [];
      return `<details><summary><span class="${engine.isCorrect(attempt, id) ? 'good' : 'bad'}">${engine.isCorrect(attempt, id) ? 'Correct' : 'Missed'}</span> · ${attempt.ids.indexOf(id) + 1}. ${escape(q.prompt)}</summary><p><b>Your answer:</b> ${selected.length ? selected.map(n => escape(q.choices[n])).join('; ') : 'Unanswered'}</p><p><b>Correct:</b> ${q.answer.map(n => escape(q.choices[n])).join('; ')}</p><p>${escape(q.explain)}</p>${(q.why || []).filter(w => selected.some(n => q.choices[n] === w.choice)).map(w => `<p>${escape(w.text)}</p>`).join('')}<p class="muted">${escape(q.group)} · ${escape(q.topic)}<br>${escape(q.source)}${q.slideClaim ? '<br>Slide-reported claim; not independently verified.' : ''}<br>Source ID: ${escape(q.originalId)}</p>${q.references?.length ? `<p>${q.references.map(safeReference).filter(Boolean).join(' · ')}</p>` : ''}</details>`;
    }).join('')}</section><div class="actions">${button('review-prev', '← Previous review page', false, reviewPage === 0)}<span>Page ${reviewPage + 1} of ${pages}</span>${button('review-next', 'Next review page →', false, reviewPage === pages - 1)}</div>`;
  }
  function downloadResult() {
    if (!attempt?.done) return;
    try {
      const result = engine.result(attempt);
      const body = {date: new Date().toISOString(), revision, full: attempt.full, total: result.total, correct: result.correct, pass: result.pass, chapters: result.chapters, topics: result.topics, questions: attempt.ids.map(id => ({id, chapter: engine.byId.get(id).group, topic: engine.byId.get(id).topic, correct: engine.isCorrect(attempt, id), selected: (attempt.answers[id] || []).map(n => engine.byId.get(id).choices[n])}))};
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
      save(); updateProgress();
      document.querySelector('[data-action="next-unanswered"]').disabled = engine.answered(attempt) === attempt.ids.length;
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
    if (action === 'start' && view === 'home') begin(bank.map(q => q.id), true);
    if (action === 'resume' && view === 'home') {renderQuestion(); focusHeading();}
    if (action === 'home') {save(); home(); focusHeading();}
    if (action === 'full-result' && fullResult) {
      const restore = () => {attempt = JSON.parse(JSON.stringify(fullResult)); reviewPage = 0; onlyMissed = false; save(); renderResults(); focusHeading();};
      if (attempt && !attempt.done) confirmAction('Leave this practice attempt?', 'Your latest full-quiz result will replace the current focused or retry attempt.', 'View full-quiz result', restore);
      else restore();
    }
    if (view === 'question' && attempt && !attempt.done) {
      if (action === 'clear') {
        engine.answer(attempt, attempt.ids[attempt.at], []);
        app.querySelectorAll('input[name="answer"]').forEach(input => {input.checked = false;});
        save(); updateProgress(); document.querySelector('[data-action="next-unanswered"]').disabled = false;
      }
      if (action === 'prev' || action === 'next') move(attempt.at + (action === 'next' ? 1 : -1));
      if (action === 'next-unanswered') {
        for (let offset = 1; offset <= attempt.ids.length; offset++) {
          const index = (attempt.at + offset) % attempt.ids.length;
          if (!attempt.answers[attempt.ids[index]]?.length) {move(index); break;}
        }
      }
      if (action === 'submit') confirmAction('Submit this attempt?', `${attempt.ids.length - engine.answered(attempt)} unanswered questions will earn zero. Answers will be revealed and this attempt will no longer be editable.`, 'Submit and reveal answers', () => {
        attempt.done = true; attempt.finished = new Date().toISOString();
        if (attempt.full) fullResult = JSON.parse(JSON.stringify(attempt));
        reviewPage = 0; onlyMissed = false; save(); renderResults(); focusHeading();
      });
    }
    if (view === 'results') {
      if (action === 'retry') begin(engine.result(attempt).missed, false);
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
