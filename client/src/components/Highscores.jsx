function HighscoreEntry(props) {
    const { name, sessionTime, guesses, desiredWordLength, allowRepeatedLetters } = props;
    return (
        <div>
            <p>Name: {name}</p>
            <p>Time Taken: {sessionTime}</p>
            <p>Guesses: {guesses}</p>
            <p>Desired Word Length: {desiredWordLength}</p>
            <p>Allow Repeated Letters: {allowRepeatedLetters ? 'Yes' : 'No'}</p>
        </div>
    );
}

function Highscores(props) {
    const { data } = props;
    return (
        <>
            <h1>Highscores</h1>
            <p>These are the Top 10 best guessers!</p>
            <div>
                {data.map((entry, index) => 
                    <HighscoreEntry key={index} {...entry} />
                )}
            </div>
        </>
    );
}

export default Highscores;
