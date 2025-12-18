import React from 'react';

interface GameHeaderProps {
  elapsedTime: number;
  theme?: string;
}

export function GameHeader({ elapsedTime, theme = "Artists" }: GameHeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center space-y-2">
      <p className="text-sm text-muted-foreground">
        Theme: "{theme}"
      </p>
      <div className="text-lg font-mono text-green-600">
        {formatTime(elapsedTime)}
      </div>
    </div>
  );
}