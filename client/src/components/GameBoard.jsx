// Third-party libraries/modules
import DOMPurify from "dompurify";

// React hooks
import { useState } from "react";

// local modules
import Cell from "./Cell";
import api from "../services/api";

// styles
import "../styles/GameBoard.css";

export default function GameBoard({
    desiredWordLength,
    allowRepLetters,
    resetGame,
}) {
    const [keysArray, setKeysArray] = useState([]);
    const [feedbackArray, setFeedbackArray] = useState([]);
    const [guesses, setGuesses] = useState(1);

    const gameOver = () => {
        let playerName;

        // eslint-disable-next-line no-constant-condition
        while (true) {
            playerName = prompt(
                "You won!! Please enter highscore name (max 10 characters) \nCancel resets game:"
            );

            if (
                playerName === null ||
                (playerName.length >= 1 && playerName.length <= 10)
            ) {
                break;
            }

            alert("Name must be between 1-10 characters.");
        }

        if (playerName !== null) {
            playerName = DOMPurify.sanitize(playerName); // Sanitize user input

            const data = {
                name: playerName,
                guesses: guesses,
                desiredWordLength: desiredWordLength,
                allowRepLetters: allowRepLetters,
            };

            api.insertHighscore(data);
        }

        resetGame(); // Reset the game
    };
    // TODO: extract validation to api.js - https://kanbanflow.com/t/mVpUdK8y
    const validateResponseData = (responseData) => {
        const checkedLetters = responseData.checkedLetters;

        if (checkedLetters === null) {
            throw new Error("checkedLetters is null");
        }

        if (!Array.isArray(checkedLetters)) {
            throw new Error("checkedLetters is not an array");
        }

        return checkedLetters;
    };
    // TODO: extract api calls to api.js - https://kanbanflow.com/t/mW6ABeBs
    const handleGuess = async (guessWord) => {
        try {
            const responseData = await api.performHttpOperation(
                "POST",
                "/api/guess",
                { guessWord }
            );
            const checkedLetters = validateResponseData(responseData);

            if (checkedLetters.every((item) => item.result === "correct")) {
                gameOver();
            }

            setGuesses((prevGuesses) => prevGuesses + 1);

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

    const handleDefaultKey = (newKey) => {
        if (/^[\u00C0-\u017Fa-zA-Z]$/.test(newKey)) {
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
    };

    const handleKeyDown = (event) => {
        try {
            const newKey = event.key;
            const guessWord = keysArray.join("");

            switch (newKey) {
                case "Backspace":
                    setKeysArray((prevKeys) => prevKeys.slice(0, -1));
                    break;
                case "Enter":
                    if (guessWord.length !== desiredWordLength) {
                        return console.log(
                            "Please make sure guessed word is long enough"
                        );
                    }
                    handleGuess(guessWord);
                    setKeysArray([]);
                    break;
                default:
                    handleDefaultKey(newKey);
                    break;
            }
        } catch (error) {
            console.error("Error in handleKeyDown:", error);
        }
    };

    const createCells = (i) => {
        const cells = [];
        for (let j = 0; j < desiredWordLength; j++) {
            if (i === 0) {
                // Display feedback in row 0
                cells.push(
                    <Cell
                        key={j}
                        id={`cell-${j}`}
                        className={feedbackArray[j]?.className}
                    >
                        {feedbackArray[j]?.key}
                    </Cell>
                );
            } else {
                // Allow typing in row 1
                cells.push(
                    <Cell key={j} id={`cell-${j}`}>
                        {keysArray[j]}
                    </Cell>
                );
            }
        }
        return cells;
    };

    const generateGrid = () => {
        try {
            const rows = [];
            for (let i = 0; i < 2; i++) {
                const cells = createCells(i);
                rows.push(
                    <div key={i} id={`row-${i}`} className="row">
                        {cells}
                    </div>
                );
            }
            return rows;
        } catch (error) {
            console.error("Error in generateGrid:", error);
        }
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
