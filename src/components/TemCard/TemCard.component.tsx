// import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { TemType } from "../../data/temtems";
import { Stats, StatsWithTotal } from "../../pages/tems/index.page";
import { zeroPad } from "../../utils/utils";

import CornerTipSvg from "../../../public/assets/shape.svg";
import TemCardBottomTip from "../../../public/assets/bottom-tip.svg";

import Image from "next/future/image";
import {
  elementTypeLabel,
  container,
  cardBackground,
  backgroundImageContainer,
  backgroundBlur,
  headerContent,
  topLeftTipContainer,
  topLeftTipSvg,
  topRightTipContainer,
  topRightTipSvg,
  specieImage,
  specieImageContainer,
  mainContent,
  cardTitle,
  nameTextStyle,
  numberTextStyle,
  lumaImgIcon,
  bottomTipContainer,
  contentRow,
  statsContainer,
  statLineContainer,
  maxStatLine,
  statLabel,
  statValue,
  statLine,
  elementRow,
  listContainer,
  contentContainer,
  listItem,
  tab,
  baseItemButton,
  tabContent,
  itemButton,
} from "./Temcard.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { content } from "../Footer/Footer.css";
import { ToggleButton } from "../ToggleButton/ToggleButton.component";
import { motion } from "framer-motion";

export interface TemCardProps {
  name: string;
  number: number;
  types: [TemType, TemType | null];
  traits: [string, string];
  stats: StatsWithTotal;
  tvYields: Stats;

  imgStaticUrl: string;
  imgAnimatedUrl: string;
  imgStaticLumaUrl: string;
  imgAnimatedLumaUrl: string;
}

export const TemCard = ({
  number,
  name,
  types,
  stats,
  traits,
  tvYields,

  imgStaticUrl,
  imgAnimatedUrl,
  imgStaticLumaUrl,
  imgAnimatedLumaUrl,
}: TemCardProps) => {
  const [showLuma, setShowLuma] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [tabSelected, setTabSelected] = useState("stats");

  const maxStat = 125;
  const type1 = (types[0] ? types[0].toLowerCase() : "neutral") as TemType;
  const type2 = (types[1] ? types[1].toLowerCase() : null) as TemType;

  const trait1 = traits[0];
  const trait2 = traits[1];

  const index = name.indexOf("(");
  const formattedName = index !== -1 ? name.slice(0, index) : name;

  const formattedNumber = zeroPad(number, 3);

  const staticImg = showLuma ? imgStaticLumaUrl : imgStaticUrl;
  const animatedImg = showLuma ? imgAnimatedLumaUrl : imgAnimatedUrl;
  const mainImgUrl = hovering ? animatedImg : staticImg;

  const toggleLuma = () => setShowLuma((v) => !v);
  const startHover = () => setHovering(true);
  const endHover = () => setHovering(false);

  const containerBindings = useMemo(
    () => ({
      onPointerOver: startHover,
      onPointerLeave: endHover,
    }),
    []
  );

  return (
    <div className={container} tabIndex={1} {...containerBindings}>
      <div className={cardBackground}>
        <div className={backgroundImageContainer}>
          <Image
            className={backgroundBlur}
            alt=""
            src={staticImg}
            width={128}
            height={128}
            quality={100}
          />
        </div>
      </div>

      <div className={contentContainer}>
        <div className={headerContent}>
          <div className={cardTitle}>
            <span className={numberTextStyle}>#{formattedNumber}</span>
            <span className={nameTextStyle}>{formattedName}</span>
            {/* <Image
            className={lumaImgIcon}
            onClick={toggleLuma}
            alt="luma"
            src="https://temtem.wiki.gg/images/4/42/Luma_icon.png"
            width={16}
            height={16}
          /> */}
          </div>

          <div className={specieImageContainer}>
            <Image
              className={specieImage}
              alt={formattedName}
              src={mainImgUrl}
              width={128}
              height={128}
              quality={100}
            />
          </div>

          <div className={elementRow}>
            <span className={elementTypeLabel[type1]}>{type1}</span>
            {type2 && <span className={elementTypeLabel[type2]}>{type2}</span>}
          </div>

          {/* <ToggleButton /> */}
        </div>

        <div className={mainContent}>
          <Tabs
            uid={name}
            tabSelected={tabSelected}
            setTabSelected={setTabSelected}
          />

          <div className={tabContent}>
            <div className={statsContainer}>
              {Object.entries(stats).map(([stat, value]) => (
                <div className={statLineContainer} key={stat}>
                  <span className={statLabel}>{stat}</span>
                  <span className={statValue}>{value}</span>
                  <div className={maxStatLine}>
                    {stat !== "total" && (
                      <span
                        className={statLine}
                        style={assignInlineVars({
                          width: `${Math.min(100, (value / maxStat) * 100)}%`,
                        })}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type TabsProps = {
  uid: string;
  tabSelected: string;
  setTabSelected: Dispatch<SetStateAction<string>>;
};

const Tabs = ({ uid, tabSelected, setTabSelected }: TabsProps) => {
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
