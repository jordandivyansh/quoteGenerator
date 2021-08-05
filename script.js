const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const oldQuoteButton = document.getElementById('old-quote');
const loader = document.getElementById('loader');
let errCount = 0;

//show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function done(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}

// let currentQuote = '';
// let currentAuthor = '';
// Fetching from API http://api.forismatic.com/api/1.0/

async function getQuote(){
    loading();
    const proxyUrl = 'https://secure-tundra-47200.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        
        console.log(data);
        // author data
        
        if(data.quoteAuthor.length===0){
            authorText.innerText = '-unknown';
        }
        else{
            authorText.innerText = '- '+ data.quoteAuthor;
        }
        
        // quote data
        if(data.quoteText.length>100){
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText;
        
        //stop loader and show quote
        done();
    } catch(error){
            console.log('OMG ', error);
            errCount++;
            if(errCount>10){
                alert("Oops! Techincal glitch from API call, please refresh. Please gain CORS access. Check the footer !")
            }
            else{
                getQuote();
            }
        }
}

currentAuthor = authorText.innerText;
currentQuote = quoteText.innerText;

// function getQuoteP(){ 
//         authorText.innerText = currentAuthor;
//         quoteText.innerText = currentQuote;
// }




// Tweet button functionality - https://twitter.com/intent/tweet

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerHTML;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');

}

//button event listener

newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);




// on webpoage load

getQuote();
