// Variables
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','!',' '];
var words = ['lady bird', 'star wars the last jedi', 'thor ragnarok', 'wonder woman', 'coco', 'get out', 'dunkirk', 'war for the planet of the apes', 'baby driver', 'the shape of water', 'the big sick', 'it', 'spider Man homecoming', 'logan','wonder','guardians of the galaxy volume two','murder on the orient express','the disaster artist','three billboards outside ebbing missouri','the greatest showman','alien covenent','beauty and the beast','john wick chapter two','okja','logan lucky','it comes at night','call me by your name','kingsman the golden circle','the emoji movie','transformers the last knight','the lego batman movie','atomic blonde','the dark tower','girls trip','baywatch','the beguiled','the mummy','kong skull island','a ghost story','annabelle creation','american made','valerian','pirates of the caribbean dead men tell no tales','a bad moms christmas','daddys home two','wind river','call me by your name','jigsaw','geostorm','last flag flying','the snowman','darkest hour','happy death day','i tonya','good time','mother!','the florida project','the post','the square','the fate of the furious','all the money in the world','mollys game','geralds game','ingrid goes west','the book of henry','brigsby bear'];
var word = [];
var workingWord = [];
var Guesses = [];
var guessesRemaining = 10;
var wins = 0;
var letter;
var wordId = document.getElementById('word');
var winsId = document.getElementById('wins');
var GuessesId = document.getElementById('Guesses');
var remainingId = document.getElementById('remaining');
var gameStatusId = document.getElementById('gameStatus');


document.onkeyup = function(event) {
    letter = String.fromCharCode(event.keyCode).toLowerCase();
    if (hangman.checkAlphabet() === true) {
        if (hangman.checkGuesses() === true) { 
    		if (hangman.checkWorkingWord() === true) {
	    	    if (hangman.checkword() === true) {
			        hangman.replaceLetter();
					if (hangman.winStatus() === true) {
						hangman.winCounter();
						hangman.resetGame();
						hangman.updateRemaining();
						hangman.play();
					} 
				} else {
					hangman.subtractRemaining();
					hangman.updateRemaining();
					hangman.updateUsedLetters();
					if (hangman.lose() === true) {
						hangman.resetGame();
						hangman.updateRemaining();
						hangman.play();
					}
				}
			}
		}
    } 
}


var hangman = {
	
	play: function () {
		var blanksId = document.getElementById('blank');
		blanksId.parentNode.removeChild(blanksId);
		var guessedId = document.getElementById('guessed');
		guessedId.parentNode.removeChild(guessedId);
		// Selects new word and splits each character into an array
		var selectWord = words[Math.floor(Math.random()*words.length)];
		word = selectWord.split("");
		console.log(word);
		// Creates blanks for current word
		for (var i = 0; i < word.length; i++) {
			var newBlank = document.createElement('li');
			newBlank.setAttribute('class', 'display-inline padding');
			newBlank.setAttribute('id', 'blank');
			newBlank.innerHTML = '_';
			wordId.appendChild(newBlank);
			workingWord.push('_');
		}
	},

	
	checkAlphabet: function() {
		for (var i = 0; i < alphabet.length; i++) {
			if (letter === alphabet[i]) {
				return true;
			}
		}
		return false;
	},

	
	checkGuesses: function() {
		for (var i = 0; i < Guesses.length; i++) {
			if (letter === Guesses[i]) {
				return false;
			}
		}
		return true;
	},

	
	checkWorkingWord: function() {
		for (var i = 0; i < workingWord.length; i++) {
			if (letter === workingWord[i]) {
				return false;
			}
		}
		return true;
	},

	
	checkword: function() {
		var wasFound = false;
		for (var i = 0; i < word.length; i++) {
			if (letter === word[i]) {
				workingWord[i] = letter;
				wasFound = true;
			}
		}
		return wasFound;
	},

	
	replaceLetter: function() {
		for (var i = 0; i < workingWord.length; i++) {
			var blanksId = document.getElementById('blank');
			blanksId.parentNode.removeChild(blanksId);
			var wordId = document.getElementById('word');
			var newBlankOrLetter = document.createElement('li');
			newBlankOrLetter.setAttribute('class', 'display-inline padding');
			newBlankOrLetter.setAttribute('id', 'blank');
			newBlankOrLetter.innerHTML = workingWord[i];
			wordId.appendChild(newBlankOrLetter);
			
		}
	},

	
	subtractRemaining: function() {	
		guessesRemaining -= 1;
		Guesses.push(letter);
	},

	
	updateRemaining: function() {
		var livesId = document.getElementById('lives');
		livesId.parentNode.removeChild(livesId);
		var newScore = document.createElement('li');
		newScore.setAttribute('id', 'lives');
		newScore.setAttribute('class', 'display-inline padding')
		newScore.innerHTML = guessesRemaining;
		remainingId.appendChild(newScore);
	},

	
	updateUsedLetters: function() {
		var newLetter = document.createElement('li');
		newLetter.innerHTML = letter;
		newLetter.setAttribute('class', 'display-inline padding');
		newLetter.setAttribute('id', 'guessed');
		GuessesId.appendChild(newLetter);
	},

	
	winStatus: function() {
		var isComplete = true;
		for (var i = 0; i < word.length; i++) {
			if (workingWord[i] !== word[i]) {
				isComplete = false;
			}
		}
		if (isComplete === true) {
			var playId = document.getElementById('play');
			playId.parentNode.removeChild(playId);
			var newgameStatus = document.createElement('li');
			newgameStatus.setAttribute('class', 'display-inline');
			newgameStatus.setAttribute('id', 'play');
			newgameStatus.innerHTML = 'You Won!';
			gameStatusId.appendChild(newgameStatus);
			wins += 1;
			return true;
		}
		return false;
	},

	//NEED TO MOVE "YOU WON!" OVER
	winCounter: function() {
		var winCounterId = document.getElementById('winCounter');
		winCounterId.parentNode.removeChild(winCounterId);
		var newWinCounter = document.createElement('li');
		newWinCounter.setAttribute('class', 'display-inline');
		newWinCounter.setAttribute('id', 'winCounter');
		newWinCounter.innerHTML = wins;
		winsId.appendChild(newWinCounter);
	},

	
	lose: function() {
		if (guessesRemaining < 1) {
			var playId = document.getElementById('play');
			playId.parentNode.removeChild(playId);
			var newgameStatus = document.createElement('li');
			newgameStatus.setAttribute('id', 'play');
			newgameStatus.setAttribute('class', 'display-inline');
			newgameStatus.innerHTML = 'You Lost!';
			gameStatusId.appendChild(newgameStatus);
			return true;
		}
		return false;
	},

	
	resetGame: function() {
			for (var i = 0; i < word.length; i++) {	
				var blanksId = document.getElementById('blank');
				blanksId.parentNode.removeChild(blanksId);
			}
			var newBlank = document.createElement('li');
			newBlank.setAttribute('id', 'blank');
			newBlank.setAttribute('class', 'display-inline padding');
			wordId.appendChild(newBlank);
			for (var i = 0; i < Guesses.length; i++) {
				var guessedId = document.getElementById('guessed');
				guessedId.parentNode.removeChild(guessedId);
			}
			var newGuessed = document.createElement('li');
			newGuessed.setAttribute('id', 'guessed');
			newGuessed.setAttribute('class', 'display-inline padding');
			GuessesId.appendChild(newGuessed);
			guessesRemaining = 10;
			word = [];
			workingWord = [];
			Guesses = [];
	},
}


hangman.play();