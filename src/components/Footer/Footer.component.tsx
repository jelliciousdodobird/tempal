import { container, content, list, item } from "./Footer.css";
import { ReactNode } from "react";

const Item = ({ children }: { children: ReactNode }) => (
  <li className={item}>{children}</li>
);

export const Footer = () => {
  return (
    <div className={container}>
      <div className={content}>
        <ul className={list}>
          <Item>Contact</Item>
          <Item>Discord</Item>

          <Item>Changelog</Item>
          <Item>Github</Item>

          <Item>Privacy</Item>
          <Item>Terms </Item>
        </ul>
      </div>
    </div>
  );
};
