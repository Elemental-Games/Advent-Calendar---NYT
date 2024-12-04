import { useEffect, useRef } from "react";

interface WordleInputProps {
  currentGuess: string;
  isGameOver: boolean;
  onInput?: (value: string) => void;
  onEnter?: () => void;
  onBackspace?: () => void;
}

export function WordleInput({ currentGuess, isGameOver, onInput, onEnter, onBackspace }: WordleInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return;
      
      if (e.key === 'Enter') {
        onEnter?.();
      } else if (e.key === 'Backspace') {
        onBackspace?.();
      } else if (/^[A-Za-z]$/.test(e.key)) {
        const value = e.key.toUpperCase();
        onInput?.(prev => {
          if (prev.length < 5) {
            return prev + value;
          }
          return prev;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameOver, onInput, onEnter, onBackspace]);

  useEffect(() => {
    // Focus input when component mounts
    if (!isGameOver) {
      inputRef.current?.focus();
    }
  }, [isGameOver]);

  return (
    <input
      ref={inputRef}
      type="text"
      className="opacity-0 absolute w-0 h-0"
      value={currentGuess}
      onChange={(e) => {
        // We'll handle direct input changes through the keydown event listener
        // This prevents double input registration
      }}
      autoComplete="off"
      autoCapitalize="off"
      spellCheck="false"
      disabled={isGameOver}
    />
  );
}