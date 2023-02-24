"use client";

import { Menu } from "@headlessui/react";
import { NavItem, NavList } from "../NavList/NavList.component";
import { NavMenuButton } from "../NavMenuButton/NavMenuButton";

export const NavMenu = ({ links }: { links: NavItem[] }) => {
  return (
    <Menu>
      <NavMenuButton />
      <NavList links={links} />
    </Menu>
  );
};
