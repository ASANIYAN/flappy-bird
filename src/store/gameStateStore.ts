import { create } from "zustand";

export interface GameState {
  isGameRunning: boolean;
  score: number;
  highScore: number;
  isGameOver: boolean;
  isPaused: boolean;
}

export interface GameStateStore {
  gameState: GameState;
  setIsGameRunning: (isGameRunning: boolean) => void;
  setScore: (score: number) => void;
  setHighScore: (highScore: number) => void;
  setIsGameOver: (isGameOver: boolean) => void;
  setIsPaused: (isPaused: boolean) => void;
  setGameState: (gameState: GameState) => void;
  updateGameState: (updates: Partial<GameState>) => void;
  incrementScore: () => void;
  updateHighScore: (score: number) => void;
  resetGame: () => void;
  clearGameState: () => void;
}

const initialGameState: GameState = {
  isGameRunning: false,
  score: 0,
  highScore: 0,
  isGameOver: false,
  isPaused: false,
};

export const useGameStateStore = create<GameStateStore>()((set) => ({
  gameState: initialGameState,

  setIsGameRunning: (isGameRunning: boolean) =>
    set((state) => ({
      gameState: { ...state.gameState, isGameRunning },
    })),

  setScore: (score: number) =>
    set((state) => ({
      gameState: { ...state.gameState, score },
    })),

  setHighScore: (highScore: number) =>
    set((state) => ({
      gameState: { ...state.gameState, highScore },
    })),

  setIsGameOver: (isGameOver: boolean) =>
    set((state) => ({
      gameState: { ...state.gameState, isGameOver },
    })),

  setIsPaused: (isPaused: boolean) =>
    set((state) => ({
      gameState: { ...state.gameState, isPaused },
    })),

  setGameState: (gameState: GameState) => set({ gameState }),

  updateGameState: (updates: Partial<GameState>) =>
    set((state) => ({
      gameState: { ...state.gameState, ...updates },
    })),

  incrementScore: () =>
    set((state) => ({
      gameState: {
        ...state.gameState,
        score: state.gameState.score + 1,
      },
    })),

  updateHighScore: (score: number) =>
    set((state) => ({
      gameState: {
        ...state.gameState,
        highScore: Math.max(state.gameState.highScore, score),
      },
    })),

  resetGame: () =>
    set((state) => ({
      gameState: {
        ...initialGameState,
        highScore: state.gameState.highScore, // Preserve high score
      },
    })),

  clearGameState: () => set({ gameState: initialGameState }),
}));
