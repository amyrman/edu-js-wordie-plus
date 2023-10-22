import React, { useState } from "react";
import { startGame } from "../services/api.js";

function GameSetup(props) {
  const { handleGameSetupComplete } = props;
  const [numLetters, setNumLetters] = useState(5);
  const [repeatableLetters, setRepeatableLetters] = useState(false);

  const handleNumLettersChange = (event) => {
    setNumLetters(parseInt(event.target.value));
  };

  const handleRepeatableLettersChange = (event) => {
    setRepeatableLetters(event.target.checked);
  };

  const handleStartClick = () => {
    const data = { numLetters, repeatableLetters };

    startGame(data)
      .then(() => {
        console.log("Game started successfully");
        handleGameSetupComplete();
      })
      .catch((error) => {
        console.error("Error starting game:", error);
      });
  };

  return (
    <div>
      <h2>Game Setup</h2>
      <label htmlFor="numLetters">Number of Letters:</label>
      <select
        id="numLetters"
        name="numLetters"
        value={numLetters}
        onChange={handleNumLettersChange}
      >
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>
      <br />
      <label htmlFor="repeatableLetters">Allow Repeatable Letters:</label>
      <input
        type="checkbox"
        id="repeatableLetters"
        name="repeatableLetters"
        checked={repeatableLetters}
        onChange={handleRepeatableLettersChange}
      />
      <br />
      <button onClick={handleStartClick}>Start</button>
    </div>
  );
}

export default GameSetup;
