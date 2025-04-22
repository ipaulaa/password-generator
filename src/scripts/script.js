function generatePassword({ length, hasUppercase, hasNumber, hasSymbol }) {
  const passwordArray = [];
  let passwordChars = CHARACTERS.lowercase;

  if (hasUppercase) {
    passwordArray.push(randomChar(CHARACTERS.uppercase));
    passwordChars += CHARACTERS.uppercase;
    length--;
  }

  if (hasNumber) {
    passwordArray.push(randomChar(CHARACTERS.numbers));
    passwordChars += CHARACTERS.numbers;
    length--;
  }

  if (hasSymbol) {
    passwordArray.push(randomChar(CHARACTERS.symbols));
    passwordChars += CHARACTERS.symbols;
    length--;
  }

  console.log();
  for (let i = 0; i < length; i++) {
    passwordArray.push(randomChar(passwordChars));
  }

  shuffleArray(passwordArray);

  return passwordArray.join("");
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomChar(str) {
  const index = Math.floor(Math.random() * str.length);
  return str[index];
}

function copyPassword(e) {
  navigator.clipboard.writeText(e.target.textContent).then(() => {
    copyEl.textContent = "Copied!";
    setTimeout(() => (copyEl.textContent = ""), 700);
  }).catch(() => console.error("Not Allowed!"));
}

const CHARACTERS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?/"
};

const settings = {
  length: 15,
  hasUppercase: false,
  hasNumber: false,
  hasSymbol: false
};

const generatorBtn = document.getElementById("generator-btn");
const settingsBtn = document.getElementById("settings-btn");

const password1 = document.getElementById("password-1");
const password2 = document.getElementById("password-2");

const modal = document.getElementById("modal");
const form = document.getElementById("form");

const copyEl = document.getElementById("copy-el");

generatorBtn.addEventListener("click", () => {
  password1.textContent = generatePassword(settings);
  password2.textContent = generatePassword(settings);
});

settingsBtn.addEventListener("click", () => modal.showModal());

form.addEventListener("submit", e => {
  const formData = new FormData(e.target);

  settings.length = Number(formData.get("length"));
  settings.hasUppercase = formData.get("uppercase") !== null;
  settings.hasNumber = formData.get("number") !== null;
  settings.hasSymbol = formData.get("symbol") !== null;
});

password1.addEventListener("click", copyPassword);
password2.addEventListener("click", copyPassword);
