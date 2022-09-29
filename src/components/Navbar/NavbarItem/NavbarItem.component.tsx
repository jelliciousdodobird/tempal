import React, { useState } from "react";
import Link from "next/link";

// types:
import { TablerIcon } from "@tabler/icons";
import { linkStyle, text } from "./NavbarItem.css";

type Props = {
  color?: string;
  name: string;
  icon?: TablerIcon;
  link: string;
};

export const NavbarItem = ({ name, color = "#ffffff", icon, link }: Props) => {
  const [hover, setHover] = useState(false);

  return (
    <Link href={`${link}`} passHref>
      <a
        className={linkStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onBlur={() => setHover(false)}
      >
        <span className={text}>{name}</span>
      </a>
    </Link>
  );
};
