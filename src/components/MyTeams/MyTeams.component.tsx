"use client";

import clsx from "clsx";
import Image from "next/image";
import * as Tabs from "@radix-ui/react-tabs";
import {
  IconAdjustmentsHorizontal,
  IconPlus,
  IconSelector,
  IconTrash,
} from "@tabler/icons-react";
import { forwardRef, useEffect } from "react";
import { useHasMounted } from "../../hooks/useHasMounted";
import { CustomTem, useTemTeamsStore } from "../../store/temteam-store";
import { useQuery } from "@tanstack/react-query";
import { fetchTemtem } from "../../utils/fetch";
import { Menu } from "@headlessui/react";

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

  return (
    <div ref={ref} className="flex flex-col p-1">
      <Menu as="div" className="flex flex-col gap-1">
        <Menu.Button className="flex justify-between items-center rounded-md pl-3 pr-1 bg-neutral-800 min-h-[2.5rem]">
          {activeTeam ? activeTeam.teamName : "you have no teams"}
          <IconSelector />
        </Menu.Button>
        <div className="relative">
          <Menu.Items
            as="ul"
            className={clsx(
              "flex flex-col rounded-md bg-neutral-800/50 backdrop-blur-md",
              "absolute z-10 w-full max-h-[15rem]",
              "overflow-y-auto overflow-x-hidden custom-scrollbar-tiny",
              "bg-neutral-800",
              "outline-none appearance-none"
            )}
          >
            {teams.map((team, i) => (
              <li
                key={team.id}
                className={clsx("flex justify-between w-full flex-1")}
              >
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setActiveTeamId(team.id)}
                      type="button"
                      className={clsx(
                        "flex flex-col gap-2 px-3 py-2 w-full outline-none appearance-none",
                        "focus-visible:ring-2 ring-red-500 focus-visible:ring-offset-2 ring-offset-blue-500",
                        active ? "bg-neutral-500/50" : "bg-transparent"
                      )}
                    >
                      <span className="text-sm">{team.teamName}</span>
                      <span className="flex gap-2">
                        {team.team.map((tem) => (
                          <TemItem key={tem.id} customTem={tem} />
                        ))}
                      </span>
                    </button>
                  )}
                </Menu.Item>
              </li>
            ))}
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={clsx(
                    "flex justify-center items-center gap-2 min-h-[2.5rem] text-emerald-900zz font-bold",
                    active ? "bg-emerald-400/70" : "bg-emerald-500"
                  )}
                  onClick={() => addTemTeam()}
                >
                  <IconPlus />
                  <span>start new team</span>
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </div>
      </Menu>

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

const staleTime = 60 * 60 * 1000;

export const TemItem = ({ customTem }: { customTem: CustomTem }) => {
  const enableQuery = customTem.name !== "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchTemtem", customTem.name],
    queryFn: () => fetchTemtem({ names: [customTem.name] }),
    staleTime,
    enabled: enableQuery,
  });

  if (isLoading || !(data && data.length > 0) || !enableQuery)
    return (
      <div className="flex w-[24px] h-[24px] rounded-full overflow-hidden bg-neutral-700/50"></div>
    );

  const temData = data[0];

  return (
    <figure className="flex w-[24px] h-[24px] rounded-full overflow-hidden bg-neutral-700/30">
      <Image
        alt={temData.name + " image"}
        // src={temData.wikiRenderStaticUrl}
        src={temData.portraitWikiUrl}
        height={24}
        width={24}
        quality={100}
        className="flex object-contain w-full h-full"
      />
    </figure>
  );
};
