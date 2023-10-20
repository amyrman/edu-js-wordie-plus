import GameBoard from "./GameBoard";
import Keyboard from "./Keyboard";
import "./Game.css";

function Game() {

  const handleKeyPress = (event) => {
    if (event.key === "Backspace") {
      // Handle backspace key press
    } else if (event.key === "Enter") {
      // Handle enter key press
    } else {
      // Handle letter key press
    }
  };

  return (
    <div>
      <h1>Wordle</h1>
      <p>Guess the secret word in 6 tries or less!</p>

      <GameBoard numRows={6} />

      <Keyboard handleKeyPress={handleKeyPress} />
    </div>
  );
}

export default Game;
