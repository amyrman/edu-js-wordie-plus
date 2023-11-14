import Cell from "./Cell";
import { useState } from "react";
import { sendGuess } from "../services/api";
import "../styles/GameBoard.css";

export default function GameBoard({
    desiredWordLength,
    allowRepeatedLetters,
    maxGuess,
}) {
    // keysArray is used to store and render keys in the UI
    const [keysArray, setKeysArray] = useState([]);
    // currentCell is used to keep track of which cell should render output (letters, feedback)
    const [currentCell, setCurrentCell] = useState(-1);
    const [currentRow, setCurrentRow] = useState(1);
    const [feedbackArray, setFeedbackArray] = useState([]);

    // guessWord is used to store the completed keysArray as a string -- when user presses enter, it is sent to the backend (where it's compared to the correct word)
    // const guessWord;

    // just use two rows instead and keep track of number of guesses
    // by using state
    // just use row id=1 for typing in guesses and when sent, move it to
    // row id=0
    // this also means: remove maxGuess from for loop and just set it to "2"...this should maybe be configurable though...but through maxRows

    // if correctWord then output feedback "You found the secret word!", and prompt user to input name, and other needed data is tracked and stored either in db or in session, fetched and output in the highscore component...

    // // maxGuess could also be used and gameover when guesses === maxGuess. then feed back: "You are out of guesses! Try again! And being able to push "Yeah, give it to me!", "Restart random game", add option to set min max words length for randomizer

    // todo: add user registration, XP, achievements, real-time competition

    // todo: set default options to only choosing word length and repeated, and every thing else to "Advanced options"

    const generateGrid = () => {
      const rows = [];
      for (let i = 0; i < 2; i++) {
          const cells = [];
          for (let j = 0; j < desiredWordLength; j++) {
              if (i === 0) {
                  // Display feedback in row 0
                  cells.push(
                      <Cell key={j} id={j} className={feedbackArray[j]?.className}>
                          {feedbackArray[j]?.key}
                      </Cell>
                  );
              } else {
                  // Allow typing in row 1
                  cells.push(
                      <Cell key={j} id={j}>
                          {keysArray[j]}
                      </Cell>
                  );
              }
          }
          rows.push(
              <div key={i} id={i} className="row">
                  {cells}
              </div>
          );
      }
      return rows;
  };

    // To register keyboard input, and decide what happens when we press keys, we assign this to "onKeyDown" (which is a reserved prop in React)
    const handleKeyDown = (event) => {
        const newKey = event.key;
        const guessWord = keysArray.join("");
        switch (newKey) {
            case "Backspace":
                setKeysArray((prevKeys) => prevKeys.slice(0, -1));
                break;
            case "Enter":
                handleGuess(guessWord);
                setKeysArray([]);
                break;
            default:
                if (/^[a-zA-Z]$/.test(newKey)) {
                    setKeysArray((prevKeys) => {
                        if (prevKeys.length < desiredWordLength) {
                            return [...prevKeys, newKey.toUpperCase()];
                        } else if (prevKeys.length === desiredWordLength) {
                            let newKeys = [...prevKeys];
                            newKeys.splice(-1, 1, newKey.toUpperCase());
                            return newKeys;
                        }
                        return prevKeys;
                    });
                }
                break;
        }

        async function handleGuess(guessWord) {
            try {
                const responseData = await sendGuess({ guessWord: guessWord });
                console.log("Response data:", responseData);

                // Assuming responseData.checkedLetters contains the feedback for the guessed word
                const checkedLetters = responseData.checkedLetters;
                console.log(checkedLetters);

                // Update feedbackArray with the letters and results from checkedLetters
                const newFeedbackArray = checkedLetters.map((item) => ({
                    key: item.letter,
                    className: item.result,
                }));

                console.log("New feedback array:", newFeedbackArray);

                setFeedbackArray(newFeedbackArray);
            } catch (error) {
                console.error("Error in handleGuess:", error);
            }
        }
    };

    // setCurrentCell((currentCell) => {
    //     // problem might be that it always increments?
    //     const nextCell = currentCell + 1;
    //     // desiredWordLength does not start on 0?
    //     if (currentCell === desiredWordLength) {
    //         console.log("currentCell reached dWL: ", desiredWordLength);
    //         return desiredWordLength;
    //     } else if (currentCell < nextCell) {
    //         console.log("currentCell in else: ", nextCell);
    //         return nextCell;
    //     }
    // });

    return (
        <>
            <div className="grid" tabIndex={-1} onKeyDown={handleKeyDown}>
                {generateGrid()}
            </div>

            {/* FOR WHEN HANDLING GUESSES ARE DONE */}
            {/* {isCorrect && 
                <a href={`https://duckduckgo.com/?q=${guessWord}`} target="_blank" rel="noopener noreferrer">
                    Learn more about {guessWord}
                </a>
            } */}
        </>
    );
}
