import sqlite3 from 'sqlite3';
const { verbose } = sqlite3;
const db = verbose().Database;

let database = new db('./highscores.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the highscores database.');
});

database.run(`CREATE TABLE highscores(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    sessionTime REAL,
    guesses INTEGER,
    desiredWordLength INTEGER,
    allowRepLetters BOOLEAN
)`, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Highscores table created.');
});

export default database;
