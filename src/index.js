function displayQuote(response) {
   
    let cleanedQuote = response.data.answer
        
        .replace(/^(html\s*)?"/g, '')  
        .replace(/"\*\*—?\s*SheCodes AI\*\*.*$/g, '')  
        .replace(/"+$/g, '') 
        .split('""')  
        .map(line => line.trim()) 
        .filter(line => line.length > 0) 
        .join('<br/>'); 

    new Typewriter('#quote', {
        strings: cleanedQuote,
        autoStart: true,
        delay: 1,
        cursor: "",
    });
} 

function generateQuote(event) {
    event.preventDefault();
    let InstructionInput = document.querySelector("#user-instruction");
    let apiKey = "c91ee5a03a4otdbb84f98dbdea4d441a";
    let context = "You are an AI assistant expert on french quote. Your mission is to generate a 4 line quote. Separate each line with two quotes. Do not add any extra formatting and i don't want any markdown on the response. Sign the quote with — SheCodes AI at the end.";
    let prompt = `Generate a french quote about ${InstructionInput.value}`;
    
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

    let quoteElement = document.querySelector("#quote");
    quoteElement.classList.remove("hidden");
    quoteElement.classList.add("generating");
    quoteElement.innerHTML = ``<div class="generating">⏳ Generating a French quote about ${InstructionInput.value} </div>`;

    axios.get(apiUrl).then(displayQuote);
}

let quoteFormElement = document.querySelector("#quote-generator");
quoteFormElement.addEventListener("submit", generateQuote);