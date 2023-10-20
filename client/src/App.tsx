import React from "react";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api');
      const json = await response.json();
      setData(json.message);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {data === null ? (
          <p>Loading...</p>
        ) : (
          <p>{data}</p>
        )}
      </header>
    </div>
  );
}

export default App;
