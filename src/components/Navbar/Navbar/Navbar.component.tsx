import { useEffect, useState } from "react";
import { Logo } from "../../Logo/Logo.component";
import { NavbarItem } from "../NavbarItem/NavbarItem.component";
import { container, item, list, stretchedItem } from "./Navbar.css";

export const links = [
  // { name: "Home", link: "/", order: 0, color: "#428ae8", icon: MdMap },
  { name: "Temdex", link: "/temdex", order: 0, color: "#19b28e" },
  // {
  //   name: "Theme",
  //   link: "/theme",
  //   order: 1,
  //   color: "#fee257",
  //   // icon: RiAuctionFill,
  // },
  {
    name: "Contact",
    link: "/contact",
    order: 2,
    color: "#f99155",
    // icon: MdShoppingBasket,
  },
];

export const Navbar = () => {
  return (
    <nav className={container}>
      <ul className={list}>
        <li className={stretchedItem}>
          <Logo />
        </li>
        {links.map((link) => (
          <li className={item} key={link.name}>
            <NavbarItem
              key={link.name}
              name={link.name}
              // color={link.color}
              // icon={link.icon}
              link={link.link}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
