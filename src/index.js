function displayQuote(response){
    new Typewriter('#quote', {
        strings: response.data.answer,
        autoStart: true,
        delay: 1,
        cursor:"",
      });
      } 


function generateQuote (event) {
    event.preventDefault();
    let InstructionInput = document.querySelector("#user-instruction");
    let apiKey ="c91ee5a03a4otdbb84f98dbdea4d441a";
    let context="You are an AI assistant expert on french quote. Your mission is to generate a 4 line quote in basic HTLM and seperate each line with <br/>. add the quote in coma , Make sure to follow the user instruction, Signe the quote with `SheCodes AI`at the end of the quote inside a <strong> element in a new ligne ";
    let prompt =`User instruction are : Generate a french quote about ${InstructionInput.value}`;
    
    let apiUrl=`https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

    let quoteElement=document.querySelector("#quote");
    quoteElement.classList.remove("hidden");
    quoteElement.innerHTML = `<div class="generating">⏳ Generating a French quote about ${InstructionInput.value}</div>`;

    axios.get(apiUrl).then(displayQuote);

}

let quoteFormElement = document.querySelector("#quote-generator");
quoteFormElement.addEventListener("submit", generateQuote) ;