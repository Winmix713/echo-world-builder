import React from 'react';

interface UndoRedoContextType {
  addToHistory: (state: any) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const UndoRedoContext = React.createContext<UndoRedoContextType>({
  addToHistory: () => {},
  undo: () => {},
  redo: () => {},
  canUndo: false,
  canRedo: false
});

export const UndoRedoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = React.useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number>(-1);
  
  const addToHistory = (state: any) => {
    // Remove any future states if we're not at the end of the history
    const newHistory = history.slice(0, currentIndex + 1);
    
    // Add the new state to the history
    newHistory.push(state);
    
    // Update the history and current index
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };
  
  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      // Apply the previous state
      const previousState = history[currentIndex - 1];
      applyState(previousState);
    }
  };
  
  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      // Apply the next state
      const nextState = history[currentIndex + 1];
      applyState(nextState);
    }
  };
  
  const applyState = (state: any) => {
    // This function would apply the state to the component
    // In a real implementation, this would update the component's state
    // For now, we'll just log it
    console.log('Applying state:', state);
  };
  
  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;
  
  return (
    <UndoRedoContext.Provider value={{ addToHistory, undo, redo, canUndo, canRedo }}>
      {children}
    </UndoRedoContext.Provider>
  );
};

export const useUndoRedo = () => React.useContext(UndoRedoContext);