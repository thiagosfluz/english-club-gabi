/* ============================================================
   sync.js — Sincronização em tempo real via Firebase (Firestore + Auth).

   Modelo (seguro e simples):
   - CONTEÚDO e USUÁRIOS (o que a professora escolhe e os acessos):
       só a PROFESSORA (admin) envia; todos os aparelhos RECEBEM em
       tempo real. Assim os alunos não sobrescrevem o conteúdo.
   - PROGRESSO: cada aluno envia o SEU progresso (um documento por
       usuário). O aparelho da professora junta todos para ver a turma.

   Se o Firebase não estiver configurado (firebase-config.js vazio),
   este módulo não faz nada e o app segue com localStorage.
   ============================================================ */
window.GSE = window.GSE || {};

(function (GSE) {
  "use strict";

  var cfg = window.GSE_FIREBASE || {};
  var enabled = !!(cfg && cfg.apiKey && cfg.projectId);

  var KEY_CONTENT = "gse.content", KEY_USERS = "gse.users", KEY_PROGRESS = "gse.progress";
  var SHARED = [KEY_CONTENT, KEY_USERS]; // admin envia, todos recebem

  var ready = false, db = null, applying = false;

  // Interface consumida por store.js (write hook). Definida já, mesmo antes do SDK carregar.
  GSE.Sync = {
    ok: false,
    enabled: enabled,
    onLocalWrite: function (key, value) {
      if (!ready || applying) return;
      try {
        if (SHARED.indexOf(key) >= 0) {
          if (GSE.App && GSE.App.role && GSE.App.role() === "admin") pushDoc(docId(key), JSON.stringify(value));
        } else if (key === KEY_PROGRESS) {
          pushMyProgress(value);
        }
      } catch (e) {}
    }
  };

  if (!enabled) return; // sem config → app funciona só local

  loadScripts([
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js",
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"
  ], init);

  function loadScripts(urls, cb) {
    var i = 0;
    (function next() {
      if (i >= urls.length) { cb(); return; }
      var s = document.createElement("script");
      s.src = urls[i++];
      s.onload = next;
      s.onerror = function () { console.warn("[sync] falha ao carregar", s.src); };
      document.head.appendChild(s);
    })();
  }

  function init() {
    try {
      if (!window.firebase) { console.warn("[sync] SDK do Firebase indisponível"); return; }
      firebase.initializeApp(cfg);
      db = firebase.firestore();
      firebase.auth().signInAnonymously().catch(function (e) {
        console.warn("[sync] Auth anônima falhou — habilite 'Anônimo' no console.", e && e.code);
      });
      firebase.auth().onAuthStateChanged(function (user) { if (user && !ready) start(); });
    } catch (e) { console.warn("[sync] init erro", e); }
  }

  function col() { return db.collection("gse_state"); }
  function docId(key) { return key.replace(/[^a-z0-9]/gi, "_"); }

  function start() {
    ready = true; GSE.Sync.ok = true;

    // 1) Recebe conteúdo e usuários em tempo real.
    SHARED.forEach(function (key) {
      col().doc(docId(key)).onSnapshot(function (snap) {
        if (snap.exists) { var d = snap.data(); if (d && typeof d.json === "string") applyRemote(key, d.json); }
      }, function (err) { console.warn("[sync] snapshot", key, err && err.code); });
    });

    // 2) Progresso: a professora (admin) escuta TODOS os documentos de progresso e junta.
    if (GSE.App && GSE.App.role && GSE.App.role() === "admin") {
      col().where("kind", "==", "progress").onSnapshot(function (qs) {
        var merged = {};
        qs.forEach(function (docSnap) {
          var d = docSnap.data();
          if (d && d.userId && typeof d.json === "string") { try { merged[d.userId] = JSON.parse(d.json).__entry; } catch (e) {} }
        });
        applyRemoteObject(KEY_PROGRESS, merged);
      }, function (err) { console.warn("[sync] progress snapshot", err && err.code); });
    }

    // 3) Empurra o estado local atual (cobre mudanças feitas antes de conectar).
    if (GSE.App && GSE.App.role && GSE.App.role() === "admin") {
      SHARED.forEach(function (key) { var raw = localStorage.getItem(key); if (raw != null) pushDoc(docId(key), raw); });
    }
    pushMyProgressFromLocal();

    if (GSE.App && GSE.App.refresh) GSE.App.refresh();
    if (GSE.App && GSE.App.toast) GSE.App.toast("☁️ Sincronização ativada", "ok");
  }

  function pushDoc(id, json) {
    try {
      col().doc(id).set({ json: json, at: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true })
        .catch(function (e) { console.warn("[sync] push", id, e && e.code); });
    } catch (e) {}
  }

  // Progresso: guarda só a entrada do usuário atual num doc próprio (progress_<uid>).
  function pushMyProgress(progressObj) {
    var uid = GSE.App && GSE.App.userId && GSE.App.userId();
    if (!uid || !progressObj) return;
    var entry = progressObj[uid];
    if (!entry) return;
    try {
      col().doc("progress_" + docId(uid)).set({
        kind: "progress", userId: uid, json: JSON.stringify({ __entry: entry }),
        at: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true }).catch(function () {});
    } catch (e) {}
  }
  function pushMyProgressFromLocal() {
    try { var raw = localStorage.getItem(KEY_PROGRESS); if (raw != null) pushMyProgress(JSON.parse(raw)); } catch (e) {}
  }

  function applyRemote(key, json) {
    if (localStorage.getItem(key) === json) return;
    var val;
    try { val = JSON.parse(json); } catch (e) { return; }
    // Conteúdo: só aceita do Firestore se a versão for igual ou mais nova que a do app.
    if (key === KEY_CONTENT) {
      var localSeed = (GSE.Store && GSE.Store.seedVersion) ? GSE.Store.seedVersion() : 0;
      var remoteSeed = (val && val.seedVersion) || 0;
      if (remoteSeed < localSeed) {
        // Firestore está com conteúdo antigo → não aplica. Se for a professora, reenvia o novo.
        if (GSE.App && GSE.App.role && GSE.App.role() === "admin") {
          var raw = localStorage.getItem(KEY_CONTENT); if (raw) pushDoc(docId(KEY_CONTENT), raw);
        }
        return;
      }
    }
    applying = true;
    try { if (GSE.Store && GSE.Store.writeLocalOnly) GSE.Store.writeLocalOnly(key, val); else localStorage.setItem(key, json); } catch (e) {}
    applying = false;
    if (GSE.App && GSE.App.refresh) GSE.App.refresh();
  }
  // Mescla progresso remoto (de todos os alunos) no objeto local, sem apagar entradas locais.
  function applyRemoteObject(key, obj) {
    applying = true;
    try {
      var cur = {};
      try { cur = JSON.parse(localStorage.getItem(key) || "{}"); } catch (e) { cur = {}; }
      Object.keys(obj).forEach(function (uid) { if (obj[uid]) cur[uid] = obj[uid]; });
      if (GSE.Store && GSE.Store.writeLocalOnly) GSE.Store.writeLocalOnly(key, cur);
    } catch (e) {}
    applying = false;
    if (GSE.App && GSE.App.refresh) GSE.App.refresh();
  }
})(window.GSE);
