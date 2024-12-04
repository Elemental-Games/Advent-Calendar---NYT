import { useEffect, useRef } from "react";

interface WordleInputProps {
  currentGuess: string;
  isGameOver: boolean;
  onInput?: (value: string) => void;
}

export function WordleInput({ currentGuess, isGameOver, onInput }: WordleInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

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
        const value = e.target.value.toUpperCase();
        if (/^[A-Z]*$/.test(value)) {
          onInput?.(value);
        }
      }}
      autoComplete="off"
      autoCapitalize="off"
      spellCheck="false"
      disabled={isGameOver}
    />
  );
}