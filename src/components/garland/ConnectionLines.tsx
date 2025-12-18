/**
 * ConnectionLines Component
 * Renders SVG lines connecting selected cells in the word grid.
 * Creates visual feedback for the user's word selection path.
 * Lines are drawn between consecutive selected cells with a distinctive style.
 */
import React from 'react';
import { GRID_CELL_SIZE } from '@/lib/garland-constants';

interface ConnectionLinesProps {
  selectedCells: number[];
  gridWidth: number;
}

export function ConnectionLines({ selectedCells, gridWidth }: ConnectionLinesProps) {
  if (selectedCells.length < 2) return null;

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{
        width: `${gridWidth * GRID_CELL_SIZE}px`,
        height: '320px', // 8 rows * 40px
      }}
    >
      {selectedCells.slice(1).map((cell, index) => {
        const prevCell = selectedCells[index];
        const startRow = Math.floor(prevCell / 6);
        const startCol = prevCell % 6;
        const endRow = Math.floor(cell / 6);
        const endCol = cell % 6;

        const startX = startCol * GRID_CELL_SIZE + GRID_CELL_SIZE / 2;
        const startY = startRow * GRID_CELL_SIZE + GRID_CELL_SIZE / 2;
        const endX = endCol * GRID_CELL_SIZE + GRID_CELL_SIZE / 2;
        const endY = endRow * GRID_CELL_SIZE + GRID_CELL_SIZE / 2;

        return (
          <line
            key={`${prevCell}-${cell}`}
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            stroke="#FFA500"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}