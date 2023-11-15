// React hooks
import { useState } from "react";

// local modules
import Cell from "./Cell";
import { sendGuess } from "../services/api";

// styles
import "../styles/GameBoard.css";

export default function GameBoard({
    desiredWordLength,
    allowRepLetters,
    startTime
}) {
    const [keysArray, setKeysArray] = useState([]);
    const [feedbackArray, setFeedbackArray] = useState([]);
    const [guesses, setGuesses] = useState(1);

    const gameOver = () => {
        let endTime = Date.now();
        console.log("start time:", startTime)
        let timeTaken = endTime - startTime;
        console.log("End time:", endTime);

        // Get the player's name
        let playerName = prompt("You won!! Please enter highscore name:"); // Or get the value from an input / form field

        const data = {
            name: playerName,
            timeTaken: timeTaken,
            guesses: guesses,
            desiredWordLength: desiredWordLength,
            allowRepLetters: allowRepLetters,
        };

        fetch("/api/highscores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

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

    const handleGuess = async (guessWord) => {
        try {
            const responseData = await sendGuess({ guessWord: guessWord });
            console.log("Response data:", responseData);

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
                    // setGuesses((prevGuesses) => [...prevGuesses, guessWord]);
                    handleGuess(guessWord);
                    setKeysArray([]);
                    break;
                default:
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
                    break;
            }
        } catch (error) {
            console.error("Error in handleKeyDown:", error);
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
            rows.push(
                <div key={i} id={`row-${i}`} className="row">
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
