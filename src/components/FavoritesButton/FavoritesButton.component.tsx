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

  const updateFavorites = ({ temName }: FavoritesButtonProps) => {
    const i = favoriteTems.findIndex((name) => name === temName);
    i === -1 ? addToFavorites(temName) : removeFromFavorites(temName);
  };

  if (!mounted)
    return <div className="w-10 h-10 bg-slate-500 animate-pulse"></div>;

  return (
    <button
      type="button"
      className="w-10 h-10 flex justify-center items-center rounded-full shadow-md transition ease-in-out delay-150 hover:scale-110 hover:bg-white/5 hover:backdrop-blur  duration-300"
      onClick={() => {
        updateFavorites({ temName });
      }}
    >
      <IconHeartFilled
        className={`w-6 h-6 ${
          favoriteTems.includes(temName) ? "text-red-700" : "text-inherit"
        }`}
      />
    </button>
  );
};
