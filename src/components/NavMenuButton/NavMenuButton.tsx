"use client";

import clsx from "clsx";
import { Menu } from "@headlessui/react";
import { IconMenu, IconX } from "@tabler/icons-react";

export const NavMenuButton = () => {
  return (
    <Menu.Button
      className={clsx(
        "rounded-xl w-10 aspect-square grid place-items-center sm:hidden hover:text-primary-500 ring-current",
        "hover:bg-primary-900/50 hover:text-primary-100"
      )}
    >
      {({ open }) => (open ? <IconX /> : <IconMenu />)}
    </Menu.Button>
  );
};
