import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Game from "./components/Game";
import Highscore from "./components/Highscore";
import About from "./components/About";
import "./App.css";

const App = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api");
            const json = await response.json();
            setData(json.message);
        };
        fetchData();
    }, []);

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    {data === null ? (
                        <p>Loading...</p>
                    ) : (
                        <nav className="Navbar">
                            <ul>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                                <li>
                                    <Link to="/">Game</Link>
                                </li>
                                <li>
                                    <Link to="/highscore">Highscore</Link>
                                </li>
                            </ul>
                        </nav>
                    )}
                </header>
                <main className="App-main">
                    <Routes>
                        <Route path="/" element={<Game />} />
                        <Route
                            path="/highscore"
                            element={<Highscore data={data} />}
                        />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
