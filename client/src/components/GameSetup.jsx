// React hooks
import { useState, useRef } from "react";

// local modules
import api from "../services/api.js";

// styles
import "../styles/GameSetup.css";

// TODO: Add conditionally rendered "advanced" options and New Game+ options
// TODO: Refactor allowRepLetters to use state instead of useRef - https://kanbanflow.com/t/zHKMeBf3

export default function GameSetup({
    onStart,
    onDesiredWordLengthChange,
    onAllowRepeatedLettersChange,
    isGameRunning,
}) {
    const [error, setError] = useState(null);
    const allowRepLettersRef = useRef();
    const formWordLengthOptions = [<option key={0} value={null}></option>];
    for (let i = 2; i <= 32; i++) {
        formWordLengthOptions.push(
            <option key={i} value={i}>
                {i}
            </option>
        );
    }
    const formMaxGuessOptions = [<option key={0} value={null}></option>];
    for (let i = 1; i <= 10; i++) {
        formMaxGuessOptions.push(
            <option key={i} value={i}>
                {i}
            </option>
        );
    }
    // TODO: Remove hard coded key
    formMaxGuessOptions.push(
        <option key={11} value="unlimited">
            Unlimited
        </option>
    );

    const handleStartClick = (event) => {
        event.preventDefault();

        const form = event.target.elements;
        const desiredWordLength = parseInt(form.desiredWordLength.value);
        const allowRepLetters = form.allowRepLetters.checked;
        const lang = form.lang.value;

        onDesiredWordLengthChange(desiredWordLength);
        onAllowRepeatedLettersChange(allowRepLetters);

        const data = {
            lang,
            desiredWordLength,
            allowRepLetters,
        };

        //TODO: change api comm to specific operations in ../services/api.js
        // TODO: Fix error to be understandable to user once again + add output that game has to be restarted or something
        api.performHttpOperation("POST", "/api/start", data)
            .then((response) => {
                console.log("Game started successfully");
                setError(null);
                onStart(response.startTime);
            })
            .catch((error) => {
                console.error("Error starting game:", error);
                setError(error.message);
            });
    };

    const handleRandomizeClick = () => {
        // Generate random values for each form field according to some weird common expression (max - min + 1) and + 2 to adjust the range to be between 2 - 32
        const randomWordLength = Math.floor(Math.random() * (32 - 2 + 1)) + 2;
        const randomAllowRepLetters = Math.random() < 0.5;

        // Get the select elements and checkbox
        const wordLengthSelect = document.getElementById("desiredWordLength");

        // Set the select elements and checkbox to the random values
        wordLengthSelect.value = randomWordLength;
        allowRepLettersRef.current.checked = randomAllowRepLetters;
    };

    return (
        <div className="GameSetup">
            <h2>Game Setup</h2>
            <hr />
            <form onSubmit={handleStartClick}>
                <label htmlFor="lang">Language</label>
                <select id="lang" name="lang" defaultValue="en" required>
                    <option key="1">en</option>
                    <option key="2">sv</option>
                </select>
                {/* CHOOSE WORD LENGTH */}
                <label htmlFor="desiredWordLength">Number of letters</label>
                <select
                    id="desiredWordLength"
                    name="desiredWordLength"
                    defaultValue="5"
                    required
                >
                    {formWordLengthOptions}
                </select>

                {/* CHOOSE MAX GUESSES */}
                <label htmlFor="maxGuess">Max no. of guesses</label>
                <select
                    id="maxGuess"
                    name="maxGuess"
                    defaultValue="unlimited"
                    required
                    disabled
                >
                    {formMaxGuessOptions}
                </select>

                {/* CHOOSE IF WORD SHOULD HAVE REPEATED LETTERS */}
                <label htmlFor="allowRepLetters">Allow Repeated Letters</label>
                <input
                    ref={allowRepLettersRef}
                    type="checkbox"
                    id="allowRepLetters"
                    name="allowRepLetters"
                    defaultChecked={true}
                />

                <label className="dimmed" htmlFor="">
                    Soon to come: <br />
                    Time Trial Mode!
                </label>

                <button
                    className="shuffle-button"
                    type="button"
                    onClick={handleRandomizeClick}
                >
                    <span className="shuffle-icon">🔀</span>
                </button>
                {error && <p className="errorMessage">{error}</p>}
                <button
                    className="start-button"
                    type="submit"
                    disabled={isGameRunning}
                >
                    Start
                </button>
            </form>
        </div>
    );
}
