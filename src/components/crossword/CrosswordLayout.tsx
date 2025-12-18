/**
 * Layout component that arranges all crossword elements.
 * Provides structure for the grid, clues, controls, and game information.
 * Acts as the main container for the crossword puzzle interface.
 */

import React from 'react';
import { CrosswordHeader } from "./CrosswordHeader";
import { CrosswordGrid } from "./CrosswordGrid";
import { CrosswordClue } from "./CrosswordClue";
import { CrosswordControls } from "./CrosswordControls";
import { CrosswordClueList } from "./CrosswordClueList";
import type { CellPosition } from "./types";

interface CrosswordLayoutProps {
  elapsedTime: number;
  grid: string[][];
  guesses: Record<string, string>;
  showDown: boolean;
  selectedCell: CellPosition | null;
  isValidCell: (row: number, col: number) => boolean;
  getClueNumber: (row: number, col: number) => string;
  handleCellClick: (row: number, col: number) => void;
  handleInputChange: (row: number, col: number, value: string) => void;
  cellRefs: React.MutableRefObject<(HTMLInputElement | null)[][]>;
  validatedCells?: Record<string, boolean>;
  currentClue: { number: string; direction: string; clue: string; } | null;
  onSubmit: () => void;
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  across: Record<string, string>;
  down: Record<string, string>;
  isCompleted?: boolean;
}

export function CrosswordLayout({
  elapsedTime,
  grid,
  guesses,
  showDown,
  selectedCell,
  isValidCell,
  getClueNumber,
  handleCellClick,
  handleInputChange,
  cellRefs,
  validatedCells,
  currentClue,
  onSubmit,
  onKeyPress,
  onBackspace,
  across,
  down,
  isCompleted = false
}: CrosswordLayoutProps) {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <CrosswordHeader elapsedTime={elapsedTime} />
      
      <div className="mb-8">
        <CrosswordGrid
          grid={grid}
          guesses={guesses}
          showDown={showDown}
          selectedCell={selectedCell}
          isValidCell={isValidCell}
          getClueNumber={getClueNumber}
          handleCellClick={handleCellClick}
          handleInputChange={handleInputChange}
          cellRefs={cellRefs}
          validatedCells={validatedCells}
          isCompleted={isCompleted}
        />
      </div>

      {currentClue && !isCompleted && (
        <CrosswordClue
          number={currentClue.number}
          direction={currentClue.direction}
          clue={currentClue.clue}
        />
      )}

      {!isCompleted && (
        <CrosswordControls
          onSubmit={onSubmit}
          onKeyPress={onKeyPress}
          onBackspace={onBackspace}
        />
      )}

      <CrosswordClueList across={across} down={down} />
    </div>
  );
}