import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CrosswordCellProps {
  value: string;
  clueNumber?: string;
  isSelected: boolean;
  isPartOfWord: boolean;
  isValidCell: boolean;
  onClick: () => void;
  onChange: (value: string) => void;
}

export const CrosswordCell = forwardRef<HTMLInputElement, CrosswordCellProps>(({ 
  value, 
  clueNumber, 
  isSelected,
  isPartOfWord,
  isValidCell,
  onClick, 
  onChange 
}, ref) => {
  if (!isValidCell) {
    return (
      <div className="aspect-square bg-gray-100" />
    );
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        "aspect-square border-2 flex items-center justify-center cursor-pointer relative",
        "transition-all duration-200",
        "min-h-[60px] md:min-h-[80px]",
        isSelected ? "border-blue-500 shadow-lg scale-105 bg-blue-50" :
        isPartOfWord ? "border-blue-300 bg-blue-50/50" :
        "border-blue-200 bg-white"
      )}
    >
      {clueNumber && (
        <span className="absolute top-0.5 left-0.5 text-[10px] text-blue-600">
          {clueNumber}
        </span>
      )}
      <input
        ref={ref}
        type="text"
        maxLength={1}
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        className={cn(
          "w-full h-full text-center bg-transparent text-blue-700",
          "focus:outline-none uppercase text-2xl md:text-3xl font-bold"
        )}
      />
    </div>
  );
});

CrosswordCell.displayName = "CrosswordCell";