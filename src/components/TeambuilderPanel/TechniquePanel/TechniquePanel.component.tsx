"use client";

import clsx from "clsx";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import { useMemo, useState } from "react";
import { useFetchTemQuery } from "../../../hooks/useFetchTemQuery";
import { CustomTem, UpdateTem } from "../../../store/temteam-store";
import {
  isTypeElement,
  Technique,
} from "../../../utils/augmented-types/temtems";
import { fuzzy } from "../../../utils/utils";
import { PanelFilterInput } from "../../PanelFilterInput/PanelFilterInput.component";
import { EmptyPanel } from "../EmptyPanel/EmptyPanel.component";
import { useFetchTechniqueData } from "../../../hooks/useFetchTechniqueData";
import {
  PRIORITY_ICON_URLS,
  TECH_CLASS_ICON_URLS,
  typeElementIcons,
} from "../../../utils/data";
import { IconCheck, IconPlus } from "@tabler/icons-react";

type TechniquePanelProps = {
  customTem: CustomTem;
  updateCustomTem: (updatedTem: UpdateTem) => void;
  slot: number;
};

export const TechniquePanel = ({
  customTem,
  updateCustomTem,
  slot,
}: TechniquePanelProps) => {
  const { name, id, techniques } = customTem;
  const { data = [], isLoading, isError } = useFetchTemQuery(customTem.name);

  const enabledQuery = name !== "";
  const isTrueLoading = isLoading && enabledQuery;
  const learnedTechniques = useMemo(
    () => (data[0] ? data[0].techniques.map((tech) => tech.name) : []),
    [data]
  );

  const [filter, setFilter] = useState("");
  //  const filteredData = useMemo(() => {
  //    return filter === ""
  //      ? data
  //      : data.filter(
  //          (tech) => fuzzy(tech.name, filter) || fuzzy(tech.description, filter)
  //        );
  //  }, [filter, data]);
  const filteredData = useMemo(() => {
    return filter === ""
      ? learnedTechniques
      : learnedTechniques.filter((tech) => fuzzy(tech, filter));
  }, [filter, learnedTechniques]);

  if (name === "") return <EmptyPanel />;
  if (isTrueLoading || isError)
    return (
      <div className="rounded-full w-20 h-20 animate-pulse bg-neutral-700"></div>
    );

  // if (!data || !data[0])
  //   return (
  //     <Tab.Panel className="flex flex-col gap-4">
  //       <div className="grid place-items-center rounded-full w-20 h-20 bg-neutral-700">
  //         Pick a tem first
  //       </div>
  //     </Tab.Panel>
  //   );

  // const updateTech = (option: TechOption) => {
  //   const techs = [...customTem.techniques];
  //   updateCustomTem({
  //     id: customTem.id,
  //     techniques: [
  //       ...techs.slice(0, slot),
  //       option.techName,
  //       ...techs.slice(slot + 1),
  //     ],
  //   });
  // };
  const updateTech = (techName: string) => {
    const techs = [...techniques];
    updateCustomTem({
      id,
      techniques: [...techs.slice(0, slot), techName, ...techs.slice(slot + 1)],
    });
  };

  const getIsSelected = (tech: string) =>
    techniques.some((value) => value === tech);

  return (
    <Tab.Panel className="flex flex-col gap-8" tabIndex={-1}>
      <PanelFilterInput
        placeholder="Filter by technique name"
        value={filter}
        setValue={setFilter}
        htmlFor="technique-search-filter"
      />
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-4 md:gap-8">
        {filteredData.length === 0 && (
          <li className="text-red-500 px-4">No results found.</li>
        )}
        {filteredData.map((tech, i) => (
          <li key={tech} className="h-full w-full">
            <TechniqueItem
              techName={tech}
              updateTech={updateTech}
              selected={getIsSelected(tech)}
            />
          </li>
        ))}
      </ul>
    </Tab.Panel>
  );
};

export const formatEffectText = (techName: string, techEffectText: string) => {
  let text = techEffectText.replace(techName, "").trim();
  if (text === "" || text.length < 2) return techEffectText;
  return text[0].toUpperCase() + text.slice(1);
};

export const TechniqueItem = ({
  techName,
  updateTech,
  selected,
}: {
  techName: string;
  updateTech: (value: string) => void;
  selected: boolean;
}) => {
  const {
    data: tech,
    isLoading,
    isError,
    isPaused,
  } = useFetchTechniqueData(techName);

  if (!tech || isLoading || isError || isPaused)
    return (
      <div className="flex flex-col gap-2 px-4 py-4 min-w-[320px] cursor-pointer whitespace-nowrap animate-pulse">
        <span className="flex gap-2 font-bold text-neutral-100 h-6 w-20 rounded-md bg-neutral-700/50 "></span>
        <span className="flex gap-1 items-center">
          <div className="grid place-content-center w-10 h-10 rounded-md bg-neutral-700/30"></div>
          <div className="grid place-content-center w-10 h-10 rounded-md bg-neutral-700/30"></div>
          <div className="grid place-content-center w-10 h-10 rounded-md bg-neutral-700/30"></div>
          <div className="flex gap-1">
            <div className="flex flex-col justify-center w-10 h-10 rounded-md bg-neutral-700/30"></div>
            <div className="flex flex-col justify-center w-10 h-10 rounded-md bg-neutral-700/30"></div>
            <div className="flex flex-col justify-center w-10 h-10 rounded-md bg-neutral-700/30"></div>
          </div>
        </span>

        <p className="max-w-sm font-medium whitespace-pre-wrap text-sm text-neutral-500 h-14 rounded-lg bg-neutral-700/20"></p>
      </div>
    );

  const synType = tech["synergy type"];
  const synDamage = tech["synergy damage"];
  const synHold = tech["synergy hold"];
  const synPriority = tech["synergy priority"];
  const synCost = tech["synergy sta"];
  const synTarget = tech["synergy targeting"];

  const typeIcon = isTypeElement(tech.type) ? typeElementIcons[tech.type] : "";
  const classIcon = TECH_CLASS_ICON_URLS[tech.class];
  const priorityIcon = PRIORITY_ICON_URLS[tech.priority];
  const synPriorityIcon = synPriority ? PRIORITY_ICON_URLS[synPriority] : "";
  const effectText = formatEffectText(tech.name, tech.effectText);

  const synergyTypeIcon = isTypeElement(synType)
    ? typeElementIcons[synType]
    : "";

  const setTech = () => updateTech(techName);

  return (
    <button
      type="button"
      onClick={setTech}
      className={clsx(
        "flex flex-col gap-2 rounded-xl outline-none appearance-none px-4 py-4 h-full w-full border",
        "hover:bg-neutral-800/80 focus-visible:bg-neutral-800/80",
        "hover:border-white/10 focus-visible:border-white/10",
        selected ? "border-emerald-900" : "border-neutral-800/80"
      )}
    >
      <span className="flex justify-between gap-2 w-full font-bold text-neutral-100">
        {tech.name}
        {selected && (
          <span className="grid place-items-center h-full aspect-square rounded-full text-xs bg-emerald-900/50 text-emerald-500">
            <IconCheck size={16} stroke={2.5} />
          </span>
        )}
      </span>
      <span className="flex gap-1 items-center">
        <div className="grid place-content-center w-10 h-10 rounded-md bg-gradient-to-t from-transparent to-neutral-700/40">
          <figure className="flex w-8 h-8">
            <Image
              alt={"attack type icon for " + tech.type}
              src={typeIcon}
              width={50}
              height={50}
              quality={100}
              className="flex object-contain w-full h-full"
            />
          </figure>
        </div>
        <div className="grid place-content-center w-10 h-10 rounded-md bg-gradient-to-t from-transparent to-neutral-700/40">
          <figure className="flex w-7 h-7">
            <Image
              alt={"attack class icon for " + tech.class}
              src={classIcon}
              width={50}
              height={50}
              quality={100}
              className="flex object-contain w-full h-full"
            />
          </figure>
        </div>
        <div className="grid place-content-center w-10 h-10 rounded-md bg-gradient-to-t from-transparent to-neutral-700/40">
          <figure className="flex h-5">
            <Image
              alt={"priority icon for " + tech.priority}
              src={priorityIcon}
              width={100}
              height={46}
              quality={100}
              className="flex object-contain w-full h-full"
            />
          </figure>
        </div>
        <dl className="flex gap-1">
          <div className="flex flex-col justify-center w-10 h-10 rounded-md bg-gradient-to-b from-transparent to-red-900/50 text-red-500">
            <dt className="w-full text-[10px] text-center font-bold uppercase">
              dmg
            </dt>
            <dd className="grid place-items-center flex-1 w-full rounded-md text-sm font-bold font-mono text-center">
              {tech.damage}
            </dd>
          </div>
          <div className="flex flex-col justify-center w-10 h-10 rounded-md bg-gradient-to-b from-transparent to-sky-900/50 text-sky-500">
            <dt className="w-full text-[10px] text-center font-bold uppercase">
              sta
            </dt>
            <dd className="grid place-items-center flex-1 w-full rounded-md text-sm font-bold font-mono text-center">
              {tech.cost}
            </dd>
          </div>
          <div className="flex flex-col justify-center w-10 h-10 rounded-md bg-gradient-to-b from-transparent to-yellow-900/50 text-yellow-500">
            <dt className="w-full text-[10px] text-center font-bold uppercase">
              hold
            </dt>
            <dd className="grid place-items-center flex-1 w-full rounded-md text-sm font-bold font-mono text-center">
              {tech.hold}
            </dd>
          </div>
        </dl>
      </span>
      <p className="max-w-sm text-left text-sm text-neutral-500">
        {effectText}
      </p>

      {synType && (
        <>
          <span className="flex gap-2 font-bold text-neutral-400 text- pt-4">
            Synergy
          </span>
          <div className="flex flex-col">
            <span className="flex gap-1">
              <div className="grid place-content-center w-10 h-10 rounded-full bg-neutral-700/40">
                <figure className="flex w-8 h-8">
                  <Image
                    alt={"synergy type icon for " + synType}
                    src={synergyTypeIcon}
                    width={50}
                    height={50}
                    quality={100}
                    className="flex object-contain w-full h-full"
                  />
                </figure>
              </div>
              <div className="grid place-content-center w-10 h-10 rounded-md">
                <IconPlus stroke={2} className="text-neutral-500" />
              </div>
              <div className="grid place-content-center w-10 h-10 rounded-md bg-gradient-to-t from-transparent to-neutral-700/40">
                <figure className="flex h-5">
                  <Image
                    alt={"synergy priority icon for " + synPriority}
                    src={synPriorityIcon || priorityIcon}
                    width={100}
                    height={46}
                    quality={100}
                    className="flex object-contain w-full h-full"
                  />
                </figure>

                {/* {synPriority ? (
                      <figure className="flex h-5">
                        <Image
                          alt={"synergy priority icon for " + synPriority}
                          src={synPriorityIcon}
                          width={100}
                          height={46}
                          quality={100}
                          className="flex object-contain w-full h-full"
                        />
                      </figure>
                    ) : (
                      "-"
                    )} */}
              </div>
              <dl className="flex gap-1">
                <div className="flex flex-col justify-center w-10 h-10 rounded-md bg-gradient-to-b from-transparent to-red-900/50 text-red-500">
                  <dt className=" w-full text-[10px] text-center font-bold uppercase">
                    dmg
                  </dt>
                  <dd className="grid place-items-center flex-1 w-full rounded-md text-sm font-bold font-mono text-center">
                    {synDamage ?? tech.damage}
                  </dd>
                </div>
                <div className="flex flex-col justify-center w-10 h-10 rounded-md bg-gradient-to-b from-transparent to-sky-900/50 text-sky-500">
                  <dt className=" w-full text-[10px] text-center font-bold uppercase">
                    sta
                  </dt>
                  <dd className="grid place-items-center flex-1 w-full rounded-md text-sm font-bold font-mono text-center">
                    {synCost ?? tech.cost}
                  </dd>
                </div>
                <div className="flex flex-col justify-center w-10 h-10 rounded-md bg-gradient-to-b from-transparent to-yellow-900/50 text-yellow-500">
                  <dt className=" w-full text-[10px] text-center font-bold uppercase">
                    hold
                  </dt>
                  <dd className="grid place-items-center flex-1 w-full rounded-md text-sm font-bold font-mono text-center">
                    {synHold ?? tech.hold}
                  </dd>
                </div>
              </dl>
            </span>
          </div>
          <p className="max-w-sm text-left text-sm text-neutral-500 ">
            {tech.synergyText}
          </p>
        </>
      )}
    </button>
  );
};
