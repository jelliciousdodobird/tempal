import { prettyFraction } from "../../../utils/utils";
import Image from "next/future/image";
import {
  matchupContainer,
  matchupListWrapper,
  matchupList,
  matchupItem,
  matchupLabel,
  matchupTypeValue,
  asteriskLabel,
  questionButton,
  modalContainer,
  tooltip,
} from "./MatchupsView.css";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

import { TemType, TypeMatchups } from "../../../utils/types";
import { calculateMatchupModifiers } from "../../../utils/damage-calcs";
import { matchupAlteringTraits, temTypes } from "../../../utils/data";
import { useModal } from "../../../hooks/useModal";

import { TemCardProps } from "../TemCard/TemCard.component";

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
    <div className={matchupContainer}>
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
    </div>
  );
};

///////////////////////////////////////////////////////////////////////////////////////

const getValueVariant = (num: number): keyof typeof matchupTypeValue => {
  if (num > 2) return "super_effective";
  else if (num > 1) return "effective";
  else if (num === 1) return "neutral";
  else if (num >= 0.5) return "resistant";
  else if (num >= 0.25) return "super_resistant";
  else return "immune";
};

const drawerAnimProps: HTMLMotionProps<"ul"> = {
  variants: {
    open: {
      x: 0,
      opacity: 1,
    },
    close: {
      x: 100,
      opacity: 0,
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
  const { toggleModal, opened, disableClose } = useModal();
  const btnClass = questionButton + disableClose;
  const modalClass = tooltip + disableClose;

  return (
    <div className={matchupListWrapper}>
      <span className={matchupLabel}>
        {traitLabel}
        {asterisk && <sup className={asteriskLabel}>&#42;</sup>}

        <div className={modalContainer}>
          <button className={btnClass} onClick={toggleModal}>
            ?
          </button>

          <AnimatePresence>
            {opened && (
              <motion.ul className={modalClass} {...drawerAnimProps}>
                <li>sdf</li>
                <li>sdf</li>
                <li>sdf</li>
                <li>sdf</li>
                <li>sdf</li>
                <li>sdf</li>
                <li>sdf</li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </span>

      <ul className={matchupList}>
        {Object.entries(matchups)
          .filter(([, value]) => value !== 1)
          .sort((a, b) => b[1] - a[1])
          .map(([key, value]) => (
            <li key={key} className={matchupItem}>
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
            </li>
          ))}
      </ul>
    </div>
  );
};
