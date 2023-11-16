import React, { useState } from "react";
import GameSetup from "./GameSetup";
import GameBoard from "./GameBoard";
import "../styles/Game.css";

const Game = () => {
    const [setupComplete, setSetupComplete] = useState(false);
    const [desiredWordLength, setDesiredWordLength] = useState(null);
    const [allowRepLetters, setAllowRepLetters] = useState(false);

    function handleStartGame() {
        setSetupComplete(true);
    }

    function handleWordLengthChange(length) {
        setDesiredWordLength(length);
    }

    function handleAllowRepLettersChange(allow) {
        setAllowRepLetters(allow);
    }

    return (
        <>
            <h1>Wordie+</h1>
            <GameSetup
                onStart={handleStartGame}
                onDesiredWordLengthChange={handleWordLengthChange}
                onAllowRepeatedLettersChange={handleAllowRepLettersChange}
            />

            {setupComplete &&(
                <GameBoard
                    desiredWordLength={desiredWordLength}
                    allowRepLetters={allowRepLetters}
                />
            )}
        </>
    );
};

export default Game;
