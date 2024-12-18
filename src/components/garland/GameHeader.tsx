interface GameHeaderProps {
  elapsedTime: number;
  day: number;
}

export function GameHeader({ elapsedTime, day }: GameHeaderProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center space-y-2">
      <h2 className="text-xl font-bold">Garland #4 🎄</h2>
      <p className="text-sm text-muted-foreground">
        Theme: "Tis the Season"
      </p>
      <div className="text-lg font-mono text-green-600">
        {formatTime(elapsedTime)}
      </div>
    </div>
  );
}