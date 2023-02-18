import clsx from "clsx";
import Link from "next/link";
import { Logo } from "../Logo/Logo.component";
import { NavItem } from "../NavList/NavList.component";
import { NavMenu } from "../NavMenu/NavMenu.component";

const links: NavItem[] = [
  { label: "species", href: "/species" },
  { label: "compare", href: "/species/compare" },
  { label: "about", href: "/about" },
];

export const Navbar = () => {
  return (
    <div
      className={clsx(
        "h-16 bg-neutral-900/90 backdrop-blur-md",
        "border-b border-white/[7%]"
      )}
    >
      <div className="flex justify-between items-center pack-content h-full">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="flex gap-0 sm:gap-4 h-min">
          <NavMenu links={links} />
        </nav>
      </div>
    </div>
  );
};
