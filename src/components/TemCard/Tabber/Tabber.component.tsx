import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
// import { listContainer, listItem, tab, itemButton } from "./Tabber.css";
import { CardTab } from "../TemCard/TemCard.component";

interface TabsProps {
  uid: string;
  tabSelected: CardTab;
  setTabSelected: Dispatch<SetStateAction<CardTab>>;
}

export const Tabber = ({ uid, tabSelected, setTabSelected }: TabsProps) => {
  const tab_uid = useMemo(() => `${uid}-tab`, [uid]);

  const statsSelected = tabSelected === "stats";
  const traitsSelected = tabSelected === "traits";
  const matchupsSelected = tabSelected === "matchups";

  const TabLine = useMemo(
    () => (
      // // animated version
      // <motion.span
      //   layoutId={tab_uid}
      //   className={"tab"}
      //   transition={{ duration: 0.2 }}
      // />
      // static version:
      <span id={tab_uid} className={"tab"} />
    ),
    [tab_uid]
  );

  return (
    <ul className={"listContainer"}>
      <li className={"listItem"}>
        <button
          className={"itemButton[statsSelected ? selected : default]"}
          type="button"
          onClick={() => setTabSelected("stats")}
        >
          Stats
        </button>
        {statsSelected && TabLine}
      </li>
      <li className={"listItem"}>
        <button
          className={"itemButton[traitsSelected ? selected : default]"}
          type="button"
          onClick={() => setTabSelected("traits")}
        >
          Traits
        </button>
        {traitsSelected && TabLine}
      </li>
      <li className={"listItem"}>
        <button
          className={`itemButton[matchupsSelected ? "selected" : "default"]`}
          type="button"
          onClick={() => setTabSelected("matchups")}
        >
          Matchups
        </button>
        {matchupsSelected && TabLine}
      </li>
    </ul>
  );
};
