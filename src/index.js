
//Global variables
let correctCharacters = 0;
let totalCharacters = 0;
let startTime;

const playButton = document.getElementById("playButton");
const sentenceDisplay = document.getElementById("sentenceDisplay");
const inputField = document.getElementById("inputField");
const resultSection = document.getElementById("resultSection");


async function getRandomSentence(wordCount){
    try{
        const response = await fetch(`https://random-word-api.herokuapp.com/word?number=${wordCount}`);
        const data = await response.json();
        let sentence = data.join(" ");
        console.log(sentence);
        return sentence;
    } catch (error) {
        console.log("Failed to fetch sentence", error);
        return "Error loading the sentence.Please try again."
    }
    
}

async function displaySentence(){
    const randomSentence = await getRandomSentence(10);

    sentenceDisplay.textContent = randomSentence;
}

playButton.addEventListener("click", startGame);
inputField.addEventListener("input", trackTyping);

function startGame(){
    correctCharacters = 0;
    totalCharacters = 0;

    inputField.value = "";
    resultSection.innerHTML = "";
    startTime = null;
    displaySentence();

    inputField.style.display = "block";
    sentenceDisplay.style.display = "block";
}

function trackTyping(){
    console.log(startTime);
    if (!startTime) {
        // Record start time on first input
        startTime = new Date();
        console.log("time set:", startTime); 
    }
    
    const typedtext = inputField.value;
    const sentence = sentenceDisplay.textContent;

    totalCharacters = typedtext.length;
    correctCharacters = countCorrectCharacters(typedtext, sentence);

    updateStats();
}

function countCorrectCharacters(typedtext, sentence){
    let correct = 0;
    const minLength = Math.min(typedtext.length, sentence.length);
    
    for (let i = 0; i < minLength; i++) {
        if (typedtext[i] === sentence[i] ) {
            correct++;
        }
    }
    console.log(correct);
    return correct;

}

function updateStats(){
    const wpm = calculateWPM();
    const accuracy = (correctCharacters / totalCharacters) * 100; 
    console.log("Accuracy: " , accuracy);
}

function displayResults(){

}

function calculateWPM(){
    // time in seconds
    const timeElapsed = (new Date() - startTime) / 1000;
    // return the correct words per minute
    wpm = (correctCharacters / 5) / (timeElapsed / 60);
    console.log("Words Per min: ",wpm);
   

}

function endGame(){

}
