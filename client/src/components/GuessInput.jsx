import { sendGuess } from "../services/api";

export default function GuessInput() {
    // logic for handling user input
    // function that is executed when submitting text input
    function handleSubmit() {
      const data = { guessWord: typedWord };
        event.preventDefault();
        sendGuess(data);
        // set the input word as guessWord
        // how?? somehow send the text word from the form input type text
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter your guess here" />
            </form>
        </>
    );
}
