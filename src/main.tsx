import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { clearAllPuzzleStates, clearDays5to8 } from './lib/game-state'

// Expose reset functions to browser console for easy access
(window as any).resetAdventCalendar = clearAllPuzzleStates;
(window as any).resetDays5to8 = clearDays5to8;

// Automatically clear days 5-8 on load to reset them
clearDays5to8();

createRoot(document.getElementById("root")!).render(<App />);
