"use client";
import clsx from "clsx";
import { IconTrash } from "@tabler/icons-react";
import { forwardRef, useEffect } from "react";
import { useHasMounted } from "../../hooks/useHasMounted";
import { TemTeam, useTemTeamsStore } from "../../store/temteam-store";

import { SelectActiveTeamMenu } from "../SelectActiveTeamMenu/SelectActiveTeamMenu.component";

type Props = {};

export const MyTeams = forwardRef<HTMLDivElement, Props>(function MyTeams(
  props,
  ref
) {
  const mounted = useHasMounted();

  const {
    teams,
    activeTeamId,
    setActiveTeamId,
    addTemTeam,
    removeTemTeam,
    removeFromTeam,
  } = useTemTeamsStore();

  if (!mounted) return <>loading</>;

  const activeTeam = teams.find((team) => team.id === activeTeamId);
  const changeActiveTeam = (team: TemTeam) => setActiveTeamId(team.id);

  return (
    <div ref={ref} className="flex flex-col">
      <SelectActiveTeamMenu
        value={activeTeam}
        options={teams}
        onChange={changeActiveTeam}
        addToOptions={addTemTeam}
      />

      {activeTeam && (
        <div className="flex flex-col">
          {activeTeam.team.map((tem) => (
            <div key={tem.id}>{tem.id}</div>
          ))}
          <button
            onClick={() => removeTemTeam(activeTeam.id)}
            type="button"
            className={clsx(
              "px-3 py-1 outline-none appearance-none data-[state=active]:bg-neutral-800",
              "focus-visible:ring-2 ring-red-500 focus-visible:ring-offset-2 ring-offset-blue-500"
            )}
          >
            <IconTrash />
          </button>
        </div>
      )}
    </div>
  );
});
