let isReading = false;
let isReadingEnabled = false;

function readTitle() {
  if (isReading || !isReadingEnabled) {
    console.log(
      "Leitura do título ignorada: isReading =",
      isReading,
      "isReadingEnabled =",
      isReadingEnabled
    );
    return;
  }
  isReading = true;

  const title = document.title;
  const utterance = new SpeechSynthesisUtterance(title);
  utterance.onend = () => {
    isReading = false;
  };

  console.log("Lendo título:", title);
  speechSynthesis.speak(utterance);
}

function enableHoverToRead() {
  if (!isReadingEnabled) {
    console.log("Hover desativado, leitura não habilitada.");
    return;
  }

  console.log("Hover habilitado para leitura.");
  const elementsToRead = document.querySelectorAll(
    "p, h1, h2, h3, h4, h5, h6, a, span, img, ol > li, tr > td > h1, ul > li, nav > ul > li > a"
  );

  let currentUtterance = null;

  elementsToRead.forEach((element) => {
    element.addEventListener("mouseover", () => {
      if (!isReadingEnabled) {
        console.log("Hover ignorado, leitura não habilitada.");
        return;
      }

      console.log("Lendo elemento:", element.innerText);
      if (currentUtterance) {
        speechSynthesis.cancel();
      }
      currentUtterance = new SpeechSynthesisUtterance(element.innerText);
      speechSynthesis.speak(currentUtterance);
    });
  });
}

function enableReading() {
  isReadingEnabled = true;
  console.log("Leitura habilitada no content.js.");
}

function disableReading() {
  isReadingEnabled = false;
  speechSynthesis.cancel();
  console.log("Leitura desabilitada no content.js.");
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "readTitle") {
    readTitle();
  } else if (message.action === "enableHoverToRead") {
    enableHoverToRead();
  } else if (message.action === "disableReading") {
    disableReading();
  } else if (message.action === "enableReading") {
    enableReading();
  }
});
