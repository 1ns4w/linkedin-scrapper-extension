let scrapButton = document.getElementById('scrapButton')

console.log('hola en el contexte de la extension')

scrapButton.addEventListener('click', async () =>{
    const [tab] = await chrome.tabs.query({active: true, currentWindow:true})
    if(tab !== null){
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: profilesScrapers
        })
    }
})


const profilesScrapers = () => {
console.log('hola en pagina a  inyectar')

}
