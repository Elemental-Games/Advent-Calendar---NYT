import { useEffect, useRef } from "react";

interface WordleInputProps {
  currentGuess: string;
  onInput: (value: string) => void;
}

export function WordleInput({ currentGuess, onInput }: WordleInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input when component mounts
    inputRef.current?.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      className="opacity-0 absolute w-0 h-0"
      value={currentGuess}
      onChange={(e) => {
        const value = e.target.value.toUpperCase();
        if (/^[A-Z]*$/.test(value)) {
          onInput(value);
        }
      }}
      autoComplete="off"
      autoCapitalize="off"
      spellCheck="false"
    />
  );
}