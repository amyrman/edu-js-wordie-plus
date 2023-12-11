/**
 * This function takes a guessed word and the correct word, and returns feedback on the guessed word.
 *
 * @param {string} guessWord - The word guessed by the user.
 * @param {string} correctWord - The correct word.
 * @returns {Array<{ letter: string, result: 'correct' | 'absent' | 'misplaced' }>} An array of objects, where each object represents a letter in the guessed word and the result of the guess for that letter. The result can be 'correct', 'absent', or 'misplaced'.
 */
import getFeedback from "./feedback.js";

/**
 * This function is used to return a randomly chosen word based on the provided parameters (which is then used as a parameter getFeedback above).
 *
 * @param {string} lang - The language for the word.
 * @param {number} desiredWordLength - The desired length of the word.
 * @param {boolean} allowRepLetters - Whether repeated letters are allowed in the word.
 * @returns {string} The correct word.
 */
import { getCorrectWord } from "./feedback.js";
// TODO: Fix imports etc after refactoring - https://kanbanflow.com/t/13GSyojG

describe("getFeedback", () => {
    describe("Test incorrect checks", () => {
        test("a - b -> absent", () => {
            const result = getFeedback("a", "b");
            expect(result).toEqual([{ letter: "A", result: "absent" }]);
        });
    });

    describe("Test case insensitivity", () => {
        test("a - A -> correct", () => {
            const result = getFeedback("a", "A");
            expect(result).toEqual([{ letter: "A", result: "correct" }]);
        });

        test("A - a -> correct", () => {
            const result = getFeedback("A", "a");
            expect(result).toEqual([{ letter: "A", result: "correct" }]);
        });
    });

    describe("Test correct checks with several letters", () => {
        test("abc - abc -> correct, correct, correct", () => {
            const result = getFeedback("abc", "abc");
            expect(result).toEqual([
                { letter: "A", result: "correct" },
                { letter: "B", result: "correct" },
                { letter: "C", result: "correct" },
            ]);
        });
    });

    describe("Test misplaced checks", () => {
        test("abc - bca -> misplaced, misplaced, misplaced", () => {
            const result = getFeedback("abc", "bca");
            expect(result).toEqual([
                { letter: "A", result: "misplaced" },
                { letter: "B", result: "misplaced" },
                { letter: "C", result: "misplaced" },
            ]);
        });
    });

    describe("Test correct, misplaced, and absent letters", () => {
        test("aabc - aaaa -> correct, misplaced, misplaced, absent", () => {
            const result = getFeedback("abd", "acb");
            expect(result).toEqual([
                { letter: "A", result: "correct" },
                { letter: "B", result: "misplaced" },
                { letter: "D", result: "absent" },
            ]);
        });
    });
});

describe("getCorrectWord", () => {
    describe("when allowRepLetters is false", () => {
        test("returns a string of correct length and without repeated letters", () => {
            const desiredWordLength = 5;
            const allowRepLetters = false;
            const lang = "en";
            const correctWord = getCorrectWord(
                lang,
                desiredWordLength,
                allowRepLetters
            );
            expect(typeof correctWord).toBe("string");
            expect(correctWord.length).toBe(desiredWordLength);
            
            // use Set that removes any re-occuring elements to assert that correctWord contains only unique letters 
            expect(new Set(correctWord).size).toBe(desiredWordLength);
        });
    });

    describe("when allowRepLetters is true", () => {
        test("returns a string of correct length with possible repeated letters", () => {
            const desiredWordLength = 2;
            const allowRepLetters = true;
            const lang = "en";
            let correctWord;
            let iterations = 0;
            const maxIterations = 20;
            /*
            keep calling getCorrectWord until we either:
            a) get correctWord that has repeatable letters, or
            b) reach 20 iterations
            */ 
            do {
                correctWord = getCorrectWord(
                    lang,
                    desiredWordLength,
                    allowRepLetters
                );
                iterations++;
            } while (
                new Set(correctWord).size === desiredWordLength &&
                iterations < maxIterations
            );

            expect(typeof correctWord).toBe("string");
            expect(correctWord.length).toBe(desiredWordLength);
            expect(new Set(correctWord).size).toBeLessThan(desiredWordLength);
        });
    });
});
