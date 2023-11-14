import React, { useState } from "react";
import GameSetup from "./GameSetup";
import GameBoard from "./GameBoard";
import "../styles/Game.css";

const Game = () => {
    const [setupComplete, setSetupComplete] = useState(false);
    const [desiredWordLength, setDesiredWordLength] = useState(null);
    const [allowRepeatedLetters, setAllowRepeatedLetters] = useState(false);
    const [maxGuess, setNumRows] = useState(null);

    function handleStartGame() {
        setSetupComplete(true);
    }

    function handleWordLengthChange(length) {
        setDesiredWordLength(length);
    }

    function handleAllowRepeatedLettersChange(allow) {
        setAllowRepeatedLetters(allow);
    }

    function handleNumRowsChange(rows) {
        setNumRows(rows);
    }

    return (
        <>
            <h1>Wordie+</h1>
            <GameSetup
                onStart={handleStartGame}
                onDesiredWordLengthChange={handleWordLengthChange}
                onAllowRepeatedLettersChange={handleAllowRepeatedLettersChange}
                onMaxGuessChange={handleNumRowsChange}
            />

            {setupComplete && (
                <GameBoard
                    desiredWordLength={desiredWordLength}
                    allowRepeatedLetters={allowRepeatedLetters}
                    maxGuess={maxGuess}
                />
            )}
        </>
    );
};

export default Game;
