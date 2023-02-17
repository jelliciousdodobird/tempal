"use client";

import {
  IconAdjustmentsHorizontal,
  IconPlus,
  IconSettings,
} from "@tabler/icons-react";
import * as Tabs from "@radix-ui/react-tabs";
import { forwardRef, useEffect } from "react";
import { useHasMounted } from "../../hooks/useHasMounted";
import { CustomTem, useTemTeamsStore } from "../../store/temteam-store";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { fetchTemtem } from "../../utils/fetch";
import Image from "next/image";

type Props = {};

export const MyTeams = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const mounted = useHasMounted();
  const teams = useTemTeamsStore((state) => state.teams);
  const activeId = useTemTeamsStore((state) => state.activeTeamId);
  const setActiveIndex = useTemTeamsStore((state) => state.setActiveTeamId);
  const addTemTeam = useTemTeamsStore((state) => state.addTemTeam);
  const removeTemTeam = useTemTeamsStore((state) => state.removeTemTeam);
  const removeFromTeam = useTemTeamsStore((state) => state.removeFromTeam);

  if (!mounted) return <>loading</>;

  return (
    <Tabs.Root
      ref={ref}
      onValueChange={setActiveIndex}
      value={activeId}
      className="flex flex-col"
    >
      <div className="flex gap-2 min-h-[2.5rem] px-2">
        <button
          type="button"
          onClick={addTemTeam}
          className="grid place-items-center rounded-tl-md rounded-tr-md h-full aspect-square"
        >
          <IconPlus />
        </button>
        <Tabs.List className="flex rounded-tl-md rounded-tr-md">
          {teams.map((team, i) => (
            <Tabs.Trigger
              key={team.id}
              value={team.id}
              className={clsx(
                "rounded-tl-md rounded-tr-md px-3 py-1 outline-none appearance-none data-[state=active]:bg-neutral-800",
                "focus-visible:ring-2 ring-red-500 focus-visible:ring-offset-2 ring-offset-blue-500"
              )}
            >
              {team.id.slice(0, 5)}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>

      {teams.map((team) => (
        <Tabs.Content key={team.id} value={team.id} className="">
          <div className="flex bg-neutral-800 p-2 rounded-md">
            <button
              type="button"
              className="grid place-items-center rounded-tl-md rounded-tr-md h-[2.5rem] aspect-square"
              onClick={() => removeTemTeam(team.id)}
            >
              <IconAdjustmentsHorizontal />
            </button>

            <ul className="flex gap-4 bg-neutral-800 items-center">
              {team.team.map((tem) => (
                <TemItem key={tem.id} customTem={tem} />
              ))}
              {[...Array(8 - team.team.length).keys()].map((i) => (
                <div
                  key={i}
                  className="flex w-[35px] h-[35px] rounded-full overflow-hidden bg-neutral-700/30"
                />
              ))}
            </ul>
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
});

const staleTime = 60 * 60 * 1000;

export const TemItem = ({ customTem }: { customTem: CustomTem }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchTemtem", customTem.name],
    queryFn: () => fetchTemtem({ names: [customTem.name] }),
    staleTime,
  });

  if (isLoading || !(data && data.length > 0))
    return (
      <div className="flex w-[35px] h-[35px] rounded-full overflow-hidden bg-neutral-700/30 animate-pulse"></div>
    );

  const temData = data[0];

  return (
    <button
      type="button"
      className="flex w-[35px] h-[35px] rounded-full overflow-hidden bg-neutral-700/30"
    >
      <Image
        alt={temData.name + " image"}
        // src={temData.wikiRenderStaticUrl}
        src={temData.portraitWikiUrl}
        height={35}
        width={35}
        quality={100}
        className="flex object-contain w-full h-full"
      />
    </button>
  );
};
