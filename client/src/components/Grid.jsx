import '../styles/Grid.css';

export default function Grid({ desiredWordLength, maxGuess }) {
  const rows = [];
  for (let i = 0; i < maxGuess; i++) {
    const cells = [];
    for (let j = 0; j < desiredWordLength; j++) {
      cells.push(<div key={j} className="cell"></div>);
    }
    rows.push(<div key={i} className="row">{cells}</div>);
  }
  return <div className="grid">{rows}</div>;
}
