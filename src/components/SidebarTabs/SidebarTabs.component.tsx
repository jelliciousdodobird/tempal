"use client";

import * as Tabs from "@radix-ui/react-tabs";
import {
  Icon,
  IconHeartFilled,
  IconList,
  IconSearch,
} from "@tabler/icons-react";
import clsx from "clsx";
import { ReactNode } from "react";
import { MinTemtem } from "../../app/species/layout";
import { Favorites } from "../Favorites/Favorites.component";
import { SpecieList } from "../SpecieList/SpecieList.component";
import { MyTeams } from "../MyTeams/MyTeams.component";

const sidebarItems: SidebarItemProps[] = [
  { id: "search", label: "search", icon: <IconSearch /> },
  { id: "fav", label: "favorites", icon: <IconHeartFilled /> },
  { id: "teams", label: "teams", icon: <IconList /> },
];

export const SidebarTabs = ({ species }: { species: MinTemtem[] }) => {
  return (
    <Tabs.Root
      defaultValue="search"
      className="flex flex-col h-full border-r border-neutral-800"
    >
      <Tabs.List className="flex">
        {sidebarItems.map((props) => (
          <SidebarTrigger key={props.id} {...props} />
        ))}
      </Tabs.List>

      <Tabs.Content asChild value="search">
        <SpecieList species={species} />
      </Tabs.Content>
      <Tabs.Content asChild value="fav">
        <Favorites />
      </Tabs.Content>
      <Tabs.Content asChild value="teams">
        <MyTeams />
      </Tabs.Content>
    </Tabs.Root>
  );
};

type SidebarItemProps = {
  id: string;
  label: string;
  icon: ReactNode;
};

export const SidebarTrigger = ({ id, label, icon }: SidebarItemProps) => {
  return (
    <Tabs.Trigger
      value={id}
      className={clsx(
        "outline-none appearance-none",
        "grid place-items-center",
        "h-12 flex-1 data-[state=active]:bg-neutral-800",
        "focus-visible:ring-2 ring-red-500 focus-visible:ring-offset-2 ring-offset-blue-500"
      )}
    >
      {icon}
    </Tabs.Trigger>
  );
};
