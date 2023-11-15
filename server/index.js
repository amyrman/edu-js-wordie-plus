import database from "./database.js";
import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import helpers from "./helpers.js";
import getFeedback, { getCorrectWord } from "./utils/feedback.js";

const port = process.env.port || 3001;
const app = express();

app.engine("handlebars", engine({ helpers }));
app.set("view engine", "handlebars");
// app.set('views', './views');
app.use(express.static('public'))
app.use(bodyParser.json());


app.get("/highscores", (req, res) => {
  let sql = `SELECT * FROM highscores ORDER BY timeTaken ASC, guesses ASC LIMIT 20`;

    database.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render("highscores", {
            pageTitle: "Highscores",
            highscores: rows,
        });
    });
});

app.post("/highscores", (req, res) => {
    const { name, timeTaken, guesses, desiredWordLength, allowRepLetters } =
        req.body;

    database.run(
        `INSERT INTO highscores(name, timeTaken, guesses, desiredWordLength, allowRepLetters) VALUES(?, ?, ?, ?, ?)`,
        [name, timeTaken, guesses, desiredWordLength, allowRepLetters],
        function (err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            res.status(200).json({ message: "Highscore saved successfully." });
        }
    );
});

let correctWord;

app.post("/start", (req, res) => {
    const { lang, desiredWordLength, allowRepLetters } = req.body;
    try {
        correctWord = getCorrectWord(lang, desiredWordLength, allowRepLetters);
        res.sendStatus(200);
        console.log(correctWord);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/guess", (req, res) => {
    const { guessWord } = req.body;
    const checkedLetters = getFeedback(guessWord, correctWord);
    res.json({ checkedLetters });
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
