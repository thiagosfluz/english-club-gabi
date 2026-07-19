/* ============================================================
   app.js — SPA controller: routing, views, video search, quizzes,
   admin tools. Vanilla JS, no build step. Shares window.GSE.
   ============================================================ */
(function (GSE) {
  "use strict";
  var Store = GSE.Store, Auth = GSE.Auth;

  var appEl, modalRoot, toastRoot, pendingConfirm = null;

  /* ---------------- helpers ---------------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function ytThumb(id) { return "https://img.youtube.com/vi/" + id + "/hqdefault.jpg"; }
  function ytSearchUrl(q) { return "https://www.youtube.com/results?search_query=" + encodeURIComponent(q); }

  function toast(msg, type) {
    var t = document.createElement("div");
    t.className = "toast" + (type ? " toast--" + type : "");
    t.innerHTML = (type === "ok" ? "✅ " : type === "err" ? "⚠️ " : "") + esc(msg);
    toastRoot.appendChild(t);
    setTimeout(function () { t.style.opacity = "0"; t.style.transform = "translateY(6px)"; }, 2400);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 2800);
  }

  var lastFocused = null;
  function openModal(title, body, footer) {
    lastFocused = document.activeElement;
    modalRoot.innerHTML =
      '<div class="modal" data-modal>' +
        '<div class="modal__box" role="dialog" aria-modal="true" aria-labelledby="modalTitle" tabindex="-1">' +
          '<div class="modal__head"><div class="modal__title" id="modalTitle">' + title + "</div>" +
          '<button class="modal__x" data-action="close-modal" aria-label="Fechar">✕</button></div>' +
          '<div class="modal__body">' + body + "</div>" +
          (footer ? '<div class="row-wrap mt-2" style="justify-content:flex-end">' + footer + "</div>" : "") +
        "</div></div>";
    // move focus into the dialog (prefer first field, else the box)
    var box = modalRoot.querySelector(".modal__box");
    var first = modalRoot.querySelector("input, select, textarea, button:not(.modal__x)");
    (first || box).focus();
  }
  function closeModal() {
    modalRoot.innerHTML = ""; pendingConfirm = null;
    if (lastFocused && lastFocused.focus) { try { lastFocused.focus(); } catch (e) {} }
    lastFocused = null;
  }

  function confirmModal(title, msg, onYes, danger) {
    openModal(esc(title), '<p class="muted">' + esc(msg) + "</p>",
      '<button class="btn btn--ghost" data-action="close-modal">Cancelar</button>' +
      '<button class="btn ' + (danger ? "btn--danger" : "btn--primary") + '" data-action="confirm-yes">Confirmar</button>');
    pendingConfirm = onYes;
  }

  function openVideoModal(yt, title) {
    openModal(esc(title || "Vídeo"),
      '<div class="embed"><iframe src="https://www.youtube.com/embed/' + esc(yt) +
      '?rel=0&autoplay=1" title="' + esc(title) +
      '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>' +
      '<p class="mt-2 center"><a href="https://www.youtube.com/watch?v=' + esc(yt) +
      '" target="_blank" rel="noopener">Abrir no YouTube ↗</a></p>');
  }

  function downloadJSON(filename, obj) {
    var blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  /* ---------------- audio (áudio neural real em MP3, com fallback p/ voz do navegador) ----------------
     Os clipes ficam em assets/audio/<unitId>/d<N>.mp3 (falas) e reading.mp3.
     Cada fala foi gerada com voz masculina ou feminina conforme o interlocutor. */
  var synth = window.speechSynthesis || null;
  var voicesCache = [];
  function loadVoices() { try { voicesCache = synth ? synth.getVoices() : []; } catch (e) { voicesCache = []; } }
  if (synth) { loadVoices(); if (typeof synth.onvoiceschanged !== "undefined") synth.onvoiceschanged = loadVoices; }
  function isFemaleSpeaker(s) { return /^(ana|maria|gabi|gabriella|jenny|laura|sara|emily|she)$/i.test((s || "").trim()); }

  var audioEl = null, audioActive = false;
  function setPlayingUI(on) {
    document.querySelectorAll('[data-action="play-dialogue"], [data-action="read-aloud"]').forEach(function (b) {
      b.classList.toggle("is-playing", !!on);
    });
  }
  function stopAudio() {
    audioActive = false;
    if (audioEl) { try { audioEl.pause(); } catch (e) {} audioEl.onended = null; audioEl.onerror = null; audioEl = null; }
    try { if (synth) synth.cancel(); } catch (e) {}
    highlightLine(-1); setPlayingUI(false);
  }
  // Fallback: browser voice for one line (used only if an MP3 fails to load).
  function ttsOne(text, speaker, cb) {
    if (!synth || typeof SpeechSynthesisUtterance === "undefined") { if (cb) cb(); return; }
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = 0.92;
    var voices = voicesCache.filter(function (v) { return /^en([-_]|$)/i.test(v.lang || ""); });
    if (voices.length) {
      var fem = voices.filter(function (v) { return /zira|jenny|aria|female|hazel|susan/i.test(v.name || ""); });
      var mal = voices.filter(function (v) { return /david|guy|mark|george|christopher|male/i.test(v.name || ""); });
      var pool = isFemaleSpeaker(speaker) ? (fem.length ? fem : voices) : (mal.length ? mal : voices);
      u.voice = pool[0];
    }
    u.onend = function () { if (cb) cb(); };
    u.onerror = function () { if (cb) cb(); };
    synth.speak(u);
  }
  // Play a list of {url, text, s} clips in sequence; start/stop controlled by audioActive.
  function playClips(clips, onLine, onDone) {
    stopAudio(); audioActive = true; setPlayingUI(true);
    var i = 0;
    function next() {
      if (!audioActive) return;
      if (i >= clips.length) { audioActive = false; setPlayingUI(false); if (onLine) onLine(-1); if (onDone) onDone(); return; }
      if (onLine) onLine(i);
      var c = clips[i], advance = function () { i++; next(); };
      audioEl = new Audio(c.url);
      audioEl.onended = advance;
      audioEl.onerror = function () { ttsOne(c.text, c.s, advance); };
      var p = audioEl.play();
      if (p && p.catch) p.catch(function () { if (audioEl) audioEl.onerror = null; ttsOne(c.text, c.s, advance); });
    }
    next();
  }
  function playDialogue(unit) {
    if (!unit || !unit.dialogue || !unit.dialogue.lines) return;
    var base = "assets/audio/" + unit.id + "/";
    var clips = unit.dialogue.lines.map(function (l, idx) { return { url: base + "d" + (idx + 1) + ".mp3", text: l.en, s: l.s }; });
    playClips(clips, highlightLine, function () { highlightLine(-1); });
  }
  function playReading(unit) {
    if (!unit || !unit.reading || !unit.reading.textEn) return;
    playClips([{ url: "assets/audio/" + unit.id + "/reading.mp3", text: unit.reading.textEn, s: "R" }], null, null);
  }
  function highlightLine(i) {
    var box = $("#dialogueBox");
    if (!box) return;
    box.querySelectorAll(".dline").forEach(function (el) { el.classList.remove("is-active"); });
    if (i >= 0) {
      var cur = box.querySelector('.dline[data-i="' + i + '"]');
      if (cur) { cur.classList.add("is-active"); try { cur.scrollIntoView({ block: "nearest" }); } catch (e) {} }
    }
  }
  function dialogueLinesHtml(dlg) {
    return (dlg.lines || []).map(function (l, i) {
      return '<p class="dline" data-i="' + i + '"><b>' + esc(l.s) + ":</b> <span class=\"den\">" + esc(l.en) + "</span>" +
        (l.pt ? ' <span class="dpt">' + esc(l.pt) + "</span>" : "") + "</p>";
    }).join("");
  }
  // Reusable audio player card (used in the unit detail and in the listening quiz).
  function audioPlayerCard(unit, note) {
    var dlg = unit.dialogue;
    return '<div class="card card--pad">' +
      '<div class="spread"><h2 style="font-size:16px">🎧 Áudio — ' + esc(dlg.title) + "</h2>" +
      '<div class="row"><button class="btn btn--sm btn--primary" data-action="play-dialogue" data-id="' + esc(unit.id) + '">▶ Ouvir</button>' +
      '<button class="btn btn--sm btn--ghost" data-action="stop-audio" aria-label="Parar áudio">⏹ Parar</button></div></div>' +
      (note ? '<p class="muted" style="font-size:12.5px">' + esc(note) + "</p>" : "") +
      '<div class="dialogue mt-2" id="dialogueBox">' + dialogueLinesHtml(dlg) + "</div>" +
      '<button class="btn btn--ghost btn--sm mt-2" data-action="toggle-pt">🇧🇷 Tradução</button></div>';
  }

  /* ---------------- speaking (gravar voz + correção automática) ---------------- */
  // Guarda o áudio gravado (Blob) por usuário+unidade no IndexedDB, para "ficar gravado".
  var IDB = (function () {
    var dbp = null, ok = (typeof indexedDB !== "undefined");
    function open() {
      if (dbp) return dbp;
      dbp = new Promise(function (res, rej) {
        try {
          var r = indexedDB.open("gse_audio", 1);
          r.onupgradeneeded = function () { r.result.createObjectStore("rec"); };
          r.onsuccess = function () { res(r.result); };
          r.onerror = function () { rej(r.error); };
        } catch (e) { rej(e); }
      });
      return dbp;
    }
    function run(mode, fn) {
      return open().then(function (db) {
        return new Promise(function (res, rej) {
          var t = db.transaction("rec", mode), rq = fn(t.objectStore("rec"));
          t.oncomplete = function () { res(rq ? rq.result : undefined); };
          t.onerror = function () { rej(t.error); };
        });
      });
    }
    return {
      ok: ok,
      put: function (k, blob) { return run("readwrite", function (s) { return s.put(blob, k); }); },
      get: function (k) { return run("readonly", function (s) { return s.get(k); }); },
      del: function (k) { return run("readwrite", function (s) { return s.delete(k); }); }
    };
  })();

  var rec = {
    mediaRec: null, chunks: [], stream: null, recog: null, transcript: "", finalTxt: "",
    active: false, unitId: null, blob: null, blobBuilt: false,
    recogSupported: false, recogEnded: false, recogError: "", finalized: false, fallback: null
  };
  function speakingKey(unitId) { return (state.user ? state.user.id : "anon") + ":" + unitId; }
  function hasRecognition() { return !!(window.SpeechRecognition || window.webkitSpeechRecognition); }

  function abortRecording() {
    if (rec.fallback) { clearTimeout(rec.fallback); rec.fallback = null; }
    rec.active = false; rec.finalized = true;
    if (rec.recog) { try { rec.recog.onresult = null; rec.recog.onend = null; rec.recog.onerror = null; rec.recog.stop(); } catch (e) {} rec.recog = null; }
    if (rec.mediaRec && rec.mediaRec.state !== "inactive") { try { rec.mediaRec.onstop = null; rec.mediaRec.stop(); } catch (e) {} }
    if (rec.stream) { rec.stream.getTracks().forEach(function (t) { t.stop(); }); rec.stream = null; }
    rec.mediaRec = null; rec.chunks = [];
  }
  function startRecognition() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { rec.recogSupported = false; return; }
    rec.recogSupported = true; rec.finalTxt = "";
    try {
      var r = new SR(); r.lang = "en-US"; r.continuous = true; r.interimResults = true; r.maxAlternatives = 1;
      r.onresult = function (ev) {
        var interim = "";
        for (var i = ev.resultIndex; i < ev.results.length; i++) {
          var res = ev.results[i];
          if (res.isFinal) rec.finalTxt += res[0].transcript + " ";
          else interim += res[0].transcript + " ";
        }
        rec.transcript = (rec.finalTxt + interim).trim();
      };
      r.onerror = function (ev) { rec.recogError = (ev && ev.error) || "error"; };
      r.onend = function () {
        // enquanto o aluno não parou, o Chrome pode encerrar sozinho após silêncio: reinicia p/ continuar ouvindo
        if (rec.active) { try { r.start(); return; } catch (e) {} }
        rec.recogEnded = true; maybeFinalize();
      };
      r.start(); rec.recog = r;
    } catch (e) { rec.recogSupported = false; rec.recog = null; }
  }
  async function startRecording(unitId) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
      toast("Seu navegador não permite gravar áudio.", "err"); return;
    }
    // reinicia o estado
    rec.chunks = []; rec.transcript = ""; rec.finalTxt = ""; rec.unitId = unitId; rec.active = true;
    rec.blob = null; rec.blobBuilt = false; rec.recogEnded = false; rec.recogError = ""; rec.finalized = false;
    if (rec.fallback) { clearTimeout(rec.fallback); rec.fallback = null; }
    // 1) reconhecimento primeiro (pega o microfone o quanto antes, para a correção)
    startRecognition();
    // 2) captura para salvar o áudio
    try { rec.stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch (e) { abortRecording(); toast("Não consegui acessar o microfone. Permita o acesso e tente de novo.", "err"); return; }
    try {
      var mime = (window.MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported("audio/webm")) ? "audio/webm" : "";
      rec.mediaRec = mime ? new MediaRecorder(rec.stream, { mimeType: mime }) : new MediaRecorder(rec.stream);
    } catch (e) { try { rec.mediaRec = new MediaRecorder(rec.stream); } catch (e2) { rec.mediaRec = null; } }
    if (rec.mediaRec) {
      rec.mediaRec.ondataavailable = function (ev) { if (ev.data && ev.data.size) rec.chunks.push(ev.data); };
      rec.mediaRec.onstop = function () { buildBlob(); maybeFinalize(); };
      try { rec.mediaRec.start(); } catch (e) { rec.mediaRec = null; }
    }
    updateRecUI("recording");
  }
  function buildBlob() {
    if (rec.stream) { rec.stream.getTracks().forEach(function (t) { t.stop(); }); rec.stream = null; }
    var type = (rec.mediaRec && rec.mediaRec.mimeType) || "audio/webm";
    rec.blob = rec.chunks.length ? new Blob(rec.chunks, { type: type }) : null;
    rec.blobBuilt = true;
  }
  function stopRecording() {
    rec.active = false;
    updateRecUI("processing");
    if (rec.recog) { try { rec.recog.stop(); } catch (e) {} } else { rec.recogEnded = true; }
    if (rec.mediaRec && rec.mediaRec.state !== "inactive") { try { rec.mediaRec.stop(); } catch (e) { buildBlob(); } } else { buildBlob(); }
    // rede de segurança: corrige mesmo se algum evento não disparar
    if (rec.fallback) clearTimeout(rec.fallback);
    rec.fallback = setTimeout(function () { rec.recogEnded = true; if (!rec.blobBuilt) buildBlob(); maybeFinalize(); }, 3500);
  }
  // Só corrige quando o áudio está pronto E o reconhecimento terminou (ou não existe).
  function maybeFinalize() {
    if (rec.finalized || !rec.blobBuilt) return;
    if (rec.recogSupported && !rec.recogEnded) return;
    rec.finalized = true;
    if (rec.fallback) { clearTimeout(rec.fallback); rec.fallback = null; }
    var unitId = rec.unitId, unit = Store.getUnit(unitId);
    if (rec.blob && IDB.ok) IDB.put(speakingKey(unitId), rec.blob).catch(function () {});
    var g = gradeSpeech(unit, rec.transcript);
    g.recogSupported = rec.recogSupported; g.recogError = rec.recogError;
    if (state.user) Store.saveSpeaking(state.user.id, unitId, { transcript: rec.transcript, score: g.score, at: 0 });
    renderRecResult(unitId, rec.blob ? URL.createObjectURL(rec.blob) : null, rec.transcript, g);
    updateRecUI("done");
  }
  function normWords(s) { return (s || "").toLowerCase().replace(/[^a-z0-9'\s]/g, " ").split(/\s+/).filter(Boolean); }
  function gradeSpeech(unit, transcript) {
    var sp = (unit && unit.speaking) || {}, t = (transcript || "").toLowerCase();
    var kws = sp.keywords || [];
    var hit = kws.filter(function (k) { return t.indexOf(k.toLowerCase()) >= 0; });
    var miss = kws.filter(function (k) { return hit.indexOf(k) < 0; });
    var wc = normWords(transcript).length;
    var score = kws.length ? Math.round((hit.length / kws.length) * 100) : (wc >= 4 ? 60 : 20);
    var level = score >= 70 ? "ok" : score >= 40 ? "mid" : "low";
    return { score: score, hit: hit, miss: miss, wordCount: wc, level: level, hasTranscript: !!(transcript && transcript.trim()) };
  }
  function renderRecResult(unitId, url, transcript, g) {
    var box = $("#recResult"); if (!box) return;
    var html = url ? '<audio class="rec-audio mt-2" controls preload="metadata" src="' + url + '"></audio>' : "";
    if (!g.hasTranscript) {
      var why;
      if (!g.recogSupported) {
        why = "este navegador não faz a correção automática — use o <b>Chrome</b> ou o <b>Edge</b> (no computador ou no Android). Sua gravação foi salva acima.";
      } else if (g.recogError === "not-allowed" || g.recogError === "service-not-allowed") {
        why = "o navegador bloqueou o microfone. Clique no cadeado ao lado do endereço, permita o <b>Microfone</b> e tente de novo.";
      } else if (g.recogError === "audio-capture") {
        why = "não achei o microfone (ou ele está em uso por outro app). Feche outros apps que usam o microfone e tente de novo.";
      } else if (g.recogError === "network") {
        why = "o reconhecimento precisa de internet. Verifique a sua conexão e tente de novo.";
      } else {
        why = "não captei a fala. Fale <b>em inglês</b>, um pouco mais alto e perto do microfone, e clique em Parar só quando terminar. Tente de novo.";
      }
      html += '<div class="q__explain is-no mt-2"><b>Correção automática:</b> ' + why + "</div>";
    } else {
      var cls = g.level === "ok" ? "is-ok" : (g.level === "mid" ? "" : "is-no");
      html += '<div class="q__explain ' + cls + ' mt-2">' +
        '<b>🗣️ Você disse:</b> "' + esc(transcript) + '"<br>' +
        '<b>Nota: ' + g.score + "%</b> — " +
        (g.level === "ok" ? "Muito bem! 🎉" : g.level === "mid" ? "Bom, continue praticando! 💪" : "Tente usar mais palavras do tema. 🌱") + "<br>" +
        (g.hit.length ? "✅ Você usou: <b>" + esc(g.hit.join(", ")) + "</b><br>" : "") +
        (g.miss.length ? "💡 Tente incluir: " + esc(g.miss.join(", ")) : "") + "</div>";
    }
    box.innerHTML = html;
    var del = $("#recDelete"); if (del) del.hidden = false;
  }
  function updateRecUI(s) {
    var btn = $("#recBtn"), status = $("#recStatus");
    if (!btn) return;
    if (s === "recording") { btn.innerHTML = "⏹ Parar"; btn.classList.add("is-recording"); if (status) status.textContent = "🔴 Gravando… fale agora sobre o tema (em inglês)."; }
    else if (s === "processing") { btn.innerHTML = "🎤 Gravar"; btn.classList.remove("is-recording"); if (status) status.textContent = "Processando a sua fala…"; }
    else { btn.innerHTML = "🎤 Gravar de novo"; btn.classList.remove("is-recording"); if (status) status.textContent = ""; }
  }
  function deleteRecording(unitId) {
    stopAudio();
    if (IDB.ok) IDB.del(speakingKey(unitId)).catch(function () {});
    if (state.user) Store.clearSpeaking(state.user.id, unitId);
    var box = $("#recResult"); if (box) box.innerHTML = "";
    var del = $("#recDelete"); if (del) del.hidden = true;
    var btn = $("#recBtn"); if (btn) { btn.innerHTML = "🎤 Gravar"; btn.classList.remove("is-recording"); }
    var status = $("#recStatus"); if (status) status.textContent = "";
    toast("Gravação apagada. Grave de novo quando quiser.");
  }
  function speakingCard(unit) {
    var sp = unit.speaking;
    return '<div class="section"><div class="card card--pad">' +
      '<div class="spread"><h2 style="font-size:17px">🎤 Fala — Speaking</h2></div>' +
      '<p class="muted mt-1">' + esc(sp.prompt) + "</p>" +
      '<p class="mt-2" style="font-size:14px">Exemplo: <i>"' + esc(sp.example) + '"</i> ' +
      '<button class="btn btn--ghost btn--sm" data-action="speak-example" data-id="' + esc(unit.id) + '">🔊 Ouvir</button></p>' +
      '<div class="row-wrap mt-2">' +
      '<button class="btn btn--primary" id="recBtn" data-action="rec-toggle" data-id="' + esc(unit.id) + '">🎤 Gravar</button>' +
      '<button class="btn btn--ghost" id="recDelete" data-action="rec-delete" data-id="' + esc(unit.id) + '" hidden>🗑️ Apagar</button>' +
      "</div>" +
      '<div id="recStatus" class="muted mt-1" style="font-size:13px"></div>' +
      '<div id="recResult"></div>' +
      '<p class="dim mt-2" style="font-size:12px">O microfone é usado só no seu aparelho e o áudio fica gravado aqui. A correção verifica se você falou em inglês usando as palavras do tema (melhor no Chrome/Edge).</p>' +
      "</div></div>";
  }
  // Recarrega a gravação salva (e a correção) ao abrir a unidade.
  function hydrateSpeaking(unitId) {
    var box = $("#recResult"); if (!box) return;
    var sp = state.user ? Store.getSpeaking(state.user.id)[unitId] : null;
    function show(url) {
      var unit = Store.getUnit(unitId);
      if (sp) { renderRecResult(unitId, url, sp.transcript, gradeSpeech(unit, sp.transcript)); }
      else if (url) { box.innerHTML = '<audio class="rec-audio mt-2" controls preload="metadata" src="' + url + '"></audio>'; var del = $("#recDelete"); if (del) del.hidden = false; }
    }
    if (IDB.ok) IDB.get(speakingKey(unitId)).then(function (blob) { show(blob ? URL.createObjectURL(blob) : null); }).catch(function () { show(null); });
    else show(null);
  }

  /* ---------------- state ---------------- */
  var state = { user: null, tab: "home", screen: "main", unitId: null, quiz: null, search: "", filter: "all" };

  var STUDENT_TABS = [
    { id: "home", label: "Início", ic: "🏠" },
    { id: "videos", label: "Vídeos", ic: "🎬" },
    { id: "tasks", label: "Tarefas", ic: "📝" },
    { id: "progress", label: "Progresso", ic: "📊" }
  ];
  var ADMIN_TABS = [
    { id: "content", label: "Conteúdo", ic: "📚" },
    { id: "students", label: "Alunos", ic: "👥" },
    { id: "class", label: "Turma", ic: "📊" },
    { id: "settings", label: "Config", ic: "⚙️" }
  ];
  function tabsFor(user) { return user.role === "admin" ? ADMIN_TABS : STUDENT_TABS; }
  function defaultTab(user) { return user.role === "admin" ? "content" : "home"; }

  /* ---------------- data helpers ---------------- */
  function firstName(u) { return (u && u.name ? u.name.split(" ")[0] : "aluno"); }

  function overallStats(userId) {
    var prog = Store.getProgress(userId);
    var units = Store.getContent().units;
    var done = 0, sumPct = 0, counted = 0;
    units.forEach(function (u) {
      var p = prog.units[u.id];
      if (p && p.bestTotal) { done++; sumPct += p.best / p.bestTotal; counted++; }
    });
    return {
      done: done, total: units.length,
      avg: counted ? Math.round((sumPct / counted) * 100) : 0,
      watched: (prog.watched || []).length
    };
  }
  function unitBest(userId, unitId) {
    var p = Store.getProgress(userId).units[unitId];
    return p ? { best: p.best, total: p.bestTotal, pct: p.bestTotal ? Math.round((p.best / p.bestTotal) * 100) : 0 } : null;
  }

  function allVideos() {
    var c = Store.getContent(), list = [];
    c.units.forEach(function (u) {
      (u.videos || []).forEach(function (v) {
        list.push({
          key: "u:" + u.id + ":" + v.youtubeId, youtubeId: v.youtubeId, url: v.url,
          title: v.title, channel: v.channel, level: u.level,
          unitId: u.id, unitTitle: u.titlePt,
          vocab: (u.vocabulary || []).map(function (x) { return x.en + " " + x.pt; }).join(" ")
        });
      });
    });
    (c.extraVideos || []).forEach(function (v) {
      var unit = c.units.find(function (x) { return x.id === v.unitId; });
      list.push({
        key: v.key, youtubeId: v.youtubeId, url: v.url, title: v.title, channel: v.channel,
        level: v.level, unitId: v.unitId, unitTitle: unit ? unit.titlePt : "", note: v.note, extra: true
      });
    });
    return list;
  }
  function filterVideos(list) {
    var q = state.search.trim().toLowerCase();
    return list.filter(function (v) {
      if (state.filter === "A1" && v.level !== "A1") return false;
      if (state.filter === "A2" && v.level !== "A2") return false;
      if (!q) return true;
      var hay = (v.title + " " + (v.channel || "") + " " + (v.unitTitle || "") + " " + (v.vocab || "")).toLowerCase();
      return hay.indexOf(q) >= 0;
    });
  }

  /* ---------------- shared UI bits ---------------- */
  function levelBadge(level) {
    return '<span class="badge badge--' + (level === "A2" ? "a2" : "a1") + '">' + esc(level || "A1") + "</span>";
  }
  function topbar(user) {
    var tabs = tabsFor(user);
    var nav = tabs.map(function (t) {
      return '<button data-action="tab" data-tab="' + t.id + '"' + (state.tab === t.id ? ' class="is-active"' : "") + ">" + esc(t.label) + "</button>";
    }).join("");
    var initial = esc((user.name || "?").charAt(0).toUpperCase());
    return '<header class="topbar">' +
      '<div class="topbar__logo">📚</div>' +
      '<div class="topbar__title">English Club<small>Professora Gabi</small></div>' +
      '<nav class="topnav">' + nav + "</nav>" +
      '<div class="topbar__spacer"></div>' +
      '<span class="rolechip ' + (user.role === "admin" ? "rolechip--adm" : "") + '">' + (user.role === "admin" ? "Professora" : "Aluno") + "</span>" +
      '<button class="btn btn--icon btn--ghost" data-action="cycle-theme" title="Tema" aria-label="Mudar tema">🌓</button>' +
      '<button class="btn btn--sm btn--ghost" data-action="logout" title="Sair"><span aria-hidden="true">' + initial + "</span> Sair</button>" +
      "</header>";
  }
  function bottomnav(user) {
    var tabs = tabsFor(user);
    return '<nav class="bottomnav">' + tabs.map(function (t) {
      return '<button data-action="tab" data-tab="' + t.id + '"' + (state.tab === t.id ? ' class="is-active"' : "") +
        '><span class="ic" aria-hidden="true">' + t.ic + "</span>" + esc(t.label) + "</button>";
    }).join("") + "</nav>";
  }
  function pageHead(title, sub) {
    return '<div class="page-head"><h1>' + esc(title) + "</h1>" + (sub ? "<p>" + esc(sub) + "</p>" : "") + "</div>";
  }
  function unitCard(u, userId, action) {
    var b = unitBest(userId, u.id);
    var featured = Store.getContent().featured.indexOf(u.id) >= 0;
    return '<div class="tile" data-action="' + action + '" data-id="' + esc(u.id) + '" role="button" tabindex="0">' +
      '<div class="tile__emoji">' + esc(u.emoji) + "</div>" +
      '<div class="tile__body">' +
        '<div class="tile__title">' + esc(u.titlePt) + "</div>" +
        '<div class="tile__sub">' + esc(u.title) + "</div>" +
        '<div class="tile__foot">' +
          "<span>" + levelBadge(u.level) + (featured ? ' <span class="badge badge--star">★ Gabi</span>' : "") + "</span>" +
          (b ? '<span class="badge badge--done">✓ ' + b.pct + "%</span>" : '<span class="badge">' + (u.exercises ? u.exercises.length : 0) + " ex.</span>") +
        "</div>" +
      "</div></div>";
  }
  function videoTile(v) {
    return '<div class="tile">' +
      '<button class="thumb" data-action="play" data-yt="' + esc(v.youtubeId) + '" data-key="' + esc(v.key) +
        '" data-title="' + esc(v.title) + '" aria-label="Assistir: ' + esc(v.title) + '">' +
        '<img src="' + esc(ytThumb(v.youtubeId)) + '" alt="" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'grid\';">' +
        '<div class="thumb__fallback" style="display:none">🎬</div>' +
        '<span class="thumb__play"><span aria-hidden="true">▶</span></span>' +
      "</button>" +
      '<div class="tile__body">' +
        '<div class="tile__title">' + esc(v.title) + "</div>" +
        '<div class="tile__sub">' + esc(v.channel || "") + "</div>" +
        '<div class="tile__foot"><span>' + levelBadge(v.level) + "</span>" +
        (v.unitTitle ? '<span class="badge">' + esc(v.unitTitle) + "</span>" : "") + "</div>" +
      "</div></div>";
  }

  /* ============================================================
     LOGIN
     ============================================================ */
  function loginView(role) {
    role = role || "student";
    return '<div class="auth"><div class="auth__card">' +
      '<div class="auth__brand"><div class="auth__logo">📚</div>' +
      '<div><div class="auth__title">English Club da Gabi</div>' +
      '<div class="auth__sub">Inglês básico com vídeos e exercícios</div></div></div>' +
      '<div class="auth__tabs" role="group" aria-label="Tipo de acesso">' +
        '<button type="button" class="auth__tab' + (role === "student" ? " is-active" : "") + '" aria-pressed="' + (role === "student") + '" data-action="auth-role" data-role="student">👦 Sou Aluno</button>' +
        '<button type="button" class="auth__tab' + (role === "admin" ? " is-active" : "") + '" aria-pressed="' + (role === "admin") + '" data-action="auth-role" data-role="admin">👩‍🏫 Sou Professora</button>' +
      "</div>" +
      '<form data-form="login">' +
        '<div class="field"><label for="lg-user">Usuário</label>' +
          '<input class="input" id="lg-user" name="username" autocomplete="username" autocapitalize="none" spellcheck="false" placeholder="' + (role === "admin" ? "gabi" : "seu usuário") + '" required></div>' +
        '<div class="field"><label for="lg-pass">Senha</label>' +
          '<input class="input" id="lg-pass" name="password" type="password" autocomplete="current-password" placeholder="••••••" required></div>' +
        '<div class="field__err" id="lg-err"></div>' +
        '<button class="btn btn--primary btn--block" type="submit">Entrar</button>' +
      "</form>" +
      '<div class="auth__hint">' + (role === "admin"
        ? 'Acesso da professora — usuário <b>gabi</b>, senha <b>gabi123</b>. Troque a senha em <b>Config</b> após entrar.'
        : 'Acesso de teste do aluno — usuário <b>aluno</b>, senha <b>aluno123</b>. A professora cria os acessos dos alunos.') +
      "</div></div></div>";
  }

  /* ============================================================
     STUDENT
     ============================================================ */
  function studentBody() {
    if (state.screen === "unit") return unitDetail(state.unitId);
    if (state.screen === "quiz") return quizScreen();
    switch (state.tab) {
      case "videos": return studentVideos();
      case "tasks": return studentTasks();
      case "progress": return studentProgress();
      default: return studentHome();
    }
  }

  function studentHome() {
    var u = state.user, s = overallStats(u.id), c = Store.getContent();
    var featured = c.featured.map(function (id) { return c.units.find(function (x) { return x.id === id; }); }).filter(Boolean);
    if (!featured.length) featured = c.units.slice(0, 3);
    var html = '<div class="view container">' +
      '<div class="hero"><h1>Olá, ' + esc(firstName(u)) + "! 👋</h1>" +
      "<p>Pronto para aprender inglês hoje? Assista aos vídeos e faça as tarefas da professora Gabi.</p>" +
      '<div class="hero__row">' +
        '<div class="hero__stat"><b>' + s.done + "/" + s.total + "</b><span>tarefas feitas</span></div>" +
        '<div class="hero__stat"><b>' + s.avg + "%</b><span>média</span></div>" +
        '<div class="hero__stat"><b>' + s.watched + "</b><span>vídeos vistos</span></div>" +
      "</div></div>";

    html += '<div class="section mt-3"><div class="section__head"><h2>⭐ Recomendado pela Gabi</h2>' +
      '<button class="btn btn--sm btn--ghost" data-action="tab" data-tab="tasks">Ver tudo</button></div>' +
      '<div class="grid grid--auto">' + featured.map(function (unit) { return unitCard(unit, u.id, "open-unit"); }).join("") + "</div></div>";

    html += '<div class="section"><div class="section__head"><h2>🎬 Comece por aqui</h2>' +
      '<button class="btn btn--sm btn--ghost" data-action="tab" data-tab="videos">Todos os vídeos</button></div>' +
      '<div class="grid grid--auto">' + filterVideos(allVideos()).slice(0, 3).map(videoTile).join("") + "</div></div>";
    return html + "</div>";
  }

  function renderVideoResults() {
    var res = filterVideos(allVideos());
    if (!res.length) return '<div class="empty"><div class="ic">🔍</div><p>Nenhum vídeo encontrado na biblioteca.<br>Tente buscar no YouTube abaixo.</p></div>';
    return '<div class="grid grid--auto">' + res.map(videoTile).join("") + "</div>";
  }
  function studentVideos() {
    var chips = ["all", "A1", "A2"].map(function (f) {
      return '<button class="chip' + (state.filter === f ? " is-active" : "") + '" data-action="filter" data-filter="' + f + '">' +
        (f === "all" ? "Todos" : f) + "</button>";
    }).join("");
    return '<div class="view container">' + pageHead("Vídeos", "Pesquise vídeos de inglês básico e assista sem sair do app.") +
      '<div class="searchbar">' +
        '<input class="input grow" id="videoSearch" type="search" aria-label="Pesquisar vídeos" data-action="search" placeholder="Pesquisar vídeos (ex.: family, numbers, to be)…" value="' + esc(state.search) + '" autocapitalize="none">' +
        '<button class="btn btn--accent" data-action="yt-search" title="Buscar no YouTube" aria-label="Buscar no YouTube">YouTube ↗</button>' +
      "</div>" +
      '<div class="chips">' + chips + "</div>" +
      '<div id="videoResults">' + renderVideoResults() + "</div></div>";
  }

  function studentTasks() {
    var u = state.user, units = Store.getContent().units;
    return '<div class="view container">' + pageHead("Tarefas", "Escolha uma unidade para estudar o vocabulário e fazer os exercícios.") +
      '<div class="grid grid--auto">' + units.map(function (unit) { return unitCard(unit, u.id, "open-unit"); }).join("") + "</div></div>";
  }

  function studentProgress() {
    var u = state.user, s = overallStats(u.id), units = Store.getContent().units;
    var rows = units.map(function (unit) {
      var b = unitBest(u.id, unit.id);
      return '<div class="card card--pad"><div class="spread">' +
        '<div class="row"><span style="font-size:22px">' + esc(unit.emoji) + "</span><div><b>" + esc(unit.titlePt) + "</b><br>" +
        '<span class="dim" style="font-size:12.5px">' + esc(unit.title) + "</span></div></div>" +
        (b ? '<span class="badge badge--done">✓ ' + b.best + "/" + b.total + "</span>" : '<span class="badge">não feita</span>') +
        "</div>" +
        '<div class="bar mt-2"><i style="width:' + (b ? b.pct : 0) + '%"></i></div></div>';
    }).join("");
    return '<div class="view container">' + pageHead("Meu Progresso", "Veja o que você já aprendeu.") +
      '<div class="grid grid--stats">' +
        '<div class="stat"><b>' + s.done + "/" + s.total + "</b><span>Tarefas concluídas</span></div>" +
        '<div class="stat"><b>' + s.avg + '%</b><span>Média de acertos</span></div>' +
        '<div class="stat"><b>' + s.watched + '</b><span>Vídeos assistidos</span></div>' +
        '<div class="stat"><b>' + Math.round((s.done / (s.total || 1)) * 100) + '%</b><span>Curso concluído</span></div>' +
      "</div>" +
      '<div class="section mt-3"><div class="section__head"><h2>Por unidade</h2></div>' +
      '<div class="stack">' + rows + "</div></div></div>";
  }

  function unitDetail(unitId) {
    var u = state.user, unit = Store.getUnit(unitId);
    if (!unit) return '<div class="view container">' + pageHead("Ops", "Unidade não encontrada.") + "</div>";
    var b = unitBest(u.id, unitId);
    var vocab = (unit.vocabulary || []).map(function (v, i) {
      return '<button type="button" class="vocab__item vocab__click" data-action="play-vocab" data-id="' + esc(unit.id) + '" data-i="' + i +
        '" title="Ouvir a pronúncia"><span class="vocab__en"><span class="vocab__spk" aria-hidden="true">🔊</span> ' + esc(v.en) +
        '</span><span class="vocab__pt">' + esc(v.pt) + "</span></button>";
    }).join("");
    var videos = (unit.videos || []).map(function (v) {
      return videoTile({ key: "u:" + unit.id + ":" + v.youtubeId, youtubeId: v.youtubeId, title: v.title, channel: v.channel, level: unit.level });
    }).join("");

    // audio (dialogue) section
    var audioHtml = "";
    if (unit.dialogue && unit.dialogue.lines && unit.dialogue.lines.length) {
      var bList = unitBest(u.id, unit.id + "#listening");
      audioHtml = '<div class="section">' +
        audioPlayerCard(unit, "Pessoas conversando sobre o tema, com vozes reais (masculina para homens, feminina para mulheres). Clique em Ouvir; use Parar quando quiser.") +
        '<div class="mt-2 center"><button class="btn btn--accent" data-action="start-quiz" data-id="' + esc(unit.id) + '" data-kind="listening">🎧 Exercícios de áudio' +
        (bList ? " · recorde " + bList.best + "/" + bList.total : "") + "</button></div></div>";
    }

    // reading section
    var rd = unit.reading, readHtml = "";
    if (rd && rd.textEn) {
      var bRead = unitBest(u.id, unit.id + "#reading");
      readHtml = '<div class="section"><div class="card card--pad">' +
        '<div class="spread"><h2 style="font-size:17px">📖 Reading — ' + esc(rd.title) + "</h2>" +
        '<div class="row"><button class="btn btn--sm btn--ghost" data-action="read-aloud" data-id="' + esc(unit.id) + '">🔊 Ouvir</button>' +
        '<button class="btn btn--sm btn--ghost" data-action="stop-audio" aria-label="Parar áudio">⏹ Parar</button></div></div>' +
        '<p class="reading-text mt-2">' + esc(rd.textEn) + "</p>" +
        (rd.textPt ? '<details class="mt-1"><summary>Ver tradução</summary><p class="muted mt-1">' + esc(rd.textPt) + "</p></details>" : "") +
        '<button class="btn btn--accent btn--sm mt-2" data-action="start-quiz" data-id="' + esc(unit.id) + '" data-kind="reading">📖 Exercícios de leitura' +
        (bRead ? " · recorde " + bRead.best + "/" + bRead.total : "") + "</button></div></div>";
    }

    return '<div class="view container">' +
      '<button class="btn btn--sm btn--ghost" data-action="back">← Voltar</button>' +
      '<div class="hero mt-2" style="background:linear-gradient(135deg,#6366f1,#4f46e5)">' +
        '<div class="row" style="gap:14px"><span style="font-size:40px">' + esc(unit.emoji) + "</span>" +
        "<div><h1>" + esc(unit.titlePt) + "</h1><p>" + esc(unit.title) + " · " + esc(unit.level) + "</p></div></div>" +
        '<p class="mt-2">' + esc(unit.description) + "</p></div>" +

      '<div class="section mt-3"><div class="section__head"><h2>📖 Vocabulário</h2><span class="dim" style="font-size:12px">🔊 toque para ouvir</span></div>' +
      '<div class="vocab">' + vocab + "</div></div>" +

      (videos ? '<div class="section"><div class="section__head"><h2>🎬 Vídeos</h2>' +
        '<button class="btn btn--sm btn--ghost" data-action="yt-search-q" data-q="' + esc(unit.searchQuery || unit.title) + '">Mais no YouTube ↗</button></div>' +
        '<div class="grid grid--auto">' + videos + "</div></div>"
        : '<div class="section"><button class="btn btn--ghost btn--block" data-action="yt-search-q" data-q="' + esc(unit.searchQuery || unit.title) + '">🎬 Buscar vídeos desta unidade no YouTube ↗</button></div>') +

      audioHtml + readHtml +
      (unit.speaking && unit.speaking.prompt ? speakingCard(unit) : "") +

      '<div class="section"><div class="card card--pad center">' +
        "<h2 style=\"font-size:17px\">📝 Exercícios</h2>" +
        '<p class="muted mt-1">' + (unit.exercises ? unit.exercises.length : 0) + " perguntas" +
        (b ? " · seu recorde: " + b.best + "/" + b.total : "") + "</p>" +
        ((unit.exercises && unit.exercises.length)
          ? '<button class="btn btn--primary mt-2" data-action="start-quiz" data-id="' + esc(unit.id) + '" data-kind="ex">' + (b ? "Refazer exercícios" : "Começar exercícios") + "</button>"
          : '<p class="dim mt-2">Sem exercícios nesta unidade ainda.</p>') +
        "</div></div></div>";
  }

  /* ---------------- quiz runner ---------------- */
  function normFill(s) {
    return String(s).toLowerCase().trim().replace(/^["'`\s]+/, "").replace(/["'`.!?,\s]+$/, "").replace(/\s+/g, " ");
  }
  function normApos(s) { return normFill(s).replace(/['`’]/g, ""); }
  function isCorrect(ex, val) {
    if (val == null || val === "") return false;
    if (ex.type === "mcq") return Number(val) === Number(ex.answer);
    if (ex.type === "truefalse") return (val === "true") === (ex.answer === true);
    return normFill(val) === normFill(String(ex.answer)) || normApos(val) === normApos(String(ex.answer));
  }

  function renderExercise(ex, i, graded, ans) {
    var userVal = graded ? ans[i] : null;
    var head = '<div class="q"><div class="q__num">Pergunta ' + (i + 1) + "</div>" +
      '<div class="q__text">' + esc(ex.question) + "</div>";
    var body = "";

    if (ex.type === "mcq" || ex.type === "truefalse") {
      var opts = ex.type === "truefalse" ? ["Verdadeiro (True)", "Falso (False)"] : ex.options;
      var values = ex.type === "truefalse" ? ["true", "false"] : ex.options.map(function (_, k) { return String(k); });
      var wrapCls = ex.type === "truefalse" ? "tf-row" : "";
      body += '<div class="' + wrapCls + '">';
      opts.forEach(function (label, k) {
        var val = values[k];
        var cls = "opt";
        if (graded) {
          cls += " is-locked";
          var thisCorrect = ex.type === "truefalse" ? ((val === "true") === (ex.answer === true)) : (k === Number(ex.answer));
          if (thisCorrect) cls += " is-correct";
          else if (String(userVal) === String(val)) cls += " is-wrong";
        }
        var checked = graded && String(userVal) === String(val) ? " checked" : "";
        body += '<label class="' + cls + '"><input type="radio" name="q' + i + '" value="' + esc(val) + '"' +
          (graded ? " disabled" : "") + checked + "><span>" + esc(label) + "</span></label>";
      });
      body += "</div>";
    } else { // fill
      body += '<input class="input" name="q' + i + '" placeholder="Digite a resposta em inglês…" autocapitalize="none" spellcheck="false"' +
        (graded ? ' disabled value="' + esc(userVal || "") + '"' : "") + ">";
      if (graded) body += '<p class="mt-1 dim" style="font-size:13px">Resposta certa: <b>' + esc(String(ex.answer)) + "</b></p>";
    }

    if (graded) {
      var ok = isCorrect(ex, userVal);
      body += '<div class="q__explain ' + (ok ? "is-ok" : "is-no") + '"><b>' +
        (ok ? "✓ Correto! " : "✗ " + (userVal ? "Quase! " : "Sem resposta. ")) + "</b>" + esc(ex.explanation || "") + "</div>";
    }
    return head + body + "</div>";
  }

  function quizKind() { return (state.quiz && state.quiz.kind) || "ex"; }
  function quizQuestions(unit, kind) {
    if (kind === "listening") return (unit.dialogue && unit.dialogue.questions) || [];
    if (kind === "reading") return (unit.reading && unit.reading.questions) || [];
    return unit.exercises || [];
  }
  function quizSaveId(unit, kind) { return kind === "ex" ? unit.id : unit.id + "#" + kind; }
  function quizLabel(kind) { return kind === "listening" ? "🎧 Exercícios de áudio" : kind === "reading" ? "📖 Exercícios de leitura" : "📝 Exercícios"; }

  function quizScreen() {
    var unit = Store.getUnit(state.unitId), q = state.quiz;
    if (!unit) return '<div class="view container">' + pageHead("Ops", "Unidade não encontrada.") + "</div>";
    var graded = q && q.graded, ans = q ? q.answers : [];
    var kind = quizKind();
    var exs = quizQuestions(unit, kind);

    var banner = "";
    if (graded) {
      var pct = q.total ? Math.round((q.score / q.total) * 100) : 0;
      var cls = pct >= 70 ? "ok" : pct >= 40 ? "mid" : "";
      var msg = pct >= 70 ? "Muito bem! 🎉" : pct >= 40 ? "Bom trabalho, continue praticando! 💪" : "Não desista, tente de novo! 🌱";
      banner = '<div class="result-banner ' + cls + '"><div class="score">' + q.score + "/" + q.total + "</div>" +
        "<div><b>" + msg + "</b></div><div class=\"muted\">Você acertou " + pct + "%</div></div>";
    }

    // In the listening exercise, show the audio player (start/stop) above the questions.
    var listenPlayer = (kind === "listening" && unit.dialogue && unit.dialogue.lines)
      ? '<div class="section">' + audioPlayerCard(unit, "Ouça a conversa quantas vezes quiser e responda. Use ▶ Ouvir e ⏹ Parar.") + "</div>"
      : "";

    var body = '<div class="view container">' +
      '<button class="btn btn--sm btn--ghost" data-action="back-unit">← ' + esc(unit.titlePt) + "</button>" +
      pageHead(quizLabel(kind) + ": " + unit.titlePt, graded ? "Veja suas respostas e explicações abaixo." : "Responda todas as perguntas e clique em Corrigir.") +
      banner + listenPlayer +
      '<form data-form="quiz" data-unit="' + esc(unit.id) + '" data-kind="' + esc(kind) + '"><div class="quiz">' +
      exs.map(function (ex, i) { return renderExercise(ex, i, graded, ans); }).join("") + "</div>";

    if (graded) {
      body += '<div class="row-wrap mt-3">' +
        '<button type="button" class="btn btn--primary grow" data-action="retry-quiz" data-id="' + esc(unit.id) + '" data-kind="' + esc(kind) + '">🔄 Refazer</button>' +
        '<button type="button" class="btn btn--ghost grow" data-action="back-unit">Concluir</button></div>';
    } else {
      body += '<button type="submit" class="btn btn--primary btn--block mt-3">Corrigir respostas</button>';
    }
    return body + "</form></div>";
  }

  function studentShell() {
    return '<div class="shell">' + topbar(state.user) + '<main class="main">' + studentBody() + "</main>" + bottomnav(state.user) + "</div>";
  }

  /* ============================================================
     ADMIN
     ============================================================ */
  function adminBody() {
    switch (state.tab) {
      case "students": return adminStudents();
      case "class": return adminClass();
      case "settings": return adminSettings();
      default: return adminContent();
    }
  }

  function adminContent() {
    var c = Store.getContent();
    var unitOptions = c.units.map(function (u) { return '<option value="' + esc(u.id) + '">' + esc(u.titlePt) + "</option>"; }).join("");

    var unitRows = c.units.map(function (u) {
      var featured = c.featured.indexOf(u.id) >= 0;
      return '<div class="card card--pad"><div class="spread">' +
        '<div class="row"><span style="font-size:22px">' + esc(u.emoji) + "</span><div><b>" + esc(u.titlePt) + "</b><br>" +
        '<span class="dim" style="font-size:12.5px">' + (u.videos ? u.videos.length : 0) + " vídeos · " + (u.exercises ? u.exercises.length : 0) + " exercícios</span></div></div>" +
        '<label class="switch" title="Destacar para os alunos"><input type="checkbox" data-action="toggle-feature" data-id="' + esc(u.id) + '"' + (featured ? " checked" : "") + '><span class="track"></span></label>' +
        "</div>" +
        '<div class="row-wrap mt-2">' + levelBadge(u.level) +
        (featured ? ' <span class="badge badge--star">★ Recomendada</span>' : "") +
        '<button class="btn btn--sm btn--ghost" data-action="manage-ex" data-id="' + esc(u.id) + '">Gerenciar exercícios</button></div></div>';
    }).join("");

    var extra = (c.extraVideos || []);
    var extraList = extra.length ? extra.map(function (v) {
      return '<div class="card card--pad spread"><div class="row"><img src="' + esc(ytThumb(v.youtubeId)) + '" alt="" width="72" style="border-radius:8px" onerror="this.style.visibility=\'hidden\'">' +
        "<div><b>" + esc(v.title) + "</b><br><span class=\"dim\" style=\"font-size:12px\">" + esc(v.channel || "") + " · " + esc(v.level) + "</span></div></div>" +
        '<button class="btn btn--sm btn--danger" data-action="del-video" data-key="' + esc(v.key) + '">Excluir</button></div>';
    }).join("") : '<div class="empty"><div class="ic">🎬</div><p>Nenhum vídeo extra ainda. Adicione um acima!</p></div>';

    return '<div class="view container">' + pageHead("Conteúdo", "Escolha o que os alunos veem. Marque as unidades como ★ recomendadas e adicione vídeos.") +
      '<div class="section"><div class="card card--pad">' +
        "<h2 style=\"font-size:16px\">➕ Adicionar vídeo do YouTube</h2>" +
        '<p class="muted" style="font-size:13px">Cole o link do vídeo. Ele aparecerá para os alunos na aba Vídeos.</p>' +
        '<form data-form="add-video" class="mt-2">' +
          '<div class="field"><label for="av-url">Link do YouTube</label><input class="input" id="av-url" name="url" placeholder="https://www.youtube.com/watch?v=…" required></div>' +
          '<div class="field"><label for="av-title">Título</label><input class="input" id="av-title" name="title" placeholder="Ex.: Cumprimentos em inglês" required></div>' +
          '<div class="row-wrap">' +
            '<div class="field grow"><label for="av-channel">Canal (opcional)</label><input class="input" id="av-channel" name="channel" placeholder="Ex.: BBC Learning English"></div>' +
            '<div class="field"><label for="av-level">Nível</label><select class="select" id="av-level" name="level"><option value="A1">A1</option><option value="A2">A2</option></select></div>' +
          "</div>" +
          '<div class="field"><label for="av-unit">Relacionar a uma unidade (opcional)</label><select class="select" id="av-unit" name="unitId"><option value="">— Nenhuma —</option>' + unitOptions + "</select></div>" +
          '<button class="btn btn--primary" type="submit">Adicionar vídeo</button>' +
        "</form></div></div>" +

      '<div class="section"><div class="section__head"><h2>📚 Unidades do curso</h2></div>' +
        '<div class="grid grid--auto">' + unitRows + "</div></div>" +

      '<div class="section"><div class="section__head"><h2>🎬 Vídeos adicionados por você</h2></div>' +
        '<div class="stack">' + extraList + "</div></div></div>";
  }

  function manageExercises(unitId) {
    var unit = Store.getUnit(unitId);
    if (!unit) return;
    var list = (unit.exercises || []).map(function (ex, i) {
      var typeLbl = ex.type === "mcq" ? "Múltipla escolha" : ex.type === "fill" ? "Completar" : "V ou F";
      return '<div class="card card--pad spread" style="align-items:flex-start">' +
        "<div><span class=\"badge\">" + typeLbl + '</span><div class="mt-1">' + esc(ex.question) + "</div></div>" +
        '<button class="btn btn--sm btn--danger" data-action="del-ex" data-unit="' + esc(unitId) + '" data-idx="' + i + '" aria-label="Excluir exercício">✕</button></div>';
    }).join("");

    var body = '<div class="stack">' + (list || '<p class="muted">Sem exercícios.</p>') + "</div>" +
      '<hr style="border:0;border-top:1px solid var(--border);margin:16px 0">' +
      "<h3 style=\"font-size:15px;margin-bottom:8px\">➕ Novo exercício</h3>" +
      '<form data-form="add-ex" data-unit="' + esc(unitId) + '">' +
        '<div class="field"><label for="ax-type">Tipo</label><select class="select" id="ax-type" name="type">' +
          '<option value="mcq">Múltipla escolha</option><option value="fill">Completar a frase</option><option value="truefalse">Verdadeiro ou Falso</option></select></div>' +
        '<div class="field"><label for="ax-question">Pergunta</label><input class="input" id="ax-question" name="question" required placeholder="Escreva a pergunta em inglês"></div>' +
        '<div class="field"><label for="ax-options">Opções (uma por linha) — só para múltipla escolha</label><textarea class="textarea" id="ax-options" name="options" placeholder="apple&#10;bread&#10;water"></textarea></div>' +
        '<div class="field"><label for="ax-answer">Resposta certa</label><input class="input" id="ax-answer" name="answer" placeholder="Múltipla: nº da opção (1,2,3). Completar: a palavra. V/F: true ou false"></div>' +
        '<div class="field"><label for="ax-explanation">Explicação (em português)</label><input class="input" id="ax-explanation" name="explanation" placeholder="Explique por que essa é a resposta"></div>' +
        '<button class="btn btn--primary btn--block" type="submit">Adicionar exercício</button>' +
      "</form>";
    openModal("Exercícios · " + esc(unit.titlePt), body);
  }

  function adminStudents() {
    var students = Store.getUsers().filter(function (u) { return u.role === "student"; });
    var rows = students.length ? students.map(function (u) {
      var s = overallStats(u.id);
      return "<tr><td><b>" + esc(u.name) + '</b><br><span class="dim" style="font-size:12px">@' + esc(u.username) + "</span></td>" +
        "<td>" + s.done + "/" + s.total + "</td><td>" + s.avg + "%</td><td>" + s.watched + "</td>" +
        '<td><div class="row"><button class="btn btn--sm btn--ghost" data-action="reset-pw" data-id="' + u.id + '" data-name="' + esc(u.name) + '">Senha</button>' +
        '<button class="btn btn--sm btn--danger" data-action="del-student" data-id="' + u.id + '" data-name="' + esc(u.name) + '">Excluir</button></div></td></tr>';
    }).join("") : '<tr><td colspan="5"><div class="empty"><div class="ic">👥</div><p>Nenhum aluno cadastrado ainda.</p></div></td></tr>';

    return '<div class="view container">' + pageHead("Alunos", "Crie e gerencie os acessos dos seus alunos.") +
      '<div class="section"><div class="card card--pad">' +
        "<h2 style=\"font-size:16px\">➕ Novo aluno</h2>" +
        '<form data-form="add-student" class="mt-2">' +
          '<div class="row-wrap">' +
            '<div class="field grow"><label for="as-name">Nome</label><input class="input" id="as-name" name="name" placeholder="Ex.: João Silva" required></div>' +
            '<div class="field grow"><label for="as-username">Usuário</label><input class="input" id="as-username" name="username" autocapitalize="none" spellcheck="false" placeholder="Ex.: joao" required></div>' +
          "</div>" +
          '<div class="field"><label for="as-password">Senha</label><input class="input" id="as-password" name="password" type="text" placeholder="mínimo 4 caracteres" required></div>' +
          '<button class="btn btn--primary" type="submit">Criar acesso</button>' +
        "</form></div></div>" +

      '<div class="section"><div class="section__head"><h2>Turma</h2></div>' +
        '<div class="table-wrap"><table class="tbl"><thead><tr><th>Aluno</th><th>Tarefas</th><th>Média</th><th>Vídeos</th><th></th></tr></thead>' +
        "<tbody>" + rows + "</tbody></table></div></div></div>";
  }

  function adminClass() {
    var students = Store.getUsers().filter(function (u) { return u.role === "student"; });
    var units = Store.getContent().units;
    if (!students.length) return '<div class="view container">' + pageHead("Turma", "Acompanhe o progresso.") +
      '<div class="empty"><div class="ic">📊</div><p>Cadastre alunos na aba <b>Alunos</b> para ver o progresso da turma.</p></div></div>';

    var head = "<tr><th>Aluno</th>" + units.map(function (u) { return '<th title="' + esc(u.titlePt) + '">' + esc(u.emoji) + "</th>"; }).join("") + "<th>Média</th></tr>";
    var rows = students.map(function (u) {
      var prog = Store.getProgress(u.id), s = overallStats(u.id);
      var cells = units.map(function (unit) {
        var p = prog.units[unit.id];
        if (!p) return '<td class="dim">–</td>';
        var pct = Math.round((p.best / p.bestTotal) * 100);
        var color = pct >= 70 ? "var(--success)" : pct >= 40 ? "var(--warning)" : "var(--danger)";
        return '<td style="color:' + color + ';font-weight:800">' + pct + "</td>";
      }).join("");
      return "<tr><td><b>" + esc(u.name) + "</b></td>" + cells + "<td><b>" + s.avg + "%</b></td></tr>";
    }).join("");

    return '<div class="view container">' + pageHead("Turma", "Progresso de cada aluno por unidade (% de acertos).") +
      '<div class="table-wrap"><table class="tbl"><thead>' + head + "</thead><tbody>" + rows + "</tbody></table></div>" +
      '<p class="muted mt-2" style="font-size:12.5px">Passe o dedo para o lado para ver todas as unidades. Os ícones no topo representam as unidades na ordem do curso.</p></div>';
  }

  function adminSettings() {
    var theme = Store.getTheme();
    function opt(v, label) { return '<option value="' + v + '"' + (theme === v ? " selected" : "") + ">" + label + "</option>"; }
    var syncOn = !!(GSE.Sync && GSE.Sync.enabled), syncReady = !!(GSE.Sync && GSE.Sync.ok);
    var syncCard = '<div class="section"><div class="card card--pad">' +
      "<h2 style=\"font-size:16px\">☁️ Sincronização</h2>" +
      (syncOn
        ? '<p class="mt-1" style="font-size:13.5px">' + (syncReady
            ? '<b style="color:var(--success)">Ativa ✓</b> — o conteúdo que você escolhe e os acessos aparecem em <b>todos os aparelhos dos alunos em tempo real</b>, e o progresso da turma chega aqui automaticamente (Firebase).'
            : 'Configurada (Firebase). Conectando… se não conectar, confirme no console do Firebase que o login <b>Anônimo</b> e o <b>Firestore</b> estão ativos.') + "</p>"
        : '<p class="mt-1" style="font-size:13.5px">Desligada. O app está funcionando só neste aparelho. Para ligar a sincronização em tempo real, veja o <b>README</b> (seção Firebase).</p>') +
      "</div></div>";
    return '<div class="view container">' + pageHead("Configurações", "Sincronização, segurança, aparência e backup.") +

      syncCard +

      '<div class="section"><div class="card card--pad">' +
        "<h2 style=\"font-size:16px\">🔒 Minha senha</h2>" +
        '<form data-form="change-pw" class="mt-2">' +
          '<div class="field"><label for="cp-current">Senha atual</label><input class="input" id="cp-current" name="current" type="password" autocomplete="current-password" required></div>' +
          '<div class="field"><label for="cp-next">Nova senha</label><input class="input" id="cp-next" name="next" type="password" autocomplete="new-password" minlength="4" required></div>' +
          '<button class="btn btn--primary" type="submit">Alterar senha</button>' +
        "</form></div></div>" +

      '<div class="section"><div class="card card--pad">' +
        "<h2 style=\"font-size:16px\">🎨 Aparência</h2>" +
        '<div class="field mt-2"><label for="set-theme">Tema</label><select class="select" id="set-theme" data-action="set-theme">' +
        opt("auto", "Automático (sistema)") + opt("light", "Claro") + opt("dark", "Escuro") + "</select></div></div></div>" +

      '<div class="section"><div class="card card--pad">' +
        "<h2 style=\"font-size:16px\">💾 Conteúdo & backup</h2>" +
        '<p class="muted" style="font-size:13px">' + (syncOn
          ? "Com a sincronização ativa, o conteúdo já vai para todos os aparelhos automaticamente. A exportação serve para guardar uma cópia de segurança."
          : "O conteúdo é salvo neste navegador. Exporte para levar suas unidades e vídeos para outro computador/celular, ou para compartilhar com os alunos.") + "</p>" +
        '<div class="row-wrap mt-2">' +
          '<button class="btn btn--ghost" data-action="export-content">⬇️ Exportar conteúdo</button>' +
          '<button class="btn btn--ghost" data-action="import-content">⬆️ Importar conteúdo</button>' +
          '<input type="file" id="importFile" accept="application/json,.json" class="hidden">' +
        "</div></div></div>" +

      '<div class="section"><div class="card card--pad">' +
        "<h2 style=\"font-size:16px\">⚠️ Zona de risco</h2>" +
        '<div class="row-wrap mt-2">' +
          '<button class="btn btn--ghost" data-action="reset-content">Restaurar conteúdo original</button>' +
          '<button class="btn btn--danger" data-action="reset-all">Apagar todos os dados</button>' +
        "</div></div></div>" +

      '<div class="section"><div class="card card--pad muted" style="font-size:12.5px">' +
        (syncOn
          ? "<b>Sobre este app:</b> os dados são sincronizados em tempo real pelo <b>Firebase</b> — o que você escolhe aqui aparece nos aparelhos dos alunos, e o progresso da turma vem para cá. Uma cópia também fica salva em cada aparelho, então o app funciona mesmo offline."
          : "<b>Sobre este app:</b> é uma ferramenta de estudo que roda 100% no navegador. Os acessos e o progresso ficam salvos em cada aparelho. Para sincronizar automaticamente, veja o <b>README</b> (seção Firebase).") +
      "</div></div></div>";
  }

  function adminShell() {
    return '<div class="shell">' + topbar(state.user) + '<main class="main">' + adminBody() + "</main>" + bottomnav(state.user) + "</div>";
  }

  /* ============================================================
     RENDER
     ============================================================ */
  function render() {
    stopAudio(); abortRecording(); // encerra qualquer áudio/gravação ao trocar de tela
    var u = state.user;
    if (!u) { appEl.innerHTML = loginView(state._loginRole); return; }
    appEl.innerHTML = u.role === "admin" ? adminShell() : studentShell();
    afterRender();
  }
  function afterRender() {
    // ao abrir uma unidade (aluno), recarrega a gravação salva do exercício de fala
    if (state.user && state.user.role === "student" && state.screen === "unit" && state.unitId) {
      var unit = Store.getUnit(state.unitId);
      if (unit && unit.speaking) hydrateSpeaking(state.unitId);
    }
  }

  /* ============================================================
     EVENTS
     ============================================================ */
  function go(tab) { stopAudio(); state.tab = tab; state.screen = "main"; render(); window.scrollTo(0, 0); }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-action]");
    // backdrop click closes modal
    if (e.target.classList && e.target.classList.contains("modal")) { closeModal(); return; }
    if (!t) return;
    var a = t.getAttribute("data-action");

    switch (a) {
      case "auth-role": state._loginRole = t.getAttribute("data-role"); render(); break;
      case "logout":
        confirmModal("Sair", "Deseja sair da sua conta?", function () {
          stopAudio(); Auth.logout(); state.user = null; state.tab = "home"; state.screen = "main"; closeModal(); render();
        });
        break;
      case "cycle-theme": {
        var order = ["auto", "light", "dark"], cur = Store.getTheme();
        var next = order[(order.indexOf(cur) + 1) % 3];
        Store.setTheme(next); toast("Tema: " + (next === "auto" ? "automático" : next === "light" ? "claro" : "escuro"));
        break;
      }
      case "tab": go(t.getAttribute("data-tab")); break;
      case "open-unit": state.unitId = t.getAttribute("data-id"); state.screen = "unit"; render(); window.scrollTo(0, 0); break;
      case "back": stopAudio(); state.screen = "main"; render(); break;
      case "back-unit": stopAudio(); state.screen = "unit"; state.quiz = null; render(); window.scrollTo(0, 0); break;
      case "start-quiz":
      case "retry-quiz":
        stopAudio();
        state.unitId = t.getAttribute("data-id");
        state.quiz = { graded: false, answers: [], kind: t.getAttribute("data-kind") || "ex" };
        state.screen = "quiz"; render(); window.scrollTo(0, 0);
        break;
      case "play": {
        var yt = t.getAttribute("data-yt"), key = t.getAttribute("data-key");
        stopAudio();
        openVideoModal(yt, t.getAttribute("data-title"));
        if (state.user && state.user.role === "student" && key) Store.markWatched(state.user.id, key);
        break;
      }
      case "play-dialogue": playDialogue(Store.getUnit(t.getAttribute("data-id"))); break;
      case "read-aloud": playReading(Store.getUnit(t.getAttribute("data-id"))); break;
      case "stop-audio": stopAudio(); highlightLine(-1); break;
      case "toggle-pt": { var db = $("#dialogueBox"); if (db) db.classList.toggle("show-pt"); break; }
      case "rec-toggle": { stopAudio(); var rid = t.getAttribute("data-id"); if (rec.active) stopRecording(); else startRecording(rid); break; }
      case "rec-delete": deleteRecording(t.getAttribute("data-id")); break;
      case "speak-example": {
        var su = Store.getUnit(t.getAttribute("data-id"));
        if (su && su.speaking) playClips([{ url: "assets/audio/" + su.id + "/speaking.mp3", text: su.speaking.example, s: "R" }], null, null);
        break;
      }
      case "play-vocab": {
        var vu = Store.getUnit(t.getAttribute("data-id")), vi = parseInt(t.getAttribute("data-i"), 10);
        if (vu && vu.vocabulary && vu.vocabulary[vi]) playClips([{ url: "assets/audio/" + vu.id + "/vocab-" + vi + ".mp3", text: vu.vocabulary[vi].en, s: "R" }], null, null);
        break;
      }
      case "yt-search": {
        var input = $("#videoSearch");
        var q = (input && input.value.trim()) || "basic english for beginners";
        window.open(ytSearchUrl(q + " for beginners"), "_blank", "noopener");
        break;
      }
      case "yt-search-q": window.open(ytSearchUrl(t.getAttribute("data-q")), "_blank", "noopener"); break;
      case "filter": state.filter = t.getAttribute("data-filter"); render(); break;

      case "close-modal": closeModal(); break;
      case "confirm-yes": { var fn = pendingConfirm; closeModal(); if (fn) fn(); break; }

      /* ---- admin ---- */
      case "toggle-feature": {
        var on = Store.toggleFeatured(t.getAttribute("data-id"));
        toast(on ? "Marcada como recomendada ★" : "Removida das recomendadas", "ok");
        render();
        break;
      }
      case "manage-ex": manageExercises(t.getAttribute("data-id")); break;
      case "del-ex": {
        var uid = t.getAttribute("data-unit"), k = t.getAttribute("data-idx");
        Store.removeExercise(uid, k); manageExercises(uid); toast("Exercício removido");
        break;
      }
      case "del-video":
        Store.removeVideo(t.getAttribute("data-key")); toast("Vídeo removido"); render();
        break;
      case "reset-pw": {
        var id = t.getAttribute("data-id"), nm = t.getAttribute("data-name");
        openModal("Nova senha · " + esc(nm),
          '<form data-form="reset-pw" data-id="' + esc(id) + '"><div class="field"><label for="rp-pw">Nova senha</label>' +
          '<input class="input" id="rp-pw" name="pw" type="text" minlength="4" required></div>' +
          '<button class="btn btn--primary btn--block" type="submit">Salvar</button></form>');
        break;
      }
      case "del-student": {
        var sid = t.getAttribute("data-id"), snm = t.getAttribute("data-name");
        confirmModal("Excluir aluno", "Excluir o acesso de " + snm + "? O progresso será apagado.", function () {
          Store.deleteUser(sid); toast("Aluno excluído"); render();
        }, true);
        break;
      }
      case "export-content": downloadJSON("english-club-conteudo.json", Store.exportContentOnly()); toast("Conteúdo exportado", "ok"); break;
      case "import-content": { var f = $("#importFile"); if (f) f.click(); break; }
      case "reset-content":
        confirmModal("Restaurar conteúdo", "Isto recarrega as unidades e vídeos originais e remove os que você adicionou. Continuar?", function () {
          Store.resetContentToSeed(); toast("Conteúdo restaurado", "ok"); render();
        }, true);
        break;
      case "reset-all":
        confirmModal("Apagar tudo", "Isto apaga TODOS os dados (alunos, progresso e conteúdo) deste navegador. Não dá para desfazer!", function () {
          Store.resetAll(); location.reload();
        }, true);
        break;
    }
  });

  // keyboard: Escape closes modal; Tab is trapped inside an open modal; Enter/Space opens a unit card
  document.addEventListener("keydown", function (e) {
    var box = modalRoot.querySelector(".modal__box");
    if (box) {
      if (e.key === "Escape") { closeModal(); return; }
      if (e.key === "Tab") {
        var f = box.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (f.length) {
          var first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
      return; // while modal open, don't trigger background shortcuts
    }
    if ((e.key === "Enter" || e.key === " ")) {
      var t = e.target.closest && e.target.closest('[role="button"][data-action="open-unit"]');
      if (t) { e.preventDefault(); state.unitId = t.getAttribute("data-id"); state.screen = "unit"; render(); }
    }
  });

  // live search (preserve input focus)
  document.addEventListener("input", function (e) {
    if (e.target.id === "videoSearch") {
      state.search = e.target.value;
      var box = $("#videoResults");
      if (box) box.innerHTML = renderVideoResults();
    }
  });

  document.addEventListener("change", function (e) {
    if (e.target.id === "importFile" && e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function () {
        try {
          Store.importContent(JSON.parse(reader.result));
          toast("Conteúdo importado!", "ok"); render();
        } catch (err) { toast(err.message || "Arquivo inválido", "err"); }
      };
      reader.readAsText(e.target.files[0]);
    }
    if (e.target.getAttribute && e.target.getAttribute("data-action") === "set-theme") {
      Store.setTheme(e.target.value); toast("Tema atualizado", "ok");
    }
  });

  document.addEventListener("submit", function (e) {
    var form = e.target.closest("form[data-form]");
    if (!form) return;
    e.preventDefault();
    var kind = form.getAttribute("data-form");
    handleForm(kind, form).catch(function (err) { toast(err.message || "Erro", "err"); });
  });

  async function handleForm(kind, form) {
    var fd = new FormData(form);
    var get = function (n) { return (fd.get(n) || "").toString().trim(); };

    if (kind === "login") {
      var err = $("#lg-err");
      try {
        var user = await Auth.login(get("username"), get("password"));
        state.user = user; state.tab = defaultTab(user); state.screen = "main"; state.search = ""; state.filter = "all";
        render();
      } catch (ex) { if (err) err.textContent = ex.message; }
      return;
    }

    if (kind === "quiz") {
      stopAudio();
      var unit = Store.getUnit(form.getAttribute("data-unit"));
      var qkind = form.getAttribute("data-kind") || "ex";
      var questions = quizQuestions(unit, qkind);
      var answers = [], score = 0;
      questions.forEach(function (ex, i) {
        var val;
        if (ex.type === "mcq" || ex.type === "truefalse") {
          var checked = form.querySelector('input[name="q' + i + '"]:checked');
          val = checked ? checked.value : null;
        } else {
          var inp = form.querySelector('[name="q' + i + '"]');
          val = inp ? inp.value : "";
        }
        answers[i] = val;
        if (isCorrect(ex, val)) score++;
      });
      var total = questions.length;
      Store.saveUnitResult(state.user.id, quizSaveId(unit, qkind), score, total);
      state.quiz = { graded: true, answers: answers, score: score, total: total, kind: qkind };
      render(); window.scrollTo(0, 0);
      return;
    }

    if (kind === "add-video") {
      Store.addVideo({
        url: get("url"), title: get("title"), channel: get("channel"),
        level: get("level"), unitId: get("unitId"), addedBy: state.user.id
      });
      toast("Vídeo adicionado!", "ok"); render();
      return;
    }

    if (kind === "add-student") {
      await Store.createUser({ name: get("name"), username: get("username"), password: get("password"), role: "student" });
      toast("Acesso criado para " + get("name"), "ok"); render();
      return;
    }

    if (kind === "reset-pw") {
      await Store.setPassword(form.getAttribute("data-id"), get("pw"));
      closeModal(); toast("Senha atualizada", "ok");
      return;
    }

    if (kind === "change-pw") {
      var me = state.user;
      var ok = await Store.verifyPassword(get("current"), Store.getUserById(me.id).passHash);
      if (!ok) throw new Error("Senha atual incorreta.");
      await Store.setPassword(me.id, get("next"));
      form.reset(); toast("Senha alterada com sucesso", "ok");
      return;
    }

    if (kind === "add-ex") {
      var unitId = form.getAttribute("data-unit");
      var type = get("type"), ex = { type: type, question: get("question"), explanation: get("explanation") };
      if (type === "mcq") {
        var opts = get("options").split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean);
        if (opts.length < 2) throw new Error("Informe pelo menos 2 opções (uma por linha).");
        var idx = parseInt(get("answer"), 10) - 1;
        if (isNaN(idx) || idx < 0 || idx >= opts.length) throw new Error("Resposta certa deve ser o número de uma das opções.");
        ex.options = opts; ex.answer = idx;
      } else if (type === "truefalse") {
        var av = get("answer").toLowerCase();
        ex.answer = (av === "true" || av === "verdadeiro" || av === "v" || av === "t");
      } else {
        if (!get("answer")) throw new Error("Informe a palavra da resposta.");
        ex.answer = get("answer");
      }
      Store.addExercise(unitId, ex);
      manageExercises(unitId); toast("Exercício adicionado!", "ok");
      return;
    }
  }

  // Test hook (harmless in production) — lets a headless harness exercise pure logic.
  GSE._test = {
    isCorrect: isCorrect, normFill: normFill, normApos: normApos,
    overallStats: overallStats, allVideos: allVideos, filterVideos: filterVideos, setState: function (p) { Object.assign(state, p); }
  };

  // Hooks usados pela camada de sincronização (Firebase), se ativa.
  var _refreshTimer = null;
  GSE.App = {
    refresh: function () {
      if (rec && rec.active) return; // não re-renderiza enquanto o aluno está gravando a fala
      if (_refreshTimer) return;
      _refreshTimer = setTimeout(function () { _refreshTimer = null; if (rec && rec.active) return; try { render(); } catch (e) {} }, 250);
    },
    role: function () { return state.user ? state.user.role : null; },
    userId: function () { return state.user ? state.user.id : null; },
    toast: function (m, k) { try { toast(m, k); } catch (e) {} }
  };

  /* ============================================================
     BOOT
     ============================================================ */
  async function boot() {
    appEl = $("#app"); modalRoot = $("#modal-root"); toastRoot = $("#toast-root");
    try {
      await Store.init();
    } catch (e) {
      appEl.innerHTML = '<div class="empty"><div class="ic">⚠️</div><p>Não foi possível iniciar o app.<br>' + esc(e.message || "") + "</p></div>";
      return;
    }
    state.user = Auth.current();
    if (state.user) { state.tab = defaultTab(state.user); }
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})(window.GSE);
