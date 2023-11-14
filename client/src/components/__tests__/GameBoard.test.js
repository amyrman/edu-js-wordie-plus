/* eslint-env jest */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import GameBoard from '../GameBoard';

test('renders GameBoard component without crashing', () => {
  render(<GameBoard />);
});

test('cells are updated correctly when keys are pressed', async () => {
  const desiredWordLength = 5;
  const { container } = render(<GameBoard desiredWordLength={desiredWordLength} />);

  // Get the grid
  const grid = container.querySelector('.grid');

  // Simulate key presses to fill all cells
  for (let i = 0; i < desiredWordLength; i++) {
    fireEvent.keyDown(grid, { key: String.fromCharCode(65 + i), code: `Key${String.fromCharCode(65 + i)}` });
  }

  // Get all cells
  const cells = await waitFor(() => container.querySelectorAll('.cell'));

  // Check the number of cells
expect(cells.length).toBe(desiredWordLength);

  // Check that each cell has been updated with the correct key
  for (let i = 0; i < desiredWordLength; i++) {
    expect(cells[i].textContent).toBe(String.fromCharCode(65 + i));
  }
});
