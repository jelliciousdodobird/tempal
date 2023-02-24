import { prettyFraction } from "../../../utils/utils";
import Image from "next/image";
// import {
//   matchupContainer,
//   matchupListWrapper,
//   matchupList,
//   matchupItem,
//   matchupLabel,
//   matchupTypeValue,
//   asteriskLabel,
//   questionButton,
//   modalContainer,
//   tooltip,
//   pg,
//   elementBox,
// } from "./MatchupsView.css";

import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

// import { TemType, TypeMatchups } from "../../../utils/types";
import { calculateMatchupModifiers } from "../../../utils/damage-calcs";
// import { matchupAlteringTraits, temTypes } from "../../../utils/data";
import { matchupAlteringTraits } from "../../../utils/data";
import { usePopup } from "../../../hooks/usePopup";

import { TemCardProps } from "../TemCard/TemCard.component";
// import { bold, italic } from "../../../styles/utility-styles.css";
import { IconX } from "@tabler/icons-react";
import {
  TypeElement,
  TypeMatchups,
} from "../../../utils/augmented-types/temtems";

interface MatchupViewProps {
  traits: TemCardProps["traits"];
  types: TemCardProps["types"];
}

export const MatchupsView = ({ traits, types }: MatchupViewProps) => {
  const alteringTrait1 = matchupAlteringTraits.get(traits[0]);
  const alteringTrait2 = matchupAlteringTraits.get(traits[1]);

  // if either trait1 or trait2 exists, a trait that alters the matchup exists
  // so we have to show both traits because they'll have different matchups
  const matchupAlteringTraitExists = !!alteringTrait1 || !!alteringTrait2;

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

  return (
    <div className={`matchupContainer`}>
      {matchupAlteringTraitExists ? (
        <>
          <MatchupList
            matchups={trait1Matchups}
            traitLabel={traits[0]}
            asterisk={!!alteringTrait1}
          />
          <MatchupList
            matchups={trait2Matchups}
            traitLabel={traits[1]}
            asterisk={!!alteringTrait2}
          />
        </>
      ) : (
        <MatchupList matchups={trait1Matchups} traitLabel={"Both Traits"} />
      )}

      <TooltipPopup />
    </div>
  );
};

///////////////////////////////////////////////////////////////////////////////////////

// const getValueVariant = (num: number): keyof typeof matchupItem => {
//   if (num > 2) return "super_effective";
//   else if (num > 1) return "effective";
//   else if (num === 1) return "neutral";
//   else if (num >= 0.5) return "resistant";
//   else if (num >= 0.25) return "super_resistant";
//   else return "immune";
// };

const drawerAnimProps: HTMLMotionProps<"div"> = {
  variants: {
    open: {
      y: 0,
      opacity: 1,
      pointerEvents: "none",
      transitionEnd: {
        pointerEvents: "auto",
      },
    },
    close: {
      y: 50,
      opacity: 0,
      pointerEvents: "none",
      transitionEnd: {
        pointerEvents: "auto",
      },
    },
  },
  initial: "close",
  animate: "open",
  exit: "close",
  transition: { duration: 0.25 },
};

interface MatchupGridProps {
  traitLabel: string;
  matchups: TypeMatchups;
  asterisk?: boolean;
}

const MatchupList = ({
  traitLabel,
  matchups,
  asterisk = false,
}: MatchupGridProps) => {
  return (
    <div className={`matchupListWrapper`}>
      <span className={`matchupLabel`}>
        {traitLabel}
        {asterisk && <span className={`asteriskLabel`}>&#42;</span>}
      </span>

      <ul className={`matchupList`}>
        {Object.entries(matchups)
          .filter(([, value]) => value !== 1)
          .sort((a, b) => b[1] - a[1])
          .map(([key, value]) => (
            <li key={key} className={`matchupItem[getValueVariant(value)]`}>
              <span className={`elementBox`}>
                <Image
                  alt={key}
                  // src={temTypes[key as TemType].imgUrl}
                  src={"n"}
                  width={18}
                  height={18}
                  quality={100}
                />
              </span>

              <div className={`matchupTypeValue`}>
                {prettyFraction(matchups[key as TypeElement])}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

const TooltipPopup = () => {
  const { togglePopup, opened, safeMark } = usePopup();
  // const btnClass = questionButton + safeMark;
  // const modalClass = tooltip + safeMark;

  return (
    <div className={`modalContainer`}>
      <button className={`btnClass`} onClick={togglePopup} data-opened={opened}>
        Whats all this mean?
        {opened && (
          <IconX
            size={14}
            pointerEvents="none"
            style={{ position: "absolute", right: 0, marginRight: 4 }}
          />
        )}
      </button>

      <AnimatePresence>
        {opened && (
          <motion.div className={`modalClass`} {...drawerAnimProps}>
            <p className={`pg`}>
              Each type listed represents the{" "}
              <span className={`bold`}>attacking</span> type followed by a
              multiplier that accounts for both the{" "}
              <span className={`bold`}>defending</span> temtem&apos;s{" "}
              <span className={`italic`}>types</span> and{" "}
              <span className={`italic`}>traits</span>.
            </p>
            <p className={`pg`}>
              If an attack type is not shown then it does neutral damage
              <span className={`bold`}> (x1)</span>.
            </p>
            <p className={`pg`}>
              <span className={`asteriskLabel`}>&#42;</span>A red asterisk
              indicates a trait that alters the type effectiveness.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
