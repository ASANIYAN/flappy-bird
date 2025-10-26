import { create } from "zustand";

export interface Pipe {
  id: string;
  x: number;
  gapY: number;
  passed: boolean;
}

export interface PipeState {
  pipes: Pipe[];
  addPipe: (pipe: Pipe) => void;
  updatePipes: (pipes: Pipe[] | ((prevPipes: Pipe[]) => Pipe[])) => void;
  removePipe: (id: string) => void;
  clearPipes: () => void;
}

export const usePipeStore = create<PipeState>()((set) => ({
  pipes: [],

  addPipe: (pipe: Pipe) =>
    set((state) => ({
      pipes: [...state.pipes, pipe],
    })),

  updatePipes: (pipes: Pipe[] | ((prevPipes: Pipe[]) => Pipe[])) =>
    set((state) => ({
      pipes: typeof pipes === "function" ? pipes(state.pipes) : pipes,
    })),

  removePipe: (id: string) =>
    set((state) => ({
      pipes: state.pipes.filter((pipe) => pipe.id !== id),
    })),

  clearPipes: () => set({ pipes: [] }),
}));
