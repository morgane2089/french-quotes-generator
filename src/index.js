function displayQuote(response) {
    // More aggressive cleaning of the response
    let quote = response.data.answer
        .replace(/^(html\s*"|"|')/g, '')  // Remove leading html, quotes
        .replace(/"*\*\*SheCodes AI\*\*.*$/g, '')  // Remove SheCodes AI signature
        .replace(/"+$/g, '')  // Remove trailing quotes
        .replace(/\s+/g, ' ')  // Replace multiple whitespaces with single space
        .trim();  // Remove any extra whitespace
    
    new Typewriter('#quote', {
        strings: quote,
        autoStart: true,
        delay: 1,
        cursor: "",
    });
} 

function generateQuote(event) {
    event.preventDefault();
    let InstructionInput = document.querySelector("#user-instruction");
    let apiKey = "c91ee5a03a4otdbb84f98dbdea4d441a";
    let context = "You are an AI assistant expert on french quote. Your mission is to generate a 4 line quote in basic HTML and separate each line with <br/>. Add the quote in comma, Make sure to follow the user instruction. Sign the quote with SheCodes AI at the end of the quote inside a <strong> element in a new line and I don't want any markdown on your response";
    let prompt = `User instructions are: Generate a french quote about ${InstructionInput.value}`;
    
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

    let quoteElement = document.querySelector("#quote");
    quoteElement.classList.remove("hidden");
    quoteElement.innerHTML = `<div class="generating">⏳ Generating a French quote about ${InstructionInput.value}</div>`;

    axios.get(apiUrl).then(displayQuote);
}

let quoteFormElement = document.querySelector("#quote-generator");
quoteFormElement.addEventListener("submit", generateQuote);