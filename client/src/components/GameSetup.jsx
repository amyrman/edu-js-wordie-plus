// React hooks
import { useState, useRef } from "react";

// local modules
import { startGame } from "../services/api.js";

// styles
import "../styles/GameSetup.css";

// TODO: Add conditionally rendered "advanced" options

export default function GameSetup({
    onStart,
    onDesiredWordLengthChange,
    onAllowRepeatedLettersChange,
    setStartTime
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
    formMaxGuessOptions.push(
        <option key={11} value="unlimited">
            Unlimited
        </option>
    );

    const handleStartClick = (event) => {
        event.preventDefault();

        setStartTime(Date.now());

        const form = event.target.elements;
        const desiredWordLength = parseInt(form.desiredWordLength.value);
        const allowRepLetters = form.allowRepLetters.checked;
        const lang = form.lang.value;

        onDesiredWordLengthChange(desiredWordLength);
        onAllowRepeatedLettersChange(allowRepLetters);

        const data = { lang, desiredWordLength, allowRepLetters };

        startGame(data)
            // catch errors in api.js instead?
            .then(() => {
                console.log("Game started successfully");
                setError(null);
                onStart();
            })
            .catch((error) => {
                console.error("Error starting game:", error);
                setError(error.message);
            });
    };

    const handleRandomizeClick = () => {
        // Generate random values for each form field
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
                <button className="start-button" type="submit">
                    Start
                </button>
            </form>
        </div>
    );
}
