"use client";

import * as Tabs from "@radix-ui/react-tabs";
import clsx from "clsx";
import { ReactNode } from "react";
import { MinTemtem } from "../../app/(explore)/layout";
import Favorites from "../Favorites/Favorites.component";
import { SpecieList } from "../SpecieList/SpecieList.component";
import { MyTeams } from "../MyTeams/MyTeams.component";
import {
  IconCards,
  IconHeartFilled,
  IconLayoutDashboard,
  IconListSearch,
} from "@tabler/icons-react";
import { SidebarContentType, useSidebarState } from "../../store/sidebar-store";
import { useMediaQuery } from "react-responsive";
import { useSidebarUpdate } from "../../hooks/useSidebarUpdate";
const sidebarItems: SidebarItemProps[] = [
  { id: "search", label: "search", icon: <IconListSearch /> },
  { id: "teams", label: "teams", icon: <IconCards /> },
  { id: "fav", label: "favorites", icon: <IconHeartFilled /> },
  { id: "page", label: "page", icon: <IconLayoutDashboard /> },
];

export const SidebarTabs = ({ species }: { species: MinTemtem[] }) => {
  const { contentIsOpen, contentType, setContentIsOpen, setContentType } =
    useSidebarState();

  // const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <Tabs.Root
      value={contentType}
      onValueChange={setContentType as (value: string) => void}
      defaultValue="search"
      className="flex flex-col gap-4 h-full pt-2 bg-neutral-900"
    >
      <Tabs.List className="flex gap-1 p-1 bg-neutral-800/30 rounded-xl backdrop-blur-md">
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
  id: SidebarContentType;
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
        "focus-visible:ring-2 focus-visible:ring-offset-2 data-[state=active]:bg-neutral-800",
        id === "page" && "md:hidden"
      )}
    >
      {icon}
    </Tabs.Trigger>
  );
};
