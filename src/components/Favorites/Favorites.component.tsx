"use client";
import { forwardRef } from "react";
import { useHasMounted } from "../../hooks/useHasMounted";
import { useFavoritesStore } from "../../store/favorites-store";

type FavoritesProps = {};

export const Favorites = forwardRef<HTMLDivElement, FavoritesProps>(
  ({ ...props }, ref) => {
    const mounted = useHasMounted();
    const { favoriteTems, addToFavorites, removeFromFavorites } =
      useFavoritesStore();

    if (!mounted) return <>skeleton</>;

    return <div>Favorites</div>;
  }
);
