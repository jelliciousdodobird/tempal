"use client";

import * as Tabs from "@radix-ui/react-tabs";
import clsx from "clsx";
import { ReactNode } from "react";
import { MinTemtem } from "../../app/(explore)/layout";
import { Favorites } from "../Favorites/Favorites.component";
import { SpecieList } from "../SpecieList/SpecieList.component";
import { MyTeams } from "../MyTeams/MyTeams.component";
import {
  IconCards,
  IconHeartFilled,
  IconListSearch,
} from "@tabler/icons-react";

const sidebarItems: SidebarItemProps[] = [
  { id: "search", label: "search", icon: <IconListSearch /> },
  { id: "teams", label: "teams", icon: <IconCards /> },
  { id: "fav", label: "favorites", icon: <IconHeartFilled /> },
];

export const SidebarTabs = ({ species }: { species: MinTemtem[] }) => {
  return (
    <Tabs.Root
      defaultValue="search"
      className="flex flex-col gap-4 h-full pt-2"
    >
      <Tabs.List className="flex gap-1 p-1 bg-neutral-800/30 rounded-xl">
        {sidebarItems.map((props) => (
          <SidebarTrigger key={props.id} {...props} />
        ))}
      </Tabs.List>

      <Tabs.Content asChild value="search">
        <SpecieList species={species} />
      </Tabs.Content>
      <Tabs.Content asChild value="teams">
        <MyTeams />
      </Tabs.Content>
      <Tabs.Content asChild value="fav">
        <Favorites />
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
        "grid place-items-center h-12 flex-1 rounded-xl",
        "ring-primary-500 ring-offset-neutral-900",
        "hover:bg-neutral-800/50",
        "focus-visible:ring-2 focus-visible:ring-offset-2 data-[state=active]:bg-neutral-800"
      )}
    >
      {icon}
    </Tabs.Trigger>
  );
};
