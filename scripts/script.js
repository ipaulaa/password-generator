const generateBtn = document.getElementById("generate-btn");
const settingsBtn = document.getElementById("settings-btn");
const dialog = document.getElementById("dialog");
const passwordForm = document.getElementById("password-form");

const password1 = document.getElementById("password-1");
const password2 = document.getElementById("password-2");
const copy = document.getElementById("copy");

const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "~!@#$%^&*()_-+={[}],|:;<>.?/";

const formData = {};

function setFormData() {
  formData.size = parseInt(passwordForm.elements.size.value);

  const keys = ["uppercase", "number", "symbol"];
  for (const key of keys) {
    formData[key] = passwordForm.elements[key].checked;
  }
}

function randomIndex(size) {
  return Math.floor(Math.random() * size);
}

function generatePassword() {
  const passwordArray = [];

  passwordArray.push(lowercase[randomIndex(lowercase.length)]);

  let characters = lowercase;

  if (formData.uppercase) {
    passwordArray.push(uppercase[randomIndex(uppercase.length)]);
    characters += uppercase;
  }

  if (formData.number) {
    passwordArray.push(numbers[randomIndex(numbers.length)]);
    characters += numbers;
  }

  if (formData.symbol) {
    passwordArray.push(symbols[randomIndex(symbols.length)]);
    characters += symbols;
  }

  while (passwordArray.length < formData.size) {
    passwordArray.push(characters[randomIndex(characters.length)]);
  }

  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  return passwordArray.join("");
}

function copyPassword(output) {
  navigator.clipboard
    .writeText(output.textContent)
    .then(() => {
      copy.textContent = "Copied!";
      setTimeout(() => (copy.textContent = ""), 2500);
    })
    .catch(() => {
      copy.textContent = "Failed to copy text!";
      setTimeout(() => (copy.textContent = ""), 2500);
    });
}

generateBtn.addEventListener("click", () => {
  password1.textContent = generatePassword();
  password2.textContent = generatePassword();
});

settingsBtn.addEventListener("click", () => dialog.showModal());
passwordForm.addEventListener("submit", () => {
  setFormData();
  dialog.close();
});

password1.addEventListener("dblclick", () => copyPassword(password1));
password2.addEventListener("dblclick", () => copyPassword(password2));

setFormData();
