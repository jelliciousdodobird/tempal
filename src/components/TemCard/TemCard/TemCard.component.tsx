import { memo, useMemo, useState } from "react";

import { Stats, StatsWithTotal } from "../../../pages/temdex/index.page";
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
  loadingContainer,
} from "./Temcard.css";

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
    const [imgLoading, setImgLoading] = useState(false);
    const [showLuma, setShowLuma] = useState(false);
    const [animate, setAnimate] = useState(false);

    const type1 = (types[0] ? types[0].toLowerCase() : "neutral") as TemType;
    const type2 = (types[1] ? types[1].toLowerCase() : null) as TemType;

    const index = name.indexOf("(");
    const formattedName = index !== -1 ? name.slice(0, index) : name;
    const formattedNumber = zeroPad(number, 3);

    const staticImg = showLuma ? imgStaticLumaUrl : imgStaticUrl;
    const animatedImg = showLuma ? imgAnimatedLumaUrl : imgAnimatedUrl;
    const displayImg = animate ? animatedImg : staticImg;

    const toggleLuma = () => {
      setImgLoading(true);
      if (imgLoading) return;
      setShowLuma((v) => !v);
    };

    const toggleAnimate = () => {
      setImgLoading(true);
      if (imgLoading) return;
      setAnimate((v) => !v);
    };

    const stopLoading = () => setImgLoading(false);

    const tabComponent: CardTabComponents = useMemo(
      () => ({
        stats: <StatsView stats={stats} tvYields={tvYields} />,
        traits: <TraitView traits={traits} />,
        matchups: <MatchupsView traits={traits} types={types} />,
      }),
      [stats, tvYields, traits, types]
    );

    return (
      <li className={container} id={id} tabIndex={1}>
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
              <Image
                className={specieImage}
                alt={formattedName}
                src={displayImg}
                width={128}
                height={128}
                quality={100}
                onLoadingComplete={stopLoading}
              />
              {imgLoading && <div className={loadingContainer}></div>}
              <div className={buttonContainer}>
                <button
                  disabled={imgLoading}
                  className={toggleImgButton}
                  type="button"
                  onClick={toggleLuma}
                >
                  {showLuma ? (
                    <IconStarOff width={14} pointerEvents="none" />
                  ) : (
                    <IconStar width={14} pointerEvents="none" />
                  )}
                </button>
                <button
                  disabled={imgLoading}
                  className={toggleImgButton}
                  type="button"
                  onClick={toggleAnimate}
                >
                  {animate ? (
                    <IconPlayerPause width={14} pointerEvents="none" />
                  ) : (
                    <IconPlayerPlay width={14} pointerEvents="none" />
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
          </div>

          {/* <div className={buttonContainer}>
            <button
              disabled={imgLoading}
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
              disabled={imgLoading}
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
          </div> */}

          <TabContent id={id} tabComponent={tabComponent} />
        </div>
      </li>
    );
  },
  (prev, curr) => {
    return prev.name + prev.number === curr.name + curr.number;
  }
);

TemCard.displayName = "TemCard";

interface TabContentProps {
  tabComponent: CardTabComponents;
  id: string;
}
const TabContent = ({ id, tabComponent }: TabContentProps) => {
  const [tabSelected, setTabSelected] = useState<CardTab>("stats");

  return (
    <div className={mainContent}>
      <Tabber
        uid={id}
        tabSelected={tabSelected}
        setTabSelected={setTabSelected}
      />

      <div className={tabContent} key={tabSelected}>
        {tabComponent[tabSelected]}
      </div>

      {/* <AnimatePresence mode="wait">
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
      </AnimatePresence> */}
    </div>
  );
};
