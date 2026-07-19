/* ============================================================
   store.js — persistence layer (localStorage) + password hashing.

   NOTE ON SECURITY: this is a client-side classroom app. Data and
   password hashes live in the browser's localStorage on each device.
   It is great for teaching/demos, but it is NOT a substitute for a
   real backend with server-side authentication. See README.md for the
   upgrade path (Firebase / Supabase).
   ============================================================ */
window.GSE = window.GSE || {};

(function (GSE) {
  "use strict";

  var KEY = {
    users: "gse.users",
    content: "gse.content",
    progress: "gse.progress",
    speaking: "gse.speaking",
    session: "gse.session",
    theme: "gse.theme",
    ver: "gse.version"
  };
  var DATA_VERSION = 6; // v6: vocabulário resumido + áudio por palavra corrigido; conteúdo versionado p/ sync

  /* ---------- low-level JSON storage ---------- */
  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch (e) {
      console.warn("Falha ao ler", key, e);
      return fallback;
    }
  }
  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Notifica a camada de sync (Firebase), se ativa. Ignorado se ausente.
      try { if (GSE.Sync && GSE.Sync.onLocalWrite) GSE.Sync.onLocalWrite(key, value); } catch (e2) {}
      return true;
    } catch (e) {
      console.error("Falha ao salvar", key, e);
      return false;
    }
  }
  // Grava sem disparar o sync (usado pela própria camada de sync ao aplicar dados remotos).
  function writeLocalOnly(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (e) { return false; }
  }

  /* ---------- id + password hashing ---------- */
  function uid(prefix) {
    // Time/random-free-safe: derived from counter + performance clock.
    var seed = (typeof performance !== "undefined" && performance.now)
      ? Math.floor(performance.now() * 1000) : 0;
    uid._n = (uid._n || 0) + 1;
    return (prefix || "id") + "_" + seed.toString(36) + uid._n.toString(36);
  }

  // Simple deterministic fallback hash (djb2) — used only if SubtleCrypto absent.
  function weakHash(str) {
    var h = 5381;
    for (var i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
    return "w1$" + h.toString(16);
  }

  async function hashPassword(pw) {
    var salted = "gabi-english::" + pw;
    try {
      if (window.crypto && crypto.subtle && crypto.subtle.digest) {
        var buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(salted));
        var bytes = Array.from(new Uint8Array(buf));
        return "s1$" + bytes.map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
      }
    } catch (e) { /* fall through to weak hash */ }
    return weakHash(salted);
  }

  async function verifyPassword(pw, stored) {
    // Support both hash schemes so seeded/legacy users always work.
    if (typeof stored !== "string") return false;
    if (stored.indexOf("w1$") === 0) return weakHash("gabi-english::" + pw) === stored;
    var h = await hashPassword(pw);
    return h === stored;
  }

  /* ============================================================
     USERS
     ============================================================ */
  function getUsers() { return read(KEY.users, []); }
  function saveUsers(list) { return write(KEY.users, list); }

  function findUser(username) {
    var u = (username || "").trim().toLowerCase();
    return getUsers().find(function (x) { return x.username.toLowerCase() === u; }) || null;
  }
  function getUserById(id) {
    return getUsers().find(function (x) { return x.id === id; }) || null;
  }

  async function createUser(data) {
    var users = getUsers();
    var uname = (data.username || "").trim().toLowerCase();
    if (!uname) throw new Error("Informe um nome de usuário.");
    if (uname.length < 3) throw new Error("O usuário deve ter ao menos 3 caracteres.");
    if (!data.password || data.password.length < 4) throw new Error("A senha deve ter ao menos 4 caracteres.");
    if (findUser(uname)) throw new Error("Já existe um usuário com esse nome.");
    var user = {
      id: uid("u"),
      name: (data.name || "").trim() || uname,
      username: uname,
      passHash: await hashPassword(data.password),
      role: data.role === "admin" ? "admin" : "student",
      createdAt: data.createdAt || 0
    };
    users.push(user);
    saveUsers(users);
    return user;
  }

  function deleteUser(id) {
    var users = getUsers().filter(function (u) { return u.id !== id; });
    saveUsers(users);
    // Clean up progress
    var prog = read(KEY.progress, {});
    if (prog[id]) { delete prog[id]; write(KEY.progress, prog); }
  }

  async function setPassword(id, newPw) {
    if (!newPw || newPw.length < 4) throw new Error("A senha deve ter ao menos 4 caracteres.");
    var users = getUsers();
    var u = users.find(function (x) { return x.id === id; });
    if (!u) throw new Error("Usuário não encontrado.");
    u.passHash = await hashPassword(newPw);
    saveUsers(users);
    return true;
  }

  function updateUser(id, patch) {
    var users = getUsers();
    var u = users.find(function (x) { return x.id === id; });
    if (!u) return null;
    if (patch.name != null) u.name = String(patch.name).trim() || u.name;
    saveUsers(users);
    return u;
  }

  /* ============================================================
     SESSION
     ============================================================ */
  function getSession() { return read(KEY.session, null); }
  function setSession(userId) { write(KEY.session, userId); }
  function clearSession() { try { localStorage.removeItem(KEY.session); } catch (e) {} }

  /* ============================================================
     CONTENT  (units + teacher-added videos + featured list)
     ============================================================ */
  function defaultContent() {
    var seed = (GSE.SEED && GSE.SEED.units) ? GSE.SEED.units : [];
    // Deep clone so seed isn't mutated
    var units = JSON.parse(JSON.stringify(seed));
    return {
      units: units,
      extraVideos: [],                 // teacher-added standalone videos
      featured: units.slice(0, 3).map(function (u) { return u.id; }), // first units featured by default
      seedVersion: (GSE.SEED && GSE.SEED.version) || 0, // versão do conteúdo (para o sync saber o que é mais novo)
      updatedAt: 0
    };
  }
  function seedVersion() { return (GSE.SEED && GSE.SEED.version) || 0; }
  function getContent() {
    var c = read(KEY.content, null);
    if (!c) { c = defaultContent(); write(KEY.content, c); }
    // Ensure collections are always arrays (self-heals any corrupted/old storage).
    if (!Array.isArray(c.extraVideos)) c.extraVideos = [];
    if (!Array.isArray(c.featured)) c.featured = [];
    if (!Array.isArray(c.units)) c.units = [];
    return c;
  }
  function saveContent(c) { c.updatedAt = 0; return write(KEY.content, c); }

  function getUnit(id) {
    return getContent().units.find(function (u) { return u.id === id; }) || null;
  }

  function toggleFeatured(unitId) {
    var c = getContent();
    var i = c.featured.indexOf(unitId);
    if (i >= 0) c.featured.splice(i, 1); else c.featured.push(unitId);
    saveContent(c);
    return c.featured.indexOf(unitId) >= 0;
  }

  // Parse a YouTube id from many URL shapes (watch, youtu.be, embed, shorts).
  function parseYouTubeId(input) {
    if (!input) return null;
    var s = String(input).trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s; // already an id
    var m =
      s.match(/[?&]v=([a-zA-Z0-9_-]{11})/) ||
      s.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/) ||
      s.match(/\/embed\/([a-zA-Z0-9_-]{11})/) ||
      s.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
  }

  function addVideo(data) {
    var id = parseYouTubeId(data.url || data.youtubeId);
    if (!id) throw new Error("Não consegui identificar o vídeo. Cole um link válido do YouTube.");
    var c = getContent();
    var video = {
      key: uid("v"),
      youtubeId: id,
      url: "https://www.youtube.com/watch?v=" + id,
      title: (data.title || "").trim() || "Vídeo de inglês",
      channel: (data.channel || "").trim(),
      level: data.level === "A2" ? "A2" : "A1",
      unitId: data.unitId || "",     // optional: attach to a unit topic
      note: (data.note || "").trim(),
      addedBy: data.addedBy || ""
    };
    c.extraVideos.unshift(video);
    saveContent(c);
    return video;
  }
  function removeVideo(key) {
    var c = getContent();
    c.extraVideos = c.extraVideos.filter(function (v) { return v.key !== key; });
    saveContent(c);
  }

  function addExercise(unitId, ex) {
    var c = getContent();
    var unit = c.units.find(function (u) { return u.id === unitId; });
    if (!unit) throw new Error("Unidade não encontrada.");
    if (!unit.exercises) unit.exercises = [];
    ex.custom = true;
    ex.key = uid("ex");
    unit.exercises.push(ex);
    saveContent(c);
    return ex;
  }
  // Remove by exercise key (custom exercises) OR by numeric index (seed exercises
  // have no key). Callers re-render right after, so index-based removal is safe.
  function removeExercise(unitId, ref) {
    var c = getContent();
    var unit = c.units.find(function (u) { return u.id === unitId; });
    if (!unit || !unit.exercises) return;
    var idx = -1;
    if (typeof ref === "string" && isNaN(Number(ref))) {
      idx = unit.exercises.findIndex(function (e) { return e.key === ref; });
    }
    if (idx < 0) {
      var n = parseInt(ref, 10);
      if (!isNaN(n)) idx = n;
    }
    if (idx >= 0 && idx < unit.exercises.length) {
      unit.exercises.splice(idx, 1);
      saveContent(c);
    }
  }

  /* ============================================================
     PROGRESS  (per user)
     ============================================================ */
  function getProgress(userId) {
    var all = read(KEY.progress, {});
    return all[userId] || { units: {}, watched: [] };
  }
  function saveUnitResult(userId, unitId, score, total) {
    var all = read(KEY.progress, {});
    if (!all[userId]) all[userId] = { units: {}, watched: [] };
    var prev = all[userId].units[unitId];
    var best = prev ? Math.max(prev.best || 0, score) : score;
    all[userId].units[unitId] = {
      score: score, total: total,
      best: best, bestTotal: total,
      attempts: (prev ? (prev.attempts || 0) : 0) + 1,
      at: 0
    };
    write(KEY.progress, all);
  }
  function markWatched(userId, videoKey) {
    var all = read(KEY.progress, {});
    if (!all[userId]) all[userId] = { units: {}, watched: [] };
    if (!all[userId].watched) all[userId].watched = [];
    if (all[userId].watched.indexOf(videoKey) < 0) {
      all[userId].watched.push(videoKey);
      write(KEY.progress, all);
    }
  }
  function getAllProgress() { return read(KEY.progress, {}); }

  /* ============================================================
     SPEAKING (resultado do exercício de fala por usuário/unidade)
     ============================================================ */
  function getSpeaking(userId) {
    var all = read(KEY.speaking, {});
    return all[userId] || {};
  }
  function saveSpeaking(userId, unitId, data) {
    var all = read(KEY.speaking, {});
    if (!all[userId]) all[userId] = {};
    all[userId][unitId] = data;
    write(KEY.speaking, all);
  }
  function clearSpeaking(userId, unitId) {
    var all = read(KEY.speaking, {});
    if (all[userId] && all[userId][unitId]) { delete all[userId][unitId]; write(KEY.speaking, all); }
  }

  /* ============================================================
     THEME
     ============================================================ */
  function getTheme() { return read(KEY.theme, "auto"); }
  function setTheme(t) {
    write(KEY.theme, t);
    if (t === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
  }

  /* ============================================================
     EXPORT / IMPORT / RESET
     ============================================================ */
  function exportAll() {
    return {
      app: "english-club-gabi",
      version: DATA_VERSION,
      content: getContent(),
      users: getUsers().map(function (u) {
        // never export password hashes in the shareable content pack
        return { id: u.id, name: u.name, username: u.username, role: u.role };
      })
    };
  }
  function exportContentOnly() {
    return { app: "english-club-gabi", version: DATA_VERSION, content: getContent() };
  }
  function importContent(obj) {
    if (!obj || !obj.content || !Array.isArray(obj.content.units)) {
      throw new Error("Arquivo inválido. Use um arquivo exportado por este app.");
    }
    var c = obj.content;
    // Coerce top-level collections to arrays so a malformed pack can never brick the UI.
    c.units = Array.isArray(c.units) ? c.units : [];
    c.extraVideos = Array.isArray(c.extraVideos) ? c.extraVideos : [];
    c.featured = Array.isArray(c.featured) ? c.featured : [];
    // Re-validate every YouTube id so imported content cannot inject markup via a video src.
    c.units.forEach(function (u) {
      if (Array.isArray(u.videos)) {
        u.videos = u.videos.filter(function (v) {
          var id = parseYouTubeId(v && (v.youtubeId || v.url));
          if (!id) return false;
          v.youtubeId = id;
          return true;
        });
      } else { u.videos = []; }
      if (!Array.isArray(u.exercises)) u.exercises = [];
    });
    c.extraVideos = c.extraVideos.filter(function (v) {
      var id = parseYouTubeId(v && (v.youtubeId || v.url));
      if (!id) return false;
      v.youtubeId = id;
      return true;
    });
    write(KEY.content, c);
    return true;
  }
  function resetAll() {
    [KEY.users, KEY.content, KEY.progress, KEY.session].forEach(function (k) {
      try { localStorage.removeItem(k); } catch (e) {}
    });
  }
  function resetContentToSeed() {
    write(KEY.content, defaultContent());
  }

  /* ============================================================
     INIT — ensure default admin + demo student exist.
     ============================================================ */
  async function init() {
    // apply theme early
    setTheme(getTheme());

    // Migration: if the stored content is from an older seed version, reload the
    // new default content (the apostila units). Brand-new installs (ver 0) just
    // seed fresh below. This ensures returning students get the updated content.
    var ver = read(KEY.ver, 0);
    if (ver !== DATA_VERSION) {
      if (ver >= 1) { try { resetContentToSeed(); } catch (e) {} }
      write(KEY.ver, DATA_VERSION);
    }

    // ensure content exists
    getContent();

    // seed users on first run
    if (getUsers().length === 0) {
      await createUser({ name: "Professora Gabi", username: "gabi", password: "gabi123", role: "admin" });
      await createUser({ name: "Aluno Demo", username: "aluno", password: "aluno123", role: "student" });
    }
  }

  GSE.Store = {
    KEY: KEY,
    // users
    getUsers: getUsers, findUser: findUser, getUserById: getUserById,
    createUser: createUser, deleteUser: deleteUser, setPassword: setPassword, updateUser: updateUser,
    verifyPassword: verifyPassword, hashPassword: hashPassword,
    // session
    getSession: getSession, setSession: setSession, clearSession: clearSession,
    // content
    getContent: getContent, saveContent: saveContent, getUnit: getUnit,
    toggleFeatured: toggleFeatured, addVideo: addVideo, removeVideo: removeVideo,
    addExercise: addExercise, removeExercise: removeExercise, parseYouTubeId: parseYouTubeId,
    // progress
    getProgress: getProgress, saveUnitResult: saveUnitResult, markWatched: markWatched, getAllProgress: getAllProgress,
    // speaking
    getSpeaking: getSpeaking, saveSpeaking: saveSpeaking, clearSpeaking: clearSpeaking,
    // theme
    getTheme: getTheme, setTheme: setTheme,
    // io
    exportAll: exportAll, exportContentOnly: exportContentOnly, importContent: importContent,
    resetAll: resetAll, resetContentToSeed: resetContentToSeed,
    // sync helpers
    writeLocalOnly: writeLocalOnly, read: read, seedVersion: seedVersion,
    // lifecycle
    init: init, uid: uid
  };
})(window.GSE);
