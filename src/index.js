function displayQuote(response) {
    // Even more comprehensive cleaning of the response
    let cleanedQuote = response.data.answer
        // Remove leading 'html', quotes, and any signature
        .replace(/^(html\s*)?"/g, '')  // Remove initial 'html' and quote
        .replace(/"\*\*—?\s*SheCodes AI\*\*.*$/g, '')  // Remove SheCodes AI signature
        .replace(/"+$/g, '')  // Remove trailing quotes
        .split('""')  // Split multiple quotes
        .map(line => line.trim())  // Trim each line
        .filter(line => line.length > 0)  // Remove empty lines
        .join('<br/>');  // Join with line breaks
    
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
    let context = "You are an AI assistant expert on french quote. Your mission is to generate a 4 line quote. Separate each line with two quotes. Do not add any extra formatting. Sign the quote with — SheCodes AI at the end.";
    let prompt = `Generate a french quote about ${InstructionInput.value}`;
    
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

    let quoteElement = document.querySelector("#quote");
    quoteElement.classList.remove("hidden");
    quoteElement.classList.add("generating");
    quoteElement.innerHTML = `⏳ Generating a French quote about ${InstructionInput.value}`;

    axios.get(apiUrl).then(displayQuote);
}

let quoteFormElement = document.querySelector("#quote-generator");
quoteFormElement.addEventListener("submit", generateQuote);