"use client";

import { useHasMounted } from "../../hooks/useHasMounted";
import { useTemTeamsStore } from "../../store/temteam-store";

type AddTemProps = {
  temName: string;
};

export const AddTemToTeamButton = ({ temName }: AddTemProps) => {
  const mounted = useHasMounted();
  const add = useTemTeamsStore((state) => state.addToTeam);

  const addTem = () => {
    add(temName);
  };

  if (!mounted) return <>skeleton</>;

  return (
    <button
      type="button"
      className="rounded-full h-12 w-12 bg-green-900/50 text-green-100"
      onClick={addTem}
    >
      ADD {temName}
    </button>
  );
};
