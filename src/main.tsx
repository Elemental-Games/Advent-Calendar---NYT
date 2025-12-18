import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { clearAllPuzzleStates } from './lib/game-state'

// Expose reset function to browser console for easy access
(window as any).resetAdventCalendar = clearAllPuzzleStates;

createRoot(document.getElementById("root")!).render(<App />);
