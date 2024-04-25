
function generateQuote (event) {
    event.preventDefault();

  new Typewriter('#quote', {
  strings: "Quote quote quote",
  autoStart: true,
  cursor:"",
});
}

let quoteFormElement = document.querySelector("#quote-generator");
quoteFormElement.addEventListener("submit", generateQuote) ;