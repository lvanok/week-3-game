
// GLOBAL VARIABLES (Accessible by all functions)
//array of words =======================================================
var currentWord = prompt("Choose any letter to start:  ");  //solution goes here
var possibleWords = ["yoga", "reiki", "wellness"];
var lettersInCurrentWord = []; //individual letters to be stored in array
// currentWord.split(""); // the word is broken into individual letters
var numBlanks = 0;
// lettersInCurrentWord.length; 
var blanksAndSuccesses = []; //CRITICAL LINE - here we *reset* the guess and success array at each round. 
//Holds a mix of blank and solved letters (ex: 'n, _ _, n, _'
console.log(currentWord);  //print for testing will take out after html works
var userGuess = 0;
// prompt("Press any letter to start the game  ");
var wrongGuesses = []; //we reset the wrong guess from previous round - holds wrong answers & gets cleared ea time
var correctLetter = []; 

var letterInWord = false; // ?this boolean will be toggled based on whether or not a user letter is found anywhere in the word
// Game counters
var winCounter  = 0;
var lossCounter = 0;
var numGuesses = 0;
// Array of Word Options (all lowercase) - answer from GitHub
// var chosenWord  = ""; // solution will be held here.
// var numBlanks	= 0; // This will be the number of blanks we show based on the solution
// FUNCTIONS (Bits of code that we will call upon to run when needed)
// ======================================================================
// Its how we we will start and restart the game. 
// (Note: It's not being run here. 
// It's just being made for future use.)
function startGame() {

	// Reset the guesses back to 0
	numGuesses = 9;
	currentWord = possibleWords[Math.floor(Math.random() * possibleWords.length)]; 
	// solution (or Chosen current word)is chosen randomly from wordList
	lettersInCurrentWord = currentWord.split(""); // the word is broken into individual letters
	numBlanks = lettersInCurrentWord.length; // we cound the number of letters in the word

	console.log(currentWord); // We print the solution in console (for testing)

	blanksAndSuccesses = []; // CRITICAL LINE - here we *reset* the guess and success array at each round. 
	wrongGuesses = []; // CRITICAL LINE - here we *reset* the wrong guesses from the previous round.
	// Fill up the blanksAndSuccesses list with appropriate number of blanks. 
	// This is based on number of letters in solution
	for (var i=0; i <numBlanks; i++){
		blanksAndSuccesses.push("_");
	}
	console.log(blanksAndSuccesses); // print the initial blanks in console.
	// Reprints the guessesLeft to 9
	document.getElementById("guessesLeft").innerHTML = numGuesses;
	// Prints the blanks at the beginning of each round in the HTML
	document.getElementById("wordblanks").innerHTML= blanksAndSuccesses.join(" ");
	// Clears the wrong guesses from the previous round
	document.getElementById('wrongGuesses').innerHTML = wrongGuesses.join(" ");
}
// checkLetters() function
// It's where we will do all of the comparisons for matches. Again, it's not being called here. It's just being made for future use.
function checkLetters(letter) {
	var letterInWord = false; 
	// this boolean will be toggled based on whether or not a user letter is found anywhere in the word
	// then Checks if a letter exists inside the array at all.
	for (var i=0; i<numBlanks; i++) {
		if(currentWord[i] == letterInWord) {
			letterInWord = true; 
			// if the letter exists then toggle this boolean to true. This will be used in the next step. 
 		}
	}
	}
 	// If the letter exists somewhere in the word, then figure out exactly where (which indices)
	if (letterInWord = true) {
 		// loop through the word 
		for (var i=0; i<numBlanks; i++) {
 			// Populate the blanksAndSuccesses with every instance of the letter.
			If(currentWord[i] == letter) 
				blanksAndSuccesses[i] = letter; 
			// here we set the specific space in blanks and letter equal to the letter when there is a match.
		}
		console.log(blanksAndSuccesses); // logging for testing
	}
 	// If the letter doesn't exist at all...
	else {
		wrongGuesses.push(letter); // then we add the letter to the list of wrong letters
		numGuesses--; // and we subtract one of the guesses
	}
	
// roundComplete() function
// Here we will have all of the code that needs to be run after each guess is made
function roundComplete(){
	// First, log an initial status update in the console telling us how many wins, losses, and guesses are left
	console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

	// Update the HTML to reflect the new number of guesses. Also update the correct guesses.
	document.getElementById("guessesLeft").innerHTML= numGuesses;
	document.getElementById("wordblanks").innerHTML = blanksAndSuccesses.join(" "); 
	// This will print the array of guesses and blanks onto the page
	document.getElementById("wrongGuesses").innerHTML = wrongGuesses.join(" "); 
	// this will print the wrong guesses onto the page.
	// If we have gotten all the letters to match the solution... 
	if (lettersInCurrentWord.toString() == blanksAndSuccesses.toString()) {
		winCounter++; // add to the win counter 
		alert("You win!"); // give the user an alert
		// Update the win counter in the HTML
		document.getElementById("winCounter").innerHTML = winCounter;
		startGame(); // restart the game 
	}
	// If we've run out of guesses
	else if(numGuesses == 0) {
		lossCounter++; 	 // add to the loss counter 
		alert("You lose"); // give the user an alert
		// Update the loss counter in the HTML
		document.getElementById("lossCounter").innerHTML = lossCounter; 
		startGame(); // restart the game
	}
}
// MAIN PROCESS (THIS IS THE CODE THAT CONTROLS WHAT IS ACTUALLY RUN)
// ==================================================================================================
// Starts the Game by running the startGame() function
startGame();
// Then initiates the function for capturing key clicks.
document.onkeyup = function(event) {
	letterGuessed = String.fromCharCode(event.keyCode).toLowerCase(); //converts key clicks to lowercase letters
	checkLetters(letterGuessed); // runs the code to check for correctness 
	roundComplete(); // runs the code after each round is done
};