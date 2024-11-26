import { cn } from "@/lib/utils";

interface CrosswordCellProps {
  value: string;
  clueNumber?: string;
  isSelected: boolean;
  onClick: () => void;
  onChange: (value: string) => void;
}

export function CrosswordCell({ 
  value, 
  clueNumber, 
  isSelected, 
  onClick, 
  onChange 
}: CrosswordCellProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "aspect-square border-2 flex items-center justify-center cursor-pointer",
        "text-lg md:text-2xl font-bold relative transition-all min-h-[60px] md:min-h-[80px]",
        "bg-white/90 border-blue-200",
        isSelected && "border-blue-500 shadow-lg scale-105"
      )}
    >
      {clueNumber && (
        <span className="absolute top-0.5 left-0.5 text-[10px] text-blue-600">
          {clueNumber}
        </span>
      )}
      <input
        type="text"
        maxLength={1}
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        className="w-full h-full text-center bg-transparent text-blue-700 focus:outline-none uppercase"
      />
    </div>
  );
}