import { create } from "zustand";

interface FABState {
  hideFAB: boolean;
  setHideFAB: (value: boolean) => void;
}

export const useFABStore = create<FABState>((set) => ({
  hideFAB: false,
  setHideFAB: (value) => set({ hideFAB: value }),
}));
