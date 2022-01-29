let scrapButton = document.getElementById("scrap-btn");

console.log("hola en el contexte de la extension");

scrapButton.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab !== null) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: profileScrapper,
    });
  }
});

const profileScrapper = () => {
  const queries = {
    name: document.querySelector(
      "#ember36 > div.ph5.pb5 > div.mt2.relative > div:nth-child(1) > div:nth-child(1) > h1"
    ),
  };

  const linkedinProfile = {
    name: queries.name?.innerText,
  };

  console.log(linkedinProfile);
  console.log("hola en pagina a inyectar");
};
