import React from "react";
import "./GameBoard.css";

function GameBoard(props) {
  const { numRows } = props;
  const rows = Array.from({ length: numRows }, (_, i) => i);

  return (
    <div className="game-board">
      {rows.map((row, rowIndex) => (
        <div key={row} className={`game-board-row-${rowIndex}`}>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="game-board-cell"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
