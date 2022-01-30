let scrapButton = document.getElementById("scrap-btn");

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
  const querySelectorForEach = (array, selector) =>
    array.map((item) => item.querySelector(selector));

  let nombre = document.querySelector(
    "div.ph5 > div.mt2.relative > div:nth-child(1) > div:nth-child(1) > h1"
  );

  let experienciasLaborales = Array.from(
    document.querySelectorAll(
      "#ember144 > div.pvs-list__outer-container > ul > li"
    )
  );

  let roles = querySelectorForEach(
    experienciasLaborales,
    "div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > div > span > span:nth-child(1)"
  );

  let funciones = querySelectorForEach(
    experienciasLaborales,
    "div > div.display-flex.flex-column.full-width.align-self-center > div.pvs-list__outer-container > ul > li > div > ul > li > div > div > div > div > span.visually-hidden"
  );

  let empresas = querySelectorForEach(
    experienciasLaborales,
    "div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > span:nth-child(2) > span:nth-child(1)"
  );

  let periodos = querySelectorForEach(
    experienciasLaborales,
    "div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > div.display-flex.flex-column.full-width > span.t-14.t-normal.t-black--light > span:nth-child(1)"
  );

  const informacionExtraida = {
    Nombre: nombre.innerText,
    Trabajos: [],
  };

  for (let i = 0; i < experienciasLaborales.length; i++) {
    let periodo = periodos[i].innerText.split("·");
    let rangoPeriodo = periodo[0].split("-");
    let fechaFinal =
      rangoPeriodo.length === 1
        ? rangoPeriodo[0].trim()
        : rangoPeriodo[1].trim();
    informacionExtraida["Trabajos"] = [
      ...informacionExtraida["Trabajos"],
      {
        Empresa: empresas[i]?.innerText,
        Rol: roles[i]?.innerText,
        Periodo: {
          Inicio: rangoPeriodo[0].trim(),
          Final: fechaFinal,
          Tiempo: periodo[1].trim(),
        },
        Funciones: funciones[i]?.innerText,
      },
    ];
  }

  console.log(informacionExtraida);
};
