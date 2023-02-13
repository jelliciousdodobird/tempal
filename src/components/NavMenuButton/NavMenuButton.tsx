"use client";

// import { Switch } from "@headlessui/react";

import * as Toggle from "@radix-ui/react-toggle";
import { IconMenu, IconX } from "@tabler/icons";
import clsx from "clsx";
import { create } from "zustand";

type NavMenuState = {
  isOpen: boolean;
  setNavMenu: (value: boolean) => void;
  toggleNavMenu: () => void;
};

export const useNavMenuStore = create<NavMenuState>()((set) => ({
  isOpen: false,
  setNavMenu: (value) => set({ isOpen: value }),
  toggleNavMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const NavMenuButton = () => {
  const { isOpen, setNavMenu } = useNavMenuStore((state) => state);
  return (
    <Toggle.Root
      pressed={isOpen}
      onPressedChange={setNavMenu}
      className={clsx(
        "rounded-xl w-10 aspect-square grid place-items-center sm:hidden hover:text-primary-500 ring-current",
        "hover:bg-primary-100 hover:text-primary-500 dark:hover:bg-primary-900 dark:hover:text-primary-100"
      )}
    >
      {isOpen ? <IconX /> : <IconMenu />}
    </Toggle.Root>
  );
};
