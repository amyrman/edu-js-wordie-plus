import React from "react";
import "./Keyboard.css";

function Keyboard(props) {
    const { handleKeyPress } = props;

    const keyboardRows = [
        {
            letters: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        },
        {
            letters: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        },
        {
            letters: [
                {
                    key: "Backspace",
                    label: "Backspace",
                    className: "keyboard-button-backspace",
                },
                "Z",
                "X",
                "C",
                "V",
                "B",
                "N",
                "M",
                {
                    key: "Enter",
                    label: "Enter",
                    className: "keyboard-button-enter",
                },
            ],
        },
    ];

    return (
        <div className="keyboard">
            {keyboardRows.map((row, index) => (
                <div key={index} className="keyboard-row">
                    {row.letters.map((letter) => (
                        <button
                            key={letter.key || letter}
                            className={`keyboard-button ${
                                letter.className ? letter.className : ""
                            }`}
                            onClick={() =>
                                handleKeyPress({ key: letter.key || letter })
                            }
                        >
                            {letter.label || letter}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Keyboard;
