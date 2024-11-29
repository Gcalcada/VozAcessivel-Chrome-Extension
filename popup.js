// popup.js
document.getElementById("readText").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "enableReading" });
});

document.getElementById("stopText").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "disableReading" });
});
