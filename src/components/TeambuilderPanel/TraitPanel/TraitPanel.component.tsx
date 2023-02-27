"use client";

import { Tab } from "@headlessui/react";
import { useFetchTemQuery } from "../../../hooks/useFetchTemQuery";
import { useFetchTraitsQuery } from "../../../hooks/useFetchTraitsQuery";
import { CustomTem, UpdateTem } from "../../../store/temteam-store";

export type TraitPanelProps = {
  customTem: CustomTem;
  updateCustomTem: (updatedTem: UpdateTem) => void;
};

export const TraitPanel = ({ customTem, updateCustomTem }: TraitPanelProps) => {
  const temName = customTem.name;
  const { data, isLoading, isError } = useFetchTemQuery(temName);
  const enabledQuery = temName !== "";
  const isTrueLoading = isLoading && enabledQuery;

  if (isTrueLoading || isError)
    return (
      <div className="relative flex w-6 h-6 mx-1 rounded-full bg-white/30 animate-pulse" />
    );

  const tem = data ? data[0] : null;
  const trait1 = tem?.traits[0] || "";
  const trait2 = tem?.traits[1] || "";

  return (
    <Tab.Panel className="flex flex-col gap-4">
      <span className="font-bold">TraitPanel</span>
      <div className="flex flex-col gap-1">
        <TraitItem traitName={trait1} />
        <TraitItem traitName={trait2} />
      </div>
    </Tab.Panel>
  );
};

const TraitItem = ({ traitName }: { traitName: string }) => {
  const { data, isLoading, isError } = useFetchTraitsQuery(traitName);
  const enabledQuery = traitName !== "";
  const isTrueLoading = isLoading && enabledQuery;

  if (isTrueLoading || isError)
    return (
      <div className="relative flex w-6 h-6 mx-1 rounded-full bg-white/30 animate-pulse" />
    );

  const trait = data ? data[0] : null;

  const name = trait?.name || "";
  const desc = trait?.description || "";
  const effect = trait?.effect || "";

  return (
    <div key={name} className="flex flex-col">
      <span className="flex">{name}</span>
      <span className="flex">{desc}</span>
      <span className="flex">{effect}</span>
    </div>
  );
};
