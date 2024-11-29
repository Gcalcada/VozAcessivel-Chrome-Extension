let isReadingEnabled = false;
let currentTabId = null;

function enableReading() {
  isReadingEnabled = true;
  console.log("Leitura habilitada no background.js.");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      currentTabId = tabs[0].id;
      chrome.tabs.sendMessage(currentTabId, { action: "enableReading" });
      chrome.tabs.sendMessage(currentTabId, { action: "readTitle" });
      chrome.tabs.sendMessage(currentTabId, { action: "enableHoverToRead" });
    }
  });
}

function disableReading() {
  isReadingEnabled = false;
  console.log("Leitura desabilitada no background.js.");

  if (currentTabId) {
    chrome.tabs.sendMessage(currentTabId, { action: "disableReading" });
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "enableReading") {
    enableReading();
  } else if (message.action === "disableReading") {
    disableReading();
  }
});
