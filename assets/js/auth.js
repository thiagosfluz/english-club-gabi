/* ============================================================
   auth.js — login / logout / current session helpers.
   ============================================================ */
window.GSE = window.GSE || {};

(function (GSE) {
  "use strict";
  var Store = GSE.Store;

  async function login(username, password) {
    var user = Store.findUser(username);
    if (!user) throw new Error("Usuário ou senha incorretos.");
    var ok = await Store.verifyPassword(password, user.passHash);
    if (!ok) throw new Error("Usuário ou senha incorretos.");
    Store.setSession(user.id);
    return user;
  }

  function logout() { Store.clearSession(); }

  function current() {
    var id = Store.getSession();
    if (!id) return null;
    return Store.getUserById(id);
  }

  function isAdmin(user) { return !!user && user.role === "admin"; }

  GSE.Auth = { login: login, logout: logout, current: current, isAdmin: isAdmin };
})(window.GSE);
