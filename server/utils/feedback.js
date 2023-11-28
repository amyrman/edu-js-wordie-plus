export function getFeedback(guessWord, correctWord) {
    if (!correctWord) {
        throw new Error("correctWord is undefined");
    }

    if (!guessWord || typeof guessWord !== "string") {
        throw new Error("guessWord is undefined or not a string");
    }

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

        if (
            correctWord.includes(guessLetter) &&
            letterCounter[guessLetter] > 0
        ) {
            addToChecked("misplaced");
            letterCounter[guessLetter] -= 1;
        } else if (!checkedLetters[i]) {
            addToChecked("absent");
        }
    }
    return checkedLetters;
}

import fs from "fs";

// TODO: change allowRepLetters to onlyUniqueLetters
// TODO: change from txt to GET word from dictionary API
export function getCorrectWord(lang, desiredWordLength, allowRepLetters) {
    const words = () => {
        if (lang === "en") {
            return fs.readFileSync("data/words-en.txt", "utf8")
                // remove carriage returns
                .replace(/\r/g, "")
                // split on newlines
                .split("\n");
        } else if (lang === "sv") {
            return fs.readFileSync("data/words-sv.txt", "utf8")
                // remove carriage returns
                .replace(/\r/g, "")
                // split on newlines
                .split("\n");
        }
    };
    // The words array is filtered on certain criteria
    const wordsArray = words();
    const filteredWords = wordsArray.filter((word) => {
        const isDesiredLength = word.length === desiredWordLength;
        // if allowRepLetters is true, then we don't need to check for unique letters
        // if allowRepLetters is false, then we need to check that the word has unique letters
        // the Set will remove duplicate letters, so if the length of the Set is the same as the length of the word, then the word has unique letters
        const passesConditions =
            allowRepLetters || new Set(word).size === word.length;
        if (isDesiredLength && passesConditions) {
            return true;
        } else {
            return false;
        }
    });
    if (filteredWords.length === 0) {
        throw new Error(`No words found. Please change options.`);
    }
    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}
