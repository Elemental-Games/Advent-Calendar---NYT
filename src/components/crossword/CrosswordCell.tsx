/**
 * Individual cell component for the crossword grid.
 * Handles user input, displays cell content and clue numbers.
 * Manages cell state including selection and validation feedback.
 * Provides visual feedback for validated cells and handles user interactions.
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
  isCompleted?: boolean;
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
  isCompleted,
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
        "border-2 flex items-center justify-center",
        !isValidCell ? "bg-slate-800/90 border-slate-700 cursor-not-allowed" :
        isCompleted ? "border-green-700 bg-green-50" :
        isSelected ? "border-blue-500 shadow-lg scale-105 bg-blue-50" :
        isValidated !== undefined ? (
          isValidated ? "border-blue-700 bg-blue-700/20" : "border-blue-300 bg-blue-200/20"
        ) :
        isPartOfWord ? "border-blue-300 bg-blue-50/50" :
        "border-blue-200 bg-white",
        isCompleted ? "cursor-default" : "cursor-pointer"
      )}>
        {clueNumber && (
          <span className="absolute top-1 left-1 text-[10px] font-medium text-blue-600">
            {clueNumber}
          </span>
        )}
        {isValidCell && (
          <div className={cn(
            "w-full h-full flex items-center justify-center",
            "text-2xl md:text-3xl font-bold",
            isCompleted ? "text-green-700" : "text-blue-700"
          )}>
            {value}
          </div>
        )}
      </div>
    </div>
  );
});

CrosswordCell.displayName = "CrosswordCell";