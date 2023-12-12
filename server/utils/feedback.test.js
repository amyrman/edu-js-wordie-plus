import { getFeedback, getCorrectWord } from "./feedback.ts";

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
            const desiredWordLength = 5;
            const allowRepLetters = true;
            const lang = "en";
            let correctWord;
            let iterations = 0;
            const maxIterations = 20;
            /*
            keep calling getCorrectWord until we either:
            a) get a correctWord that has repeatable letters, or
            b) reach 20 iterations (which will output a console.warn before any test output)
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

            if (iterations === maxIterations) {
                console.warn('Test reached maxIterations without finding a word with repeated letters');
            }

            expect(typeof correctWord).toBe("string");
            expect(correctWord.length).toBe(desiredWordLength);
            expect(new Set(correctWord).size).toBeLessThan(desiredWordLength);
        });
    });
});
