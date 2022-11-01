import { memo, ReactNode, useMemo, useState } from "react";

import { Stats, StatsWithTotal } from "../../../pages/tems/index.page";
import { zeroPad } from "../../../utils/utils";

import Image from "next/future/image";
import {
  elementTypeLabel,
  container,
  cardBackground,
  backgroundImageContainer,
  backgroundBlur,
  headerContent,
  lumaImgIcon,
  specieImage,
  specieImageContainer,
  mainContent,
  cardTitle,
  nameTextStyle,
  numberTextStyle,
  elementRow,
  contentContainer,
  tabContent,
} from "./Temcard.css";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

import { TemType } from "../../../utils/types";

import { Tabber } from "../Tabber/Tabber.component";
import { TraitView } from "../TraitView/TraitView.component";
import { MatchupsView } from "../MatchupsView/MatchupsView.component";
import { StatsView } from "../StatsView/StatsView.component";

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

const animProps: HTMLMotionProps<"li"> = {
  variants: {
    outofview: {
      opacity: 0,
      transform: "perspective(1000px) rotateX(40deg) translateY(100px)",
    },
    inview: {
      opacity: 1,
      transform: "perspective(1000px) rotateX(0deg) translateY(0px)",
      transition: { duration: 0.2 },
    },
  },
  initial: "outofview",
  whileInView: "inview",
  viewport: { once: true },
};

export const TemCard = memo(
  ({
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

    const type1 = (types[0] ? types[0].toLowerCase() : "neutral") as TemType;
    const type2 = (types[1] ? types[1].toLowerCase() : null) as TemType;

    const index = name.indexOf("(");
    const formattedName = index !== -1 ? name.slice(0, index) : name;

    const formattedNumber = zeroPad(number, 3);

    const staticImg = showLuma ? imgStaticLumaUrl : imgStaticUrl;
    const animatedImg = showLuma ? imgAnimatedLumaUrl : imgAnimatedUrl;
    const mainImgUrl = hovering ? animatedImg : staticImg;

    const toggleLuma = () => setShowLuma((v) => !v);
    const startHover = () => setHovering(true);
    const endHover = () => setHovering(false);

    // const containerBindings = useMemo(
    //   () => ({
    //     onMouseEnter: startHover,
    //     onMouseLeave: endHover,
    //   }),
    //   []
    // );

    const tabComponent = useMemo(() => {
      let node: ReactNode = <></>;
      switch (tabSelected) {
        case "stats":
          node = <StatsView stats={stats} tvYields={tvYields} />;
          break;
        case "traits":
          node = <TraitView traits={traits} />;
          break;
        case "matchups":
          node = <MatchupsView traits={traits} types={types} />;
          break;
      }

      return node;
    }, [tabSelected, stats, tvYields, traits, types]);

    return (
      <motion.li
        {...animProps}
        className={container}
        tabIndex={1}
        // {...containerBindings}
      >
        <>
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
                {type2 && (
                  <span className={elementTypeLabel[type2]}>{type2}</span>
                )}
              </div>
            </div>

            <div className={mainContent}>
              <Tabber
                uid={name}
                tabSelected={tabSelected}
                setTabSelected={setTabSelected}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  className={tabContent}
                  key={tabSelected}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {tabComponent}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </>
      </motion.li>
    );
  },
  (prev, curr) => {
    return prev.name + prev.number === curr.name + curr.number;
  }
);

TemCard.displayName = "TemCard";
