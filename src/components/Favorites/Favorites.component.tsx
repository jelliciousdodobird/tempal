"use client";
import { forwardRef } from "react";
import { useHasMounted } from "../../hooks/useHasMounted";

type FavoritesProps = {};
export const Favorites = forwardRef<HTMLDivElement, FavoritesProps>(
  ({ ...props }, ref) => {
    const mounted = useHasMounted();

    if (!mounted) return <>skeleton</>;

    return <div>Favorites</div>;
  }
);
