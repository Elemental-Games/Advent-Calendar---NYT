/**
 * GameHeader Component
 * Displays the game title, theme, and elapsed time.
 * Formats and shows the timer in minutes:seconds format.
 * Provides context about the current game session.
 */
import React from 'react';

interface GameHeaderProps {
  elapsedTime: number;
}

export function GameHeader({ elapsedTime }: GameHeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center space-y-2">
      <p className="text-sm text-muted-foreground">
        Theme: "Artists"
      </p>
      <div className="text-lg font-mono text-green-600">
        {formatTime(elapsedTime)}
      </div>
    </div>
  );
}