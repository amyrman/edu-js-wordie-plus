import { useState } from "react";
import { useRef } from "react";
import "../styles/GameSetup.css";
import { startGame } from "../services/api.js";

function GameSetup({
    onStart,
    onDesiredWordLengthChange,
    onAllowRepeatedLettersChange,
    onMaxGuessChange,
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

        const form = event.target.elements;
        const desiredWordLength = parseInt(form.desiredWordLength.value);
        const allowRepLetters = form.allowRepLetters.checked;
        const maxGuess = form.maxGuess.value === "unlimited" ? "unlimited" : parseInt(form.maxGuess.value);

        onDesiredWordLengthChange(desiredWordLength);
        onAllowRepeatedLettersChange(allowRepLetters);
        onMaxGuessChange(maxGuess);

        const data = { desiredWordLength, allowRepLetters };

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
        const randomNumRows = Math.floor(Math.random() * 10) + 1;
        const randomWordLength = Math.floor(Math.random() * (32 - 2 + 1)) + 2;
        const randomAllowRepLetters = Math.random() < 0.5;

        // Get the select elements and checkbox
        const maxGuessSelect = document.getElementById("maxGuess");
        const wordLengthSelect = document.getElementById("desiredWordLength");

        // Set the select elements and checkbox to the random values
        maxGuessSelect.value = randomNumRows;
        wordLengthSelect.value = randomWordLength;
        allowRepLettersRef.current.checked = randomAllowRepLetters;
    };

    return (
        <div className="GameSetup">
            <h2>Game Setup</h2>
            <hr />
            <form onSubmit={handleStartClick}>
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
                <select id="maxGuess" name="maxGuess" defaultValue="unlimited" required>
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

                <label className="dimmed" htmlFor="">Soon to come: <br />Time Trial Mode!</label>

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

export default GameSetup;
