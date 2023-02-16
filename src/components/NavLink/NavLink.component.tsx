"use client";

import clsx from "clsx";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { getMinimalQuery, getQuery } from "../SpecieList/SpecieList.utils";

type NavLinkProps = {
  href: string;
  label: string;
};

export const NavLink = ({ href, label }: NavLinkProps) => {
  const pathname = usePathname();
  const params = useSearchParams();

  const selected = pathname === href;
  const searchQuery = getQuery(params);
  const minimalQuery = getMinimalQuery(searchQuery);

  return (
    <Menu.Item>
      {({ active, close }) => (
        <Link
          href={{
            pathname: href,
            query: href.includes("/species") ? minimalQuery : "",
          }}
          className={clsx(
            "relative capitalize font-medium text-neutral-400",
            // styles for mobile:
            "pl-4 pr-8 h-12 flex items-center justify-center",
            active ? "bg-primary-900/50 text-primary-100" : "bg-transparent",
            // styles for desktop:
            "sm:pl-0 sm:pr-0 sm:h-auto sm:hover:bg-transparent sm:hover:text-primary-500"
          )}
          onClick={close}
        >
          {label}
          {selected && (
            <motion.span
              layoutId="nav-link"
              className="absolute -bottom-1 w-full h-[2px] bg-neutral-400 hidden sm:block"
            />
          )}
        </Link>
      )}
    </Menu.Item>
  );
};
