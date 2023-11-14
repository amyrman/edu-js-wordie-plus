import express from "express";
import bodyParser from "body-parser";
import getFeedback, { getCorrectWord } from "./utils/feedback.js";
import feedback from "./utils/feedback.js";
const port = process.env.port || 3001;
const app = express();

app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.get("/highscore", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.get("/about", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

let correctWord;

app.post("/start", (req, res) => {
  const { desiredWordLength, allowRepLetters } = req.body;
  try {
  correctWord = getCorrectWord(desiredWordLength, allowRepLetters);
  res.sendStatus(200);
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

app.post('/guess', (req, res) => {
  const { guessWord } = req.body;
  const checkedLetters = getFeedback(guessWord, correctWord);
  res.json({ checkedLetters });
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
