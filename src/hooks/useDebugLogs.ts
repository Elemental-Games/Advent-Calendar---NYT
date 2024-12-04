import { useState, useCallback } from 'react';

export function useDebugLogs() {
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  const addLog = useCallback((message: string) => {
    console.log(message); // Also log to console for development
    setDebugLogs(prev => [...prev.slice(-19), message]);
  }, []);

  return {
    debugLogs,
    addLog
  };
}