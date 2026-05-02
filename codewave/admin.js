/**
 * Sessão só no navegador (sessionStorage). Em produção use backend + HTTPS.
 * Não commite credenciais reais em repositórios públicos.
 */
(function () {
  var SESSION_KEY = "codewave_admin_ok";
  var USER = "LOGIN123";
  var PASS = "SENHA123";

  var loginScreen = document.getElementById("login-screen");
  var adminPanel = document.getElementById("admin-panel");
  var form = document.getElementById("admin-form");
  var err = document.getElementById("admin-error");
  var logoutBtn = document.getElementById("admin-logout");

  function showLogin() {
    if (loginScreen) loginScreen.hidden = false;
    if (adminPanel) adminPanel.hidden = true;
  }

  function showPanel() {
    if (loginScreen) loginScreen.hidden = true;
    if (adminPanel) adminPanel.hidden = false;
    if (err) err.hidden = true;
  }

  function isSessionActive() {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  }

  if (isSessionActive()) {
    showPanel();
  } else {
    showLogin();
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var u = (document.getElementById("admin-user") || {}).value || "";
      var p = (document.getElementById("admin-pass") || {}).value || "";
      if (u === USER && p === PASS) {
        sessionStorage.setItem(SESSION_KEY, "1");
        showPanel();
        form.reset();
      } else {
        if (err) err.hidden = false;
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      sessionStorage.removeItem(SESSION_KEY);
      showLogin();
    });
  }
})();
