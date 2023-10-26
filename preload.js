const pkg = require("./package.json");
const os = require("node:os");
const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const practiceButton = document.getElementById("practice");

  practiceButton.addEventListener("click", (e) => {
    ipcRenderer.send("practice");
  });

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  replaceText(`app-version`, `v${pkg.version}`);
});
