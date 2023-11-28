import sqlite3 from "sqlite3";

export const highscoresDb = new (sqlite3.verbose().Database)(
    "./db/highscores.db",
    (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connected to the highscores database.");
    }
);

export function createHighscoresTable() {
    highscoresDb.run(
        `CREATE TABLE highscores(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    sessionTime REAL,
    guesses INTEGER,
    desiredWordLength INTEGER,
    allowRepLetters BOOLEAN
)`,
        (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log("Highscores table created.");
        }
    );
}

export function insertHighscore(name, sessionTime, guesses, desiredWordLength, allowRepLetters, callback) {
    console.log(`insertHighscore called with sessionTime: ${sessionTime}`);
  highscoresDb.run(
      `INSERT INTO highscores(name, sessionTime, guesses, desiredWordLength, allowRepLetters) VALUES(?, ?, ?, ?, ?)`,
      [name, sessionTime, guesses, desiredWordLength, allowRepLetters],
      function (err) {
          callback(err, this.lastID);
      }
  );
}

export function getHighscores(callback) {
    const sql = `SELECT * FROM highscores ORDER BY sessionTime ASC, guesses ASC LIMIT 20`;
    highscoresDb.all(sql, [], callback);
}
