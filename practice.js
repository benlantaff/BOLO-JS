const pkg = require("./package.json");
const os = require("node:os");
const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const exitButton = document.getElementById("exit");

  exitButton.addEventListener("click", (e) => {
    ipcRenderer.send("exit");
  });
});
