"use client";

import clsx from "clsx";
import { RadioGroup, Tab } from "@headlessui/react";
import { IconCheck } from "@tabler/icons-react";
import { Fragment } from "react";
import { useFetchTemQuery } from "../../../hooks/useFetchTemQuery";
import { useFetchTraitsQuery } from "../../../hooks/useFetchTraitsQuery";
import { CustomTem, UpdateTem } from "../../../store/temteam-store";
import { EmptyPanel } from "../EmptyPanel/EmptyPanel.component";

type TraitPanelProps = {
  customTem: CustomTem;
  updateCustomTem: (updatedTem: UpdateTem) => void;
};

export const TraitPanel = ({ customTem, updateCustomTem }: TraitPanelProps) => {
  const { id, name, trait } = customTem;
  const { data, isLoading, isError } = useFetchTemQuery(name);
  const enabledQuery = name !== "";
  const isTrueLoading = isLoading && enabledQuery;

  if (name === "") return <EmptyPanel />;
  if (isTrueLoading || isError)
    return (
      <div className="relative flex w-6 h-6 mx-1 rounded-full bg-white/30 animate-pulse" />
    );

  const tem = data ? data[0] : null;
  const trait1 = tem?.traits[0] || "";
  const trait2 = tem?.traits[1] || "";

  const updateTrait = (trait: string) => updateCustomTem({ id, trait });

  return (
    <Tab.Panel className="flex flex-col gap-4" tabIndex={-1}>
      <RadioGroup
        className="flex flex-col gap-4"
        value={trait}
        onChange={updateTrait}
      >
        <TraitItem traitName={trait1} />
        <TraitItem traitName={trait2} />
      </RadioGroup>
    </Tab.Panel>
  );
};

/**
 * Maeel's API calls the trait "Attack<T>" as "Attack<T>". The cargo query called "Attack<T>" as "Attack T". This function resolves that issue.
 * @param trait
 * @returns
 */
const correctTraitAttackT = (trait: string) =>
  trait === "Attack<T>" ? "Attack T" : trait;

const TraitItem = ({ traitName }: { traitName: string }) => {
  const {
    data = [],
    isLoading,
    isError,
  } = useFetchTraitsQuery(correctTraitAttackT(traitName));
  const enabledQuery = traitName !== "";
  const isTrueLoading = isLoading && enabledQuery;

  if (isTrueLoading || isError)
    return (
      <div className="relative flex gap-4 rounded-xl p-4 bg-neutral-800/80 w-full max-w-sm animate-pulse">
        <div className="grid place-items-center h-full min-w-[32px]">
          <span className="grid place-items-center rounded-full h-8 w-8 bg-neutral-800"></span>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="flex rounded-lg bg-neutral-800 h-8 w-32"></span>
          <span className="flex rounded-lg bg-neutral-800 h-6 w-full"></span>
          <span className="flex rounded-lg bg-neutral-800 h-6 w-full"></span>
        </div>
      </div>
    );

  const trait = data ? data[0] : null;

  const name = trait?.name || "";
  const effect = trait?.effect || "";

  return (
    <RadioGroup.Option as={Fragment} value={name}>
      {({ checked, active }) => (
        <div
          className={clsx(
            "group/trait-option relative flex gap-4 outline-none appearance-none rounded-xl p-4 w-full max-w-sm border cursor-pointer",
            "hover:bg-neutral-800/60 focus-visible:bg-neutral-800/60",
            "hover:border-white/10 focus-visible:border-white/10",
            checked && !active ? "border-emerald-900" : "border-neutral-800/80"
          )}
        >
          <div className="grid place-items-center h-full min-w-[32px]">
            {checked ? (
              <span className="grid place-items-center rounded-full h-8 w-8 bg-emerald-900/50 text-emerald-500">
                <IconCheck size={16} stroke={2.5} />
              </span>
            ) : (
              <span className="grid place-items-center rounded-full h-8 w-8 border border-neutral-800/80 bg-neutral-800/30 group-hover/trait-option:bg-white/5 group-hover/trait-option:border-white/10"></span>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <RadioGroup.Label className="flex text-left font-bold">
              {name}
            </RadioGroup.Label>
            <RadioGroup.Description className="flex text-left text-sm text-neutral-500">
              {effect}
            </RadioGroup.Description>
          </div>
        </div>
      )}
    </RadioGroup.Option>
  );
};
