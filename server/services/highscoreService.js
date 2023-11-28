import { insertHighscore, getHighscores } from "../db/database.js";
import { sessionTime } from './gameService.js';

export function getHighscoresHandler(req, res, next) {
  getHighscores((err, rows) => {
    if (err) {
      next(err);
    } else {
      res.render('highscores', { highscores: rows });
    }
  });
}

export function insertHighscoreHandler(req, res, next) {
  console.log("insertHighscoreHandler called");
  const { name, guesses, desiredWordLength, allowRepLetters } = req.body;
  console.log(`insertHighscoreHandler received sessionTime: ${sessionTime}`);
  insertHighscore(
    name,
    sessionTime,
    guesses,
    desiredWordLength,
    allowRepLetters,
    (err, lastID) => {
      if (err) {
        next(err);
      } else {
        console.log(`A row has been inserted with rowid ${lastID}`);
        res.status(200).json({
          message: "Highscore saved successfully.",
        });
      }
    }
  );
}
