import { Dispatch, SetStateAction } from "react";
import { listContainer, listItem, tab, itemButton } from "./Tabber.css";
import { motion } from "framer-motion";
import { CardTab } from "../TemCard/TemCard.component";

interface TabsProps {
  uid: string;
  tabSelected: CardTab;
  setTabSelected: Dispatch<SetStateAction<CardTab>>;
}

export const Tabber = ({ uid, tabSelected, setTabSelected }: TabsProps) => {
  const tab_uid = `${uid}-tab`;

  const statsSelected = tabSelected === "stats";
  const traitsSelected = tabSelected === "traits";
  const matchupsSelected = tabSelected === "matchups";

  return (
    <ul className={listContainer}>
      <li className={listItem}>
        <button
          className={itemButton[statsSelected ? "selected" : "default"]}
          type="button"
          onClick={() => setTabSelected("stats")}
        >
          Stats
        </button>
        {statsSelected && <motion.span layoutId={tab_uid} className={tab} />}
      </li>
      <li className={listItem}>
        <button
          className={itemButton[traitsSelected ? "selected" : "default"]}
          type="button"
          onClick={() => setTabSelected("traits")}
        >
          Traits
        </button>
        {traitsSelected && <motion.span layoutId={tab_uid} className={tab} />}
      </li>
      <li className={listItem}>
        <button
          className={itemButton[matchupsSelected ? "selected" : "default"]}
          type="button"
          onClick={() => setTabSelected("matchups")}
        >
          Matchups
        </button>
        {matchupsSelected && <motion.span layoutId={tab_uid} className={tab} />}
      </li>
    </ul>
  );
};
