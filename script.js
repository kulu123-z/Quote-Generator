const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

async function getQuote() {
    const apiUrl = 'https://www.officeapi.dev/api/quotes/random';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
         // Reduce font size for long quotes
        if (data.data.content.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.data.content
        authorText.innerText = `- ${data.data.character.firstname} ${data.data.character.lastname}`
  
    }
    catch(error){
        getQuote();
      // console.log('whoops, no quote', error);
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  
    window.open(twitterUrl, '_blank');
}

// Event Listeners

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();