import React, { createContext, useContext, useState } from 'react';

interface CrosswordContextType {
  across: Record<string, string>;
  down: Record<string, string>;
  answers: Record<string, string>;
  onComplete?: () => void;
  isCompleted?: boolean;
}

const CrosswordContext = createContext<CrosswordContextType | undefined>(undefined);

export function CrosswordProvider({ 
  children,
  across,
  down,
  answers,
  onComplete,
  isCompleted
}: CrosswordContextType & { children: React.ReactNode }) {
  return (
    <CrosswordContext.Provider value={{ across, down, answers, onComplete, isCompleted }}>
      {children}
    </CrosswordContext.Provider>
  );
}

export function useCrossword() {
  const context = useContext(CrosswordContext);
  if (context === undefined) {
    throw new Error('useCrossword must be used within a CrosswordProvider');
  }
  return context;
}