let new_btn = document.querySelector('#js-new-quote');

//tick

new_btn.addEventListener('click', getQuote);

let answerBtn = document.querySelector('#js-tweet');
answerBtn.addEventListener('click', showAnswer);

const answerText = document.querySelector('#js-answer-text');

let current = {
    question: " ",
    answer: " ",
};

const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';

async function getQuote() {
    //alert("This Works!");
    try {
        const response = await fetch(endpoint);

        if (!response.ok){
            throw Error(response.statusText);
        }

        const json = await response.json();
        console.log(json);

        display_quote(json['question']);
        current.question = json["question"];
        current.answer = json["answer"];
        
        console.log(current.answer);
    }
    catch (err){
        console.log(err);
        alert('Failed to fetch new quote');
    }
}

function display_quote(quote){
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote;
    answerText.textContent = " "; 
}

function showAnswer() {
    answerText.textContent = current.answer;
}

getQuote();