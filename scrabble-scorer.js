// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let word = input.question("Enter a word to score: "); 
   return word;
}

let simpleScorer = function(word) {
   word = word.toUpperCase(); 
   return word.length;  
};


let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
   let vowelScorer = 0;
   for (let i = 0; i < word.length; i++) {
      if ("AEIOU".includes(word[i])) {
         vowelScorer += 3;
      } else {
         vowelScorer += 1;
      }
   }
   return vowelScorer;
};

let scrabbleScorer = function(word) {
   word = word.toLowerCase(); 
   let wordScore = 0;
   for (let i = 0; i < word.length; i++) {
      for (const letter in newPointStructure) {
        if (letter === word[i])
        wordScore += newPointStructure[letter];  
      }
   }
   return wordScore;
};

const scoringAlgorithms = [
   {name: "Simple Scoring", description: "Each letter is worth 1 point.", scorerFunction: simpleScorer},
   {name: "Bonus Vowels", description: "Vowels are 3 points each, consonants are 1 point each.", scorerFunction: vowelBonusScorer},
   {name: "Traditional Scrabble", description: "Uses traditional Scrabble scoring.", scorerFunction: scrabbleScorer}
];

function scorerPrompt(word) {
   console.log(`Which scoring algorithm would you like to use? \n 0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description} \n 1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description} \n 2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}`);
   let points = 0;
   let scoringChoice = input.question("Enter 0, 1, or 2: ");

   if (scoringChoice === "0") {
      points = scoringAlgorithms[0].scorerFunction(word)
   }
   if (scoringChoice === "1") {
      points = scoringAlgorithms[1].scorerFunction(word)
   }
   if (scoringChoice === "2") {
      points = scoringAlgorithms[2].scorerFunction(word)
   }

   return `Score for ${word}: ${points}`;
}

function transform(object) {
   let newScrabblePoints = {};
   for (pointValue in object) {
      for (let i = 0; i < object[pointValue].length; i++) {
         newScrabblePoints[object[pointValue][i].toLowerCase()] = Number(pointValue);
      }
   }
   return newScrabblePoints;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let word = initialPrompt();
   //console.log(simpleScorer(word));
   //console.log(vowelBonusScorer(word));
   //console.log(scrabbleScorer(word));
   console.log(scorerPrompt(word));
   //console.log(transform(oldPointStructure));
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
