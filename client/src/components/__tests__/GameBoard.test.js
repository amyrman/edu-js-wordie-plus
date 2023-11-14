/* eslint-env jest */

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

import GameBoard from "../GameBoard";

test("GameBoard handles key presses correctly", () => {
    const { container } = render(<GameBoard desiredWordLength={5} />);

    const grid = container.querySelector(".grid");
    fireEvent.keyDown(grid, { key: "A", code: "KeyA" });
    fireEvent.keyDown(grid, { key: "B", code: "KeyB" });
    fireEvent.keyDown(grid, { key: "C", code: "KeyC" });
    fireEvent.keyDown(grid, { key: "D", code: "KeyD" });
    fireEvent.keyDown(grid, { key: "E", code: "KeyE" });

    for (let i = 0; i < 5; i++) {
        waitFor(() => {
            const cell = container.querySelector(`#cell-${i}`);
            expect(cell.textContent).toBe(String.fromCharCode(65 + i));
        });
    }
});

test("non-alphabetical keys are ignored, alphabetical are not", () => {
    const { container } = render(<GameBoard desiredWordLength={5} />);
    const grid = container.querySelector(".grid");
    const firstCell = container.querySelector("#cell-0");

    fireEvent.keyDown(grid, { key: "1" });
    expect(firstCell.textContent).toBe("");

    fireEvent.keyDown(grid, { key: "a" });
    waitFor(() => {
        expect(firstCell.textContent).toBe("a");
    });
});

test("renders GameBoard component without crashing", () => {
    render(<GameBoard />);
});
