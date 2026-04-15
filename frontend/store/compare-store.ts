"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type CompareState = {
  ids: string[];
  toggle: (id: string) => void;
  clear: () => void;
};

export const useCompareStore = create<CompareState>()(
  persist(
    (set) => ({
      ids: [],
      toggle: (id) =>
        set((state) => {
          if (state.ids.includes(id)) {
            return { ids: state.ids.filter((item) => item !== id) };
          }
          if (state.ids.length >= 4) {
            return { ids: [...state.ids.slice(1), id] };
          }
          return { ids: [...state.ids, id] };
        }),
      clear: () => set({ ids: [] }),
    }),
    { name: "smartbasket-compare" },
  ),
);
