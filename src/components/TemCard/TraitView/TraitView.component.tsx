import {
  contentRow,
  traitContainer,
  traitLabel,
  traitEffect,
  traitDescBox,
} from "./TraitView.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface TraitData {
  ogName: string;
  name: string;
  wikiUrl: string;
  description: string;
  effect: string;
  strippedEffect: string;
}

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

export const TraitView = ({ traits, descriptionLimit = 70 }: TraitsProps) => {
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

  if (isLoading1 || isLoading2) return <></>;
  else if (isError1 || isError2) return <>ERROR</>;

  return (
    <div className={traitContainer}>
      <dl className={traitDescBox}>
        <dt className={traitLabel}>{trait1.ogName}</dt>
        <dd className={traitEffect}>{trait1.strippedEffect}</dd>
      </dl>
      <dl className={traitDescBox}>
        <dt className={traitLabel}>{trait2.ogName}</dt>
        <dd className={traitEffect}>{trait2.strippedEffect}</dd>
      </dl>
    </div>
  );
};
