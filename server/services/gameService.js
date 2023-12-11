import { getFeedback, getCorrectWord } from "../utils/feedback.js";

let correctWord;
let eventSource;
let startTime;
let sessionTime;

// Exported route handlers: These are the functions that handle HTTP requests. They are the entry points to this module, so it makes sense to put them at the top.

export function handleEvents(req, res) {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });

    eventSource = res;

    // Send a message
    eventSource.write('data: {"message": "Connection established"}\n\n');

    req.on("close", () => {
      console.log("Connection closed by client");
        eventSource = null;
    });
}

export function handleStartGame(req, res, next) {
    const { lang, desiredWordLength, allowRepLetters } = req.body;
    try {
        const startTime = startGame(lang, desiredWordLength, allowRepLetters);
        sendEvent("start", { startTime });
        console.log("Start time:", startTime); // Log the start time

        // how is starttime then handled, when receiving res on client side?
        res.json({ startTime });
    } catch (error) {
        next(error);
    }
}

export function handleMakeGuess(req, res, next) {
    try {
        const { guessWord } = req.body;
        const checkedLetters = makeGuess(guessWord);
        res.json({ checkedLetters });
    } catch (error) {
        next(error);
    }
}

// Helper functions for route handlers: These are the functions that the route handlers call. They should be defined before they are used, so they come after the route handlers.

function startGame(lang, desiredWordLength, allowRepLetters) {
    startTime = Date.now();
    correctWord = getCorrectWord(lang, desiredWordLength, allowRepLetters);
    console.log(correctWord);
    return startTime;
}

function makeGuess(guessWord) {
    console.log(guessWord, correctWord);
    if (guessWord.toUpperCase() === correctWord.toUpperCase()) {
        sessionTime = (Date.now() - startTime) / 1000; // convert to seconds
        sessionTime = sessionTime.toFixed(2); // format with 2 decimals
        sendEvent("stop", { sessionTime });
        console.log(`Session time: ${sessionTime}`);
        if (eventSource) {
          console.log("Connection closed by server");
            eventSource.end();
            eventSource = null;
        }
    }
    return getFeedback(guessWord, correctWord);
}

function sendEvent(type, data) {
    if (eventSource) {
        eventSource.write(`data: ${JSON.stringify({ type, ...data })}\n\n`);
        // TODO: should res be flushed?
        // res.flush(); // Flush the response
    }
}

export { sessionTime };
