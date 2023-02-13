"use client";

import clsx from "clsx";
import { NavLink } from "../NavLink/NavLink.component";
import { useNavMenuStore } from "../NavMenuButton/NavMenuButton";

export type NavItem = {
  label: string;
  href: string;
};

type NavListProps = {
  links: NavItem[];
};

export const NavList = ({ links }: NavListProps) => {
  // const [menuOpen, setMenuOpen] = useAtom(navMenuOpenAtom);
  const { isOpen, setNavMenu } = useNavMenuStore();
  const closeMenu = () => setNavMenu(false);

  return (
    <ul
      className={clsx(
        "flex min-h-min shadow-lg transition-[transform_opacity] origin-top duration-300",
        // styles for mobile:
        "flex-col gap-0 w-full absolute top-full left-0 bg-neutral-900 py-2",
        // styles for desktop:
        "sm:flex-row sm:items-center sm:gap-4 sm:w-auto sm:relative sm:top-auto sm:left-auto sm:bg-transparent sm:dark:bg-transparent sm:py-0 sm:shadow-none",
        // on mobile show list depending on open
        isOpen
          ? "visible scale-y-100 opacity-100"
          : "[visibility:hidden] scale-y-0 opacity-0",
        // on desktop ALWAYS show the list:
        "sm:visible sm:scale-y-100 sm:opacity-100"
      )}
    >
      {links.map((link) => (
        <li key={link.label} onClick={closeMenu}>
          <NavLink href={link.href} label={link.label} />
        </li>
      ))}
    </ul>
  );
};
