"use client";
import clsx from "clsx";
import { IconTrash } from "@tabler/icons-react";
import { forwardRef } from "react";
import { useHasMounted } from "../../hooks/useHasMounted";
import { TemTeam, useTemTeamsStore } from "../../store/temteam-store";
import { SelectActiveTeamMenu } from "../SelectActiveTeamMenu/SelectActiveTeamMenu.component";
import { CustomizeTemtem } from "../CustomizeTemtem/CustomizeTemtem.component";
import { useUrlQuery } from "../SpecieList/useUrlQuery";

type Props = {};

const getItemLink = (
  teamId: string,
  customTemId: string,
  searchParams: string
) => `/team/${teamId}/${customTemId}` + searchParams;

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
  const { minimalQueryUrl } = useUrlQuery();

  if (!mounted) return <></>;

  const activeTeam = teams.find((team) => team.id === activeTeamId);
  const changeActiveTeam = (team: TemTeam) => setActiveTeamId(team.id);

  return (
    <div ref={ref} className="flex flex-col gap-4 h-full overflow-hidden pb-4">
      <SelectActiveTeamMenu
        value={activeTeam}
        options={teams}
        onChange={changeActiveTeam}
        addToOptions={addTemTeam}
      />
      <div className="overflow-y-auto custom-scrollbar-tiny no-scrollbar rounded-xl">
        {activeTeam && (
          <div className="flex flex-col gap-4">
            {activeTeam.team.map((tem) => (
              <CustomizeTemtem
                key={tem.id}
                customTem={tem}
                link={getItemLink(activeTeam.id, tem.id, minimalQueryUrl)}
              />
            ))}
            <button
              onClick={() => removeTemTeam(activeTeam.id)}
              type="button"
              className={clsx(
                "flex justify-center items-center gap-1 px-3 py-1 mb-8 rounded-xl data-[state=active]:bg-neutral-800 h-12 bg-red-900/50 text-red-500",
                "outline-none appearance-none focus-visible:ring-2 ring-red-500 ring-inset"
              )}
            >
              <IconTrash /> Delete this team
            </button>
          </div>
        )}
      </div>
    </div>
  );
});
