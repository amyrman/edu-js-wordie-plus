import app from "./server.js";
import { handleEvents, handleStartGame, handleMakeGuess } from "../services/gameService.js";
import { getHighscoresHandler, insertHighscoreHandler } from "../services/highscoreService.js";
import handleError from "../middleware/errorHandler.js";

// GET METHODS
app.get("/api/events", handleEvents);
app.get("/api/highscores", getHighscoresHandler);

// POST METHODS
app.post("/api/highscores", insertHighscoreHandler);
app.post("/api/start", handleStartGame);
app.post("/api/guess", handleMakeGuess);

// Error handling middlewared
app.use(handleError);
