function Highscore(props) {
  const { data } = props;
  return (
    <div>
      <h1>Highscores</h1>
      <p>These are the Top 10 best guessers!</p>
      <div>
        <p>{data}</p>
      </div>
    </div>
  );
}

export default Highscore;
