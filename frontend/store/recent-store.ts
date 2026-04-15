"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type RecentState = {
  viewed: string[];
  pushViewed: (id: string) => void;
};

export const useRecentStore = create<RecentState>()(
  persist(
    (set) => ({
      viewed: [],
      pushViewed: (id) =>
        set((state) => {
          const items = [id, ...state.viewed.filter((item) => item !== id)];
          return { viewed: items.slice(0, 10) };
        }),
    }),
    { name: "smartbasket-recent" },
  ),
);
