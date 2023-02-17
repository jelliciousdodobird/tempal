import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FavoritesState = {
  favoriteTems: string[];
  addToFavorites: (temName: string) => void;
  removeFromFavorites: (temName: string) => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favoriteTems: [] as string[],
      addToFavorites: (temName) =>
        set((state) => ({ favoriteTems: [...state.favoriteTems, temName] })),
      removeFromFavorites: (temName) =>
        set((state) => {
          const { favoriteTems: tems } = state;
          const i = tems.findIndex((name) => name === temName);
          if (i === -1) return state;
          return { favoriteTems: [...tems.slice(0, i), ...tems.slice(i + 1)] };
        }),
    }),
    { name: "favorite-tems", version: 1 }
  )
);
