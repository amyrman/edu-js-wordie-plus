import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Game from "./components/Game";
import About from "./components/About";
import "./App.css";
import WebFont from "webfontloader";

WebFont.load({
    google: {
        families: ["Press Start 2P", "cursive"],
    },
});

const App = () => {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <nav className="Navbar">
                        <ul>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/">Game</Link>
                            </li>
                            <li>
                                <a href="/api/highscores">Highscores</a>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main className="App-main">
                    <Routes>
                        <Route path="/" element={<Game />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
