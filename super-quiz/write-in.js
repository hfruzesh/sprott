(() => {
  'use strict';
  window.mountWrittenQuiz = function (root, onExit) {
    const source = window.WRITTEN_SOURCE, checker = window.WrittenChecker;
    const byId = new Map(source.questions.map(q => [q.id, q]));
    const key = 'sprott-written-' + source.revision;
    const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
    let data = {at: 0, records: {}}, ids = source.questions.map(q => q.id), filter = 'all';
    let message = '', locked = false;
    try {
      const saved = JSON.parse(localStorage.getItem(key) || 'null');
      if (saved && Number.isInteger(saved.at) && saved.at >= 0 && saved.at < ids.length && saved.records && typeof saved.records === 'object' && !Array.isArray(saved.records)) {
        for (const [id, record] of Object.entries(saved.records)) if (byId.has(id) && typeof record.text === 'string' && record.text.length <= 6000) data.records[id] = {text: record.text, checked: record.checked === true, revealed: record.revealed === true, rating: ['complete', 'work'].includes(record.rating) ? record.rating : null};
        data.at = saved.at;
        if (typeof saved.currentId === 'string' && ids.includes(saved.currentId)) data.at = ids.indexOf(saved.currentId);
      }
    } catch {message = 'Saved written practice could not be loaded. You can continue with a fresh record.';}
    const record = () => data.records[ids[data.at]] || (data.records[ids[data.at]] = {text: '', checked: false, revealed: false, rating: null});
    function save() {
      data.currentId = ids[data.at];
      try {localStorage.setItem(key, JSON.stringify(data)); message = '';}
      catch {message = 'Your written answers could not be saved. Keep this tab open to retain this session.';}
      const status = root.querySelector('#written-storage'); if (status) status.textContent = message;
    }
    function feedback() {
      const q = byId.get(ids[data.at]), r = record();
      if (!r.revealed) return '';
      const result = r.checked ? checker.check(q, r.text) : null;
      return `<section class="panel" id="written-feedback" aria-live="polite">${result ? `<h3>${result.status === 'covered' ? 'Checklist target reached — review the meaning' : 'Compare and strengthen your answer'}</h3><p>${result.found.length} of ${q.rubric.points.length} key points detected. Local practice target: ${result.required}.</p>${result.warnings.map(w => `<p class="bad">${esc(w)}</p>`).join('')}<ul>${q.rubric.points.map(p => `<li>${result.found.includes(p.label) ? '✓ Detected:' : '○ Review:'} ${esc(p.label)}</li>`).join('')}</ul>` : '<h3>Model answer revealed</h3>'}<p><b>PDF model answer:</b> ${esc(q.answer)}</p><p class="muted">${esc(q.source)} · page ${q.page}${q.endPage !== q.page ? '–' + q.endPage : ''}<br>PDF label: ${esc(q.status)}</p><p class="muted">This checks phrases and key points on your device, not the full meaning of your answer. A missing point may be validly worded differently; detected terms may still be used incorrectly. Compare with the model before assessing yourself. Checklist targets are practice aids, not official marks.</p><div class="actions"><button type="button" data-written="rate-complete" aria-pressed="${r.rating === 'complete'}">My answer is complete</button><button type="button" data-written="rate-work" aria-pressed="${r.rating === 'work'}">Needs more work</button></div></section>`;
    }
    function updateCounts() {
      const rows = Object.values(data.records), count = rows.filter(r => r.text.trim()).length;
      root.querySelector('#written-counts').textContent = `${count} of ${source.questionCount} drafted · ${rows.filter(r => r.checked).length} checked · ${rows.filter(r => r.rating === 'work').length} marked for review`;
    }
    function render(focus = false) {
      data.at = Math.max(0, Math.min(data.at, ids.length - 1));
      const q = byId.get(ids[data.at]), r = record();
      root.innerHTML = `<div class="eyebrow">PDF-based written recall · checked on this device</div><h1 id="written-title" tabindex="-1">Write it from memory.</h1><p id="written-counts"></p><p class="muted">No account or internet is needed. The 80 prompts and model answers come from your supplied PDF and are separate from the 758-question bank.</p><div class="actions"><button type="button" data-written="exit">← Study choices</button><button type="button" data-written="flagged">Practise answers needing work</button><button type="button" data-written="all">All 80 written questions</button><button type="button" data-written="export">Download written practice</button></div><p class="muted">${filter === 'flagged' ? 'Reviewing only answers you marked “Needs more work”.' : 'All PDF questions.'}</p><article class="panel"><div class="eyebrow">${esc(q.section)} · ${data.at + 1} / ${ids.length}</div><h2>${esc(q.prompt)}</h2><p class="muted">Source: PDF page ${q.page} · ${esc(q.status)}</p><label for="written-answer">Your answer</label><textarea id="written-answer" rows="8" maxlength="6000" placeholder="Write the answer in your own words…">${esc(r.text)}</textarea><div class="actions"><button type="button" class="primary" data-written="check" ${!r.text.trim() ? 'disabled' : ''}>Check key points</button><button type="button" data-written="reveal">Reveal PDF model answer</button><button type="button" data-written="clear" ${!r.text ? 'disabled' : ''}>Clear answer</button></div></article><div id="feedback-slot">${feedback()}</div><div class="actions"><button type="button" data-written="prev" ${data.at === 0 ? 'disabled' : ''}>← Previous written question</button><button type="button" data-written="next" ${data.at === ids.length - 1 ? 'disabled' : ''}>Next written question →</button></div><form id="written-jump"><label for="written-number">Go to written question</label><div class="actions"><input id="written-number" type="number" min="1" max="${ids.length}" value="${data.at + 1}" required><button type="submit">Go</button></div></form><p id="written-storage" role="status">${esc(message)}</p>`;
      updateCounts();
      if (focus) root.querySelector('#written-title').focus({preventScroll: true});
    }
    root.oninput = event => {
      if (locked) return;
      if (event.target.id !== 'written-answer') return;
      const r = record(); r.text = event.target.value; r.checked = false; r.revealed = false; r.rating = null;
      root.querySelector('#feedback-slot').innerHTML = '';
      root.querySelector('[data-written="check"]').disabled = !r.text.trim();
      root.querySelector('[data-written="clear"]').disabled = !r.text;
      updateCounts(); save();
    };
    let last = {action: '', time: 0};
    root.onclick = event => {
      if (locked) return;
      const button = event.target.closest('[data-written]'); if (!button || button.disabled) return;
      const action = button.dataset.written;
      if (['prev', 'next'].includes(action)) {
        const now = performance.now(); if (event.detail > 1 || (last.action === action && now - last.time < 180)) return;
        last = {action, time: now};
      }
      if (action === 'exit') {save(); cleanup(); onExit(); return;}
      if (action === 'check') {if (!record().text.trim()) return; record().checked = true; record().revealed = true; save(); root.querySelector('#feedback-slot').innerHTML = feedback(); updateCounts();}
      if (action === 'reveal') {record().revealed = true; save(); root.querySelector('#feedback-slot').innerHTML = feedback();}
      if (action === 'rate-complete' || action === 'rate-work') {record().rating = action === 'rate-complete' ? 'complete' : 'work'; save(); root.querySelector('#feedback-slot').innerHTML = feedback(); updateCounts();}
      if (action === 'clear') {data.records[ids[data.at]] = {text: '', checked: false, revealed: false, rating: null}; save(); render(); root.querySelector('#written-answer').focus();}
      if (action === 'prev' || action === 'next') {data.at = Math.max(0, Math.min(ids.length - 1, data.at + (action === 'next' ? 1 : -1))); save(); render(true);}
      if (action === 'all' || action === 'flagged') {
        const next = source.questions.map(q => q.id).filter(id => action === 'all' || data.records[id]?.rating === 'work');
        if (!next.length) {root.querySelector('#written-storage').textContent = 'No answers are marked “Needs more work” yet.'; return;}
        ids = next; filter = action === 'all' ? 'all' : 'flagged'; data.at = 0; render(true);
      }
      if (action === 'export') {
        try {
          const blob = new Blob([JSON.stringify({source: source.file, sourceSha256: source.sha256, revision: source.revision, date: new Date().toISOString(), answers: source.questions.filter(q => data.records[q.id]).map(q => ({id: q.id, prompt: q.prompt, page: q.page, answer: data.records[q.id].text, selfAssessment: data.records[q.id].rating, feedback: checker.check(q, data.records[q.id].text)}))}, null, 2)], {type: 'application/json'});
          const url = URL.createObjectURL(blob), link = document.createElement('a'); link.href = url; link.download = 'sprott-written-practice.json'; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch {root.querySelector('#written-storage').textContent = 'The download could not be started. Your answers remain on this page.';}
      }
    };
    root.onsubmit = event => {if (event.target.id !== 'written-jump') return; event.preventDefault(); if (locked) return; const input = root.querySelector('#written-number'); if (input.reportValidity()) {data.at = Number(input.value) - 1; save(); render(true);}};
    function onStorage(event) {
      if (event.key !== key && event.key !== null) return;
      locked = true;
      root.querySelectorAll('button,input,textarea').forEach(control => {control.disabled = true;});
      const status = root.querySelector('#written-storage');
      status.textContent = 'Another tab changed your written practice. Load the latest saved answers before continuing.';
      const reload = document.createElement('button'); reload.type = 'button'; reload.textContent = 'Load latest written answers';
      reload.addEventListener('click', () => {cleanup(); window.mountWrittenQuiz(root, onExit);}); status.appendChild(reload);
    }
    function cleanup() {window.removeEventListener('storage', onStorage); if (root._writtenCleanup === cleanup) root._writtenCleanup = null;}
    window.addEventListener('storage', onStorage);
    root._writtenCleanup = cleanup;
    render();
    return () => {if (root._writtenCleanup) root._writtenCleanup();};
  };
})();
