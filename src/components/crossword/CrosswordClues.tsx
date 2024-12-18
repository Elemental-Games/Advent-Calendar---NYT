import React from 'react';

export function CrosswordClues() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-lg mb-2">Across</h3>
        <div className="space-y-2">
          {/* Clues will be populated by the CrosswordProvider */}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-2">Down</h3>
        <div className="space-y-2">
          {/* Clues will be populated by the CrosswordProvider */}
        </div>
      </div>
    </div>
  );
}