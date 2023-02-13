import clsx from "clsx";
import Link from "next/link";
import { Logo } from "../Logo/Logo.component";
import { NavItem, NavList } from "../NavList/NavList.component";
import { NavMenuButton } from "../NavMenuButton/NavMenuButton";

const links: NavItem[] = [
  { label: "species", href: "/species" },
  { label: "compare", href: "/species/compare" },
  { label: "about", href: "/about" },
];

export const Navbar = () => {
  return (
    <div
      className={clsx(
        "bg-neutral-900/90 backdrop-blur-md",
        "border-b border-white/[7%]"
      )}
    >
      <div className="flex justify-between items-center h-16 pack-content">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="flex gap-0 sm:gap-4 h-min">
          <NavMenuButton />
          <NavList links={links} />
        </nav>
      </div>
    </div>
  );
};
