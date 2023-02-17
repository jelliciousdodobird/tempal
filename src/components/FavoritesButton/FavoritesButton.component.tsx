"use client";

import { IconHeartFilled } from "@tabler/icons-react";
import { useHasMounted } from "../../hooks/useHasMounted";
import { useFavoritesStore } from "../../store/favorites-store";

type FavoritesButtonProps = {
  temName: string;
};

export const FavoritesButton = ({ temName }: FavoritesButtonProps) => {
  const mounted = useHasMounted();
  const { favoriteTems, addToFavorites, removeFromFavorites } =
    useFavoritesStore();

  if (!mounted) return <>skeleton</>;

  return (
    <button type="button" className="">
      <IconHeartFilled />
    </button>
  );
};
