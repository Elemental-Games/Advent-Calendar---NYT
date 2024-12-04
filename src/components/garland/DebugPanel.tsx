interface DebugPanelProps {
  logs: string[];
}

export function DebugPanel({ logs }: DebugPanelProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 text-white p-4 h-32 overflow-auto text-xs z-50">
      {logs.map((log, i) => (
        <div key={i}>{log}</div>
      ))}
    </div>
  );
}