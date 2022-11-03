import { memo, useMemo, useState } from "react";

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
  buttonContainer,
  toggleImgButton,
} from "./Temcard.css";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

import { TemType } from "../../../utils/types";

import { Tabber } from "../Tabber/Tabber.component";
import { TraitView } from "../TraitView/TraitView.component";
import { MatchupsView } from "../MatchupsView/MatchupsView.component";
import { StatsView } from "../StatsView/StatsView.component";
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconStar,
  IconStarOff,
} from "@tabler/icons";

export interface TemCardProps {
  id: string;

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

export type CardTab = "stats" | "traits" | "matchups";
export type CardTabComponents = Record<CardTab, JSX.Element>;

const animProps: HTMLMotionProps<"li"> = {
  variants: {
    outofview: {
      opacity: 0,
      x: 100,
      // perspective and transformPerspective breaks safari mobile for some reason..
      // transform: "perspective(1000px) rotateX(40deg) translateY(100px)",
    },
    inview: {
      opacity: 1,
      x: 0,
      // perspective and transformPerspective breaks safari mobile for some reason..
      // transform: "perspective(1000px) rotateX(0deg) translateY(0px)",
      transition: { duration: 0.25 },
    },
  },
  initial: "outofview",
  whileInView: "inview",
  viewport: { once: true },
};

export const TemCard = memo(
  ({
    id,
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
    const [animate, setAnimate] = useState(false);
    const [tabSelected, setTabSelected] = useState<CardTab>("stats");

    const type1 = (types[0] ? types[0].toLowerCase() : "neutral") as TemType;
    const type2 = (types[1] ? types[1].toLowerCase() : null) as TemType;

    const index = name.indexOf("(");
    const formattedName = index !== -1 ? name.slice(0, index) : name;

    const formattedNumber = zeroPad(number, 3);

    const staticImg = showLuma ? imgStaticLumaUrl : imgStaticUrl;
    const animatedImg = showLuma ? imgAnimatedLumaUrl : imgAnimatedUrl;
    const mainImgUrl = animate ? animatedImg : staticImg;

    const toggleLuma = () => setShowLuma((v) => !v);
    const toggleAnimate = () => setAnimate((v) => !v);

    const tabComponent: CardTabComponents = useMemo(
      () => ({
        stats: <StatsView stats={stats} tvYields={tvYields} />,
        traits: <TraitView traits={traits} />,
        matchups: <MatchupsView traits={traits} types={types} />,
      }),
      [stats, tvYields, traits, types]
    );

    const imgStatic = useMemo(
      () => <MainImage url={imgStaticUrl} alt={formattedName} />,
      []
    );

    const imgStaticLuma = useMemo(
      () => <MainImage url={imgStaticLumaUrl} alt={formattedName} />,
      []
    );
    const imgAnimate = useMemo(
      () => <MainImage url={imgAnimatedUrl} alt={formattedName} />,
      []
    );

    const imgAnimateLuma = useMemo(
      () => <MainImage url={imgAnimatedLumaUrl} alt={formattedName} />,
      []
    );

    return (
      <motion.li className={container} tabIndex={1} {...animProps} id={id}>
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
              </div>

              <div className={specieImageContainer}>
                {/* <Image
                  className={specieImage}
                  alt={formattedName}
                  src={mainImgUrl}
                  width={128}
                  height={128}
                  quality={100}
                /> */}
                {!animate && !showLuma && imgStatic}
                {!animate && showLuma && imgStaticLuma}
                {animate && !showLuma && imgAnimate}
                {animate && showLuma && imgAnimateLuma}
                <div className={buttonContainer}>
                  <button
                    className={toggleImgButton}
                    type="button"
                    onClick={toggleLuma}
                  >
                    {showLuma ? (
                      <IconStarOff width={16} pointerEvents="none" />
                    ) : (
                      <IconStar width={16} pointerEvents="none" />
                    )}
                  </button>
                  <button
                    className={toggleImgButton}
                    type="button"
                    onClick={toggleAnimate}
                  >
                    {animate ? (
                      <IconPlayerPause width={16} pointerEvents="none" />
                    ) : (
                      <IconPlayerPlay width={16} pointerEvents="none" />
                    )}
                  </button>
                </div>
              </div>

              <div className={elementRow}>
                <span className={elementTypeLabel[type1]}>{type1}</span>
                {type2 && (
                  <span className={elementTypeLabel[type2]}>{type2}</span>
                )}
              </div>
              <div className={elementRow}></div>
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
                  {tabComponent[tabSelected]}
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

interface MainImageProps {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
}

const MainImage = ({
  url,
  alt,
  width = 128,
  height = 128,
  quality = 100,
}: MainImageProps) => {
  return (
    <Image
      className={specieImage}
      alt={alt}
      src={url}
      width={width}
      height={height}
      quality={quality}
      priority={true}
    />
  );
};
