const settingsBtn = document.getElementById("settings-btn");
const dialog = document.getElementById("dialog");
const passwordForm = document.getElementById("password-form");

settingsBtn.addEventListener("click", () => dialog.showModal());
passwordForm.addEventListener("click", e => {
  e.preventDefault();
  dialog.close();
});
