import { create } from "zustand";

export interface Bird {
  y: number;
  velocity: number;
}

export interface BirdState {
  bird: Bird;
  setBirdY: (y: number) => void;
  setBirdVelocity: (velocity: number) => void;
  setBird: (bird: Bird | ((prevBird: Bird) => Bird)) => void;
  updateBird: (updates: Partial<Bird>) => void;
  clearBirdState: () => void;
}

const initialBirdState: Bird = {
  y: 300,
  velocity: 0,
};

export const useBirdStore = create<BirdState>()((set) => ({
  bird: initialBirdState,

  setBirdY: (y: number) =>
    set((state) => ({
      bird: { ...state.bird, y },
    })),

  setBirdVelocity: (velocity: number) =>
    set((state) => ({
      bird: { ...state.bird, velocity },
    })),

  setBird: (bird: Bird | ((prevBird: Bird) => Bird)) =>
    set((state) => ({
      bird: typeof bird === "function" ? bird(state.bird) : bird,
    })),

  updateBird: (updates: Partial<Bird>) =>
    set((state) => ({
      bird: { ...state.bird, ...updates },
    })),

  clearBirdState: () => set({ bird: initialBirdState }),
}));
