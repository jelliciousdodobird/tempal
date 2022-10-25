// import Image from "next/image";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
// import {
//   calculateBaseTypeModifier,
//   TemType,
//   temTypes,
// } from "../../data/temtems";
import { Stats, StatsWithTotal } from "../../pages/tems/index.page";
import { prettyFraction, zeroPad } from "../../utils/utils";

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
  lumaImgIcon,
  bottomTipContainer,
  specieImage,
  specieImageContainer,
  mainContent,
  cardTitle,
  nameTextStyle,
  numberTextStyle,
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
  tabContent,
  itemButton,
  traitContainer,
  traitLabel,
  traitEffect,
  matchupGridContainer,
  elementContainer,
  matchupTypeValue,
  matchupCompContainer,
  matchupGridWrapper,
  matchupGridLabel,
  tvYieldContainer,
} from "./Temcard.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { ToggleButton } from "../ToggleButton/ToggleButton.component";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TemType, TypeMatchups } from "../../utils/types";
import {
  calculateBaseTypeModifier,
  calculateMatchupModifiers,
} from "../../utils/damage-calcs";
import { matchupAlteringTraits, temTypes } from "../../utils/data";

// type TypeMatchups = Record<TemType, number>;

const matchups: TypeMatchups = {
  neutral: 1,
  wind: 1,
  earth: 2,
  water: 1,
  fire: 1,
  nature: 2,
  electric: 1,
  mental: 0.5,
  digital: 1,
  melee: 1,
  crystal: 0.25,
  toxic: 1,
};

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

  maxStat?: number;
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

  maxStat = 125,
}: TemCardProps) => {
  const [showLuma, setShowLuma] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [tabSelected, setTabSelected] = useState("stats");

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
      onMouseEnter: startHover,
      onMouseLeave: endHover,
    }),
    []
  );

  const tabComponent = useMemo(() => {
    let node: ReactNode = <></>;
    switch (tabSelected) {
      case "stats":
        node = (
          <>
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
            <div className={tvYieldContainer}>
              {Object.entries(tvYields)
                .filter(([stat, tv]) => tv > 0)
                .map(([stat, tv]) => (
                  <div key={stat}>
                    {stat}: {tv}
                  </div>
                ))}
            </div>
          </>
        );
        break;
      case "traits":
        node = <Traits traits={traits} />;
        break;
      case "matchups":
        node = <MatchupsView traits={traits} types={types} />;
        break;
    }

    return node;
  }, [tabSelected]);

  return (
    <div
      className={container}
      tabIndex={1}
      {...containerBindings}
      // onClick={() =>
      //   console.log(calculateBaseTypeModifier("electric", types[0], types[1]))
      // }
    >
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
    </div>
  );
};
///////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////
type TraitData = {
  ogName: string;
  name: string;
  wikiUrl: string;
  description: string;
  effect: string;
  strippedEffect: string;
};

const traitNameExceptions = (value: string) => {
  let traitApiName = value;
  switch (value) {
    case "Meditation":
      traitApiName = "Meditation (Trait)";
      break;
    case "Attack<T>":
      traitApiName = "Attack T";
      break;
  }

  return traitApiName;
};

const fetchTraitData = async (traitName: string) => {
  const cleanedTraitName = traitNameExceptions(traitName);

  const res = await axios.get("https://temtem-api.mael.tech/api/traits", {
    params: {
      names: cleanedTraitName,
    },
  });

  const data: TraitData[] = await res.data;

  data.forEach((trait) => {
    const { effect } = trait;
    trait.ogName = traitName;

    // removes the trait name from the description (the name is redundant):
    trait.strippedEffect = effect.slice(traitName.length).trim();

    // capitalize first letter:
    trait.strippedEffect =
      trait.strippedEffect.charAt(0).toUpperCase() +
      trait.strippedEffect.slice(1);
  });

  return data[0];
};

type TraitsProps = {
  traits: [string, string];
  descriptionLimit?: number;
};

const Traits = ({ traits, descriptionLimit = 70 }: TraitsProps) => {
  const {
    isLoading: isLoading1,
    isError: isError1,
    data: trait1,
  } = useQuery(["trait", traits[0]], () => fetchTraitData(traits[0]));

  const {
    isLoading: isLoading2,
    isError: isError2,
    data: trait2,
  } = useQuery(["trait", traits[1]], () => fetchTraitData(traits[1]));

  if (isLoading1 || isLoading2) return <>LOADING</>;
  else if (isError1 || isError2) return <>ERROR</>;

  return (
    <div className={traitContainer}>
      <div className={contentRow.column}>
        <span className={traitLabel}>{trait1.ogName}</span>
        <span className={traitEffect}>{trait1.strippedEffect}</span>
      </div>
      <div className={contentRow.column}>
        <span className={traitLabel}>{trait2.ogName}</span>
        <span className={traitEffect}>{trait2.strippedEffect}</span>
      </div>
    </div>
  );
};
///////////////////////////////////////////////////////////////////////////////////////
type MatchupViewProps = {
  traits: TemCardProps["traits"];
  types: [TemType, TemType | null];
};

const MatchupsView = ({ traits, types }: MatchupViewProps) => {
  const alteringTrait1 = matchupAlteringTraits.get(traits[0]);
  const alteringTrait2 = matchupAlteringTraits.get(traits[1]);

  // if either trait1 or trait2 exists, a trait that alters the matchup exists
  // so we have to show both traits because they'll have different matchups
  const diffMatchups = !!alteringTrait1 || !!alteringTrait2;

  const trait1Matchups = calculateMatchupModifiers(
    traits[0],
    types[0],
    types[1]
  );
  const trait2Matchups = calculateMatchupModifiers(
    traits[1],
    types[0],
    types[1]
  );

  const trait1Name = !!alteringTrait1 ? traits[0] + "*" : traits[0];
  const trait2Name = !!alteringTrait2 ? traits[1] + "*" : traits[1];

  return (
    <div className={matchupCompContainer}>
      {diffMatchups ? (
        <>
          <MatchupGrid matchups={trait1Matchups} traitLabel={trait1Name} />
          <MatchupGrid matchups={trait2Matchups} traitLabel={trait2Name} />
        </>
      ) : (
        <MatchupGrid matchups={trait1Matchups} traitLabel={"Both Traits"} />
      )}
    </div>
  );
};
///////////////////////////////////////////////////////////////////////////////////////
type MatchupGridProps = {
  traitLabel?: string;
  matchups: TypeMatchups;
};

const getValueVariant = (num: number): keyof typeof matchupTypeValue => {
  if (num > 2) return "super_effective";
  else if (num > 1 && num <= 2) return "effective";
  else if (num === 1) return "neutral";
  else if (num < 1 && num >= 0.5) return "resistant";
  else if (num > 0 && num < 0.5) return "super_resistant";
  else if (num === 0) return "immune";
  else return "neutral";
};

const MatchupGrid = ({ traitLabel, matchups }: MatchupGridProps) => {
  return (
    <div className={matchupGridWrapper}>
      {traitLabel && <span className={matchupGridLabel}>{traitLabel}</span>}
      <div className={matchupGridContainer}>
        {Object.entries(matchups)
          .filter(([, value]) => value !== 1)
          .sort((a, b) => b[1] - a[1])
          .map(([key, value]) => (
            <div key={key} className={elementContainer}>
              <Image
                alt={key}
                src={temTypes[key as TemType].imgUrl}
                width={20}
                height={20}
                quality={100}
              />
              <div className={matchupTypeValue[getValueVariant(value)]}>
                {prettyFraction(matchups[key as TemType])}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
