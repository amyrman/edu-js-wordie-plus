import feedback from "./feedback";
import { getCorrectWord } from "./feedback.js";
// TODO: Fix imports etc after refactoring - https://kanbanflow.com/t/13GSyojG

describe("feedback", () => {
    describe("wordle feedback function", () => {
        // Test incorrect checks
        test("a - b -> absent", () => {
            const result = feedback("a", "b");
            expect(result).toEqual([{ letter: "A", result: "absent" }]);
        });

        // Test correct checks with several letters
        test("abc - abc -> correct, correct, correct", () => {
            const result = feedback("abc", "abc");
            expect(result).toEqual([
                { letter: "A", result: "correct" },
                { letter: "B", result: "correct" },
                { letter: "C", result: "correct" },
            ]);
        });

        //Test case insensitivity
        test("a - A -> correct", () => {
            const result = feedback("a", "A");
            expect(result).toEqual([{ letter: "A", result: "correct" }]);
        });

        //Test case insensitivity
        test("A - a -> correct", () => {
            const result = feedback("A", "a");
            expect(result).toEqual([{ letter: "A", result: "correct" }]);
        });
    });
});

describe("getCorrectWord", () => {
    describe("when allowRepLetters is false", () => {
        test("returns a string of correct length and without repeated letters", () => {
            const desiredWordLength = 5;
            const allowRepLetters = false;
            const correctWord = getCorrectWord(
                desiredWordLength,
                allowRepLetters
            );
            expect(typeof correctWord).toBe("string");
            expect(correctWord.length).toBe(desiredWordLength);
            expect(new Set(correctWord).size).toBe(desiredWordLength);
        });
    });

    // TODO: the problem is that the allowRepLetters true means that the correctWord can have both unique and repeated letters
    // so to test this, we would need to check something like that the filteredWords array contains words with both unique and repeated letters...by first word which should be "aa" and first one with unique letters, which should be "ab"...cant I mock an array with those two words?
    // if we wanted only repeated letters, we could just check that the length of the Set is less than the length of the word

    describe("when allowRepLetters is true", () => {
        test("returns a string of correct length with unique or repeated letters", () => {
            const desiredWordLength = 2;
            const allowRepLetters = true;
            const correctWord = getCorrectWord(
                desiredWordLength,
                allowRepLetters
            );
            expect(typeof correctWord).toBe("string");
            expect(correctWord.length).toBe(desiredWordLength);
            if (allowRepLetters) {
                expect(new Set(correctWord).size).toBeLessThanOrEqual(
                    desiredWordLength
                );
            } else {
                expect(new Set(correctWord).size).toBe(desiredWordLength);
            }
        });
    });
});
