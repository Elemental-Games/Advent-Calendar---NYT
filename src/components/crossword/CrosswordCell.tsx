/**
 * Individual cell component for the crossword grid.
 * Handles user input, displays cell content and clue numbers.
 * Manages cell state including selection and validation feedback.
 */

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CrosswordCellProps {
  value: string;
  clueNumber?: string;
  isSelected: boolean;
  isPartOfWord: boolean;
  isValidCell: boolean;
  isValidated?: boolean;
  onClick: () => void;
  onChange: (value: string) => void;
}

export const CrosswordCell = forwardRef<HTMLInputElement, CrosswordCellProps>(({ 
  value, 
  clueNumber, 
  isSelected,
  isPartOfWord,
  isValidCell,
  isValidated,
  onClick, 
  onChange 
}, ref) => {
  console.log(`Rendering cell with isValidCell: ${isValidCell}, value: ${value}`);
  
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full relative",
        "before:content-[''] before:float-left before:pt-[100%]",
        "transition-all duration-200"
      )}
    >
      <div className={cn(
        "absolute top-0 left-0 right-0 bottom-0",
        "border-2 flex items-center justify-center cursor-pointer",
        !isValidCell ? "bg-slate-800/90 border-slate-700 cursor-not-allowed" :
        isSelected ? "border-blue-500 shadow-lg scale-105 bg-blue-50" :
        isValidated !== undefined ? (
          isValidated ? "border-blue-700 bg-blue-700/20" : "border-blue-300 bg-blue-200/20"
        ) :
        isPartOfWord ? "border-blue-300 bg-blue-50/50" :
        "border-blue-200 bg-white"
      )}>
        {clueNumber && (
          <span className="absolute top-1 left-1 text-[10px] font-medium text-blue-600">
            {clueNumber}
          </span>
        )}
        {isValidCell && (
          <input
            ref={ref}
            type="text"
            maxLength={1}
            value={value || ''}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            className={cn(
              "w-full h-full text-center bg-transparent",
              "focus:outline-none uppercase text-2xl md:text-3xl font-bold",
              isValidCell ? "text-blue-700" : "text-slate-600"
            )}
          />
        )}
      </div>
    </div>
  );
});

CrosswordCell.displayName = "CrosswordCell";