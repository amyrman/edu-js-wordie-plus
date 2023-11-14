// React hooks
import { useState } from "react";

// local modules
import Cell from "./Cell";
import { sendGuess } from "../services/api";

// styles
import "../styles/GameBoard.css";

export default function GameBoard({
    desiredWordLength
}) {
    const [keysArray, setKeysArray] = useState([]);
    const [feedbackArray, setFeedbackArray] = useState([]);

    const gameOver = () => {
        // Logic for game over goes here...
        console.log("Game over, you won!");
    };

    const handleGuess = async (guessWord) => {
        try {
            const responseData = await sendGuess({ guessWord: guessWord });
            console.log("Response data:", responseData);

            // Assuming responseData.checkedLetters contains the feedback for the guessed word
            const checkedLetters = responseData.checkedLetters;
            console.log(responseData.checkedLetters);

            if (checkedLetters === null) {
                throw new Error("checkedLetters is null");
            }

            if (!Array.isArray(checkedLetters)) {
                throw new Error("checkedLetters is not an array");
            }

            if (checkedLetters.every((item) => item.result === "correct")) {
                gameOver();
            } else {
                console.log("Not all letters are correct");
            }

            setFeedbackArray(
                checkedLetters.map((item) => {
                    return {
                        key: item.letter,
                        className: item.result,
                    };
                })
            );
        } catch (error) {
            console.error("Error in handleGuess:", error);
        }
    };

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
    };

    const generateGrid = () => {
        const rows = [];
        for (let i = 0; i < 2; i++) {
            const cells = [];
            for (let j = 0; j < desiredWordLength; j++) {
                if (i === 0) {
                    // Display feedback in row 0
                    cells.push(
                        <Cell
                            key={j}
                            id={j}
                            className={feedbackArray[j]?.className}
                        >
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
