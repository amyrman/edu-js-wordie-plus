import React, { useState, useEffect } from "react";
import "../styles/GameBoard.css";
import GameSetup from "./GameSetup";

function GameBoard() {
  const [numLetters, setNumLetters] = useState(4);
  const numRows = 6;
  const rows = Array.from({ length: numRows }, (_, i) => i);
  const [pressedKeys, setPressedKeys] = useState(() =>
    Array(numRows)
      .fill()
      .map(() => Array(numLetters).fill(null))
  );
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const [gameSetupCompleted, setGameSetupCompleted] = useState(false);

  useEffect(() => {
    if (gameSetupCompleted) {
      const handleKeyDown = (event) => {
        if (event.repeat) {
          return;
        }

        if (event.key === "Enter") {
          const typedWord = pressedKeys[activeRowIndex].join("");
          if (typedWord.length === numLetters) {
            fetch("/api/guess", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ guessWord: typedWord }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data.checkedLetters);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        } else {
          setPressedKeys((prevPressedKeys) => {
            const currentRow = prevPressedKeys[activeRowIndex];
            const currentCellIndex = currentRow.findIndex(
              (key) => key === null
            );
            if (currentCellIndex !== -1 && !currentRow.includes(event.key)) {
              const newPressedKeys = [...prevPressedKeys];
              newPressedKeys[activeRowIndex][currentCellIndex] = event.key;
              return newPressedKeys;
            }
            return prevPressedKeys;
          });
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activeRowIndex, gameSetupCompleted]);

  const handleNumLettersChange = (event) => {
    setNumLetters(parseInt(event.target.value));
    setPressedKeys(
      Array(numRows)
        .fill()
        .map(() => Array(parseInt(event.target.value)).fill(null))
    );
  };

  const handleGameSetupComplete = () => {
    setGameSetupCompleted(true);
  };

  return (
    <div className="game-board">
      {!gameSetupCompleted && (
        <GameSetup
          numLetters={numLetters}
          handleNumLettersChange={handleNumLettersChange}
          handleGameSetupComplete={handleGameSetupComplete}
        />
      )}
      {gameSetupCompleted &&
        rows.map((row, rowIndex) => (
          <div
            key={row}
            className={`game-board-row-${rowIndex} ${
              rowIndex === activeRowIndex ? "active" : ""
            }`}
            onClick={() => setActiveRowIndex(rowIndex)}
          >
            {Array.from({ length: numLetters }, (_, i) => (
              <div key={i} className="game-board-cell">
                {pressedKeys[rowIndex][i] && (
                  <span>{pressedKeys[rowIndex][i]}</span>
                )}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

export default GameBoard;
