import React, { useState } from "react";
import GameSetup from "./GameSetup";
import GameBoard from "./GameBoard";
import Timer from "./Timer";
import "../styles/Game.css";

const Game = () => {
    const [setupComplete, setSetupComplete] = useState(false);
    const [desiredWordLength, setDesiredWordLength] = useState(null);
    const [allowRepLetters, setAllowRepLetters] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const ENDPOINT = "http://localhost:3001/api/events";

    function handleStartGame(startTime) {
        const eventSource = new EventSource(ENDPOINT);

        eventSource.onopen = () => {
            setStartTime(startTime);
            setSetupComplete(true);
        };
        // TODO: Set startTime to sessionTime to sync with backend timer

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "start") {
                setStartTime(data.startTime);
            } else if (data.type === "stop") {
                // Stop the timer when a "stop" event is received
                setStartTime(null);
                resetGame();
            }
        };
        eventSource.onerror = (error) => {
            console.error("Error with EventSource", error);
        };
        return () => {
            eventSource.close();
        };
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

            {setupComplete && (
                <>
                    <Timer startTime={startTime} />
                    <GameBoard
                        desiredWordLength={desiredWordLength}
                        allowRepLetters={allowRepLetters}
                    />
                </>
            )}
        </>
    );
};

export default Game;
