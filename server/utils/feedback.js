export default function feedback(guessWord, correctWord) {
  const checkedLetters = [...Array(correctWord.length)];
  const letterCounter = {}; //keep track of correctLetter frequency

  // make guesses case insensitive
  guessWord = guessWord.toUpperCase();
  correctWord = correctWord.toUpperCase();

  // if correctLetter is present in counter object, then add 1 to the count
  for (let i = 0; i < correctWord.length; i++) {
    let correctLetter = correctWord[i];

    if (letterCounter[correctLetter]) {
      letterCounter[correctLetter] += 1;
    } else {
      letterCounter[correctLetter] = 1;
    }
  }

  // 1:st pass: check for correct letters, push to checkedLetters and subtract every correct one from the lettercounter -- this is later used to set guessed letter as misplaced if the counter for that correctLetter = 0, because then all the letters in letterCount are "used up"
  for (let i = 0; i < correctWord.length; i++) {
    const correctLetter = correctWord[i];
    const guessLetter = guessWord[i];
    const addToChecked = (result) => {
      checkedLetters[i] = { letter: guessLetter, result: result };
    };

    if (guessLetter == correctLetter) {
      // is letter same char and index?
      letterCounter[correctLetter] -= 1; // then subtract from letterCounter
      addToChecked("correct"); // and add to checkedLetters
    }
  }

  // 2:nd pass: mark 'misplaced' with help of letterCounter, and rest as 'incorrect'
  for (let i = 0; i < correctWord.length; i++) {
    const correctLetter = correctWord[i];
    const guessLetter = guessWord[i];
    const addToChecked = (result) => {
      checkedLetters[i] = { letter: guessLetter, result: result };
    };

    if (correctWord.includes(guessLetter) && letterCounter[guessLetter] > 0) {
      addToChecked("misplaced");
      letterCounter[guessLetter] -= 1;
    } else if (!checkedLetters[i]) {
      addToChecked("absent");
    }
  }
  return checkedLetters;
}
