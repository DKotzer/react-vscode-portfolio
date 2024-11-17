import { useEffect } from 'react';

interface KeyboardShortcutsProps {
  handleSend: () => void;
  isLoading: boolean;
  clearMessages: () => void;
  toggleTheme: () => void;
  toggleMatrix: () => void;
  focusInput: () => void;
}

export const useKeyboardShortcuts = ({
  handleSend,
  isLoading,
  clearMessages,
  toggleTheme,
  toggleMatrix,
  focusInput,
}: KeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Send message: Enter (no modifier needed)
      if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
        handleSend();
      }

      // Clear chat: Ctrl/Cmd + L
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        clearMessages();
      }

      // Focus input: Ctrl/Cmd + /
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        focusInput();
      }

      // Toggle theme: Ctrl/Cmd + B
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleTheme();
      }

      // Matrix effect: Ctrl/Cmd + M
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        toggleMatrix();
      }

      // Hire Dylan: Ctrl/Cmd + H
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        toggleMatrix(); // For now, trigger matrix effect
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleSend, isLoading, clearMessages, toggleTheme, toggleMatrix, focusInput]);
};

export default useKeyboardShortcuts;
