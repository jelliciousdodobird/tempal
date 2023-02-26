"use client";

import clsx from "clsx";
import Image from "next/image";
import { Combobox } from "@headlessui/react";
import { IconPlus } from "@tabler/icons-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFetchTechniqueData } from "../../hooks/useFetchTechniqueData";
import { isTypeElement } from "../../utils/augmented-types/temtems";
import {
  PRIORITY_ICON_URLS,
  TECH_CLASS_ICON_URLS,
  typeElementIcons,
} from "../../utils/data";

export type TechOption = {
  techName: string;
  alreadySelected: boolean;
};

type TechniqueMenuProps = {
  value: TechOption;
  setValue: (value: TechOption) => void;
  options: TechOption[];
};

export const TechniqueMenu = ({
  value,
  setValue,
  options,
}: TechniqueMenuProps) => {
  const [query, setQuery] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null!);
  const inputRef = useRef<HTMLInputElement>(null!);

  const filteredOptions =
    query === ""
      ? options
      : options.filter(({ techName }) =>
          techName.toLowerCase().includes(query.toLowerCase())
        );

  const resetQuery = () => {
    setQuery("");
    if (inputRef !== null && typeof inputRef !== "function")
      inputRef?.current?.focus();
  };

  // const clickButton = (opened: boolean) =>
  //   !opened && buttonRef.current?.click();

  return (
    <Combobox
      value={value}
      onChange={setValue}
      by="techName"
      as="div"
      className=""
    >
      {({ open }) => (
        <>
          <Combobox.Input
            ref={inputRef}
            autoComplete="off"
            placeholder="Select a technique"
            className={clsx(
              "flex justify-between px-3 h-8 rounded-md text-base font-bold caret-white disabled:cursor-not-allowed bg-neutral-800",
              "placeholder:text-base placeholder:text-neutral-700 appearance-none outline-none"
            )}
            displayValue={(dept: TechOption) => (open ? query : dept.techName)}
            onChange={(e) => setQuery(e.target.value)}
            // onClick={() => clickButton(open)}
            required
          />

          <Combobox.Options
            static
            className={clsx(
              "flex flex-col py-4",
              "bg-neutral-800zz rounded-lg w-full",
              "appearance-none outline-none"
            )}
          >
            {filteredOptions.length === 0 && (
              <li className="w-full">
                <button
                  type="button"
                  className="w-full flex justify-center items-center gap-4 px-3 h-12 whitespace-nowrap rounded-lg font-bold bg-red-500/50 text-red-100 hover:bg-red-500/60 hover:text-red-200"
                  onClick={resetQuery}
                >
                  No results. Click to reset.
                </button>
              </li>
            )}
            {filteredOptions.map((option) => (
              <TechniqueItem key={option.techName} option={option} />
            ))}
          </Combobox.Options>
        </>
      )}
    </Combobox>
  );
};

export const formatEffectText = (techName: string, techEffectText: string) => {
  let text = techEffectText.replace(techName, "").trim();
  if (text === "" || text.length < 2) return techEffectText;
  return text[0].toUpperCase() + text.slice(1);
};

export const TechniqueItem = ({ option }: { option: TechOption }) => {
  const {
    data: tech,
    isLoading,
    isError,
    isPaused,
  } = useFetchTechniqueData(option.techName);

  if (!tech || isLoading || isError || isPaused)
    return (
      <li className="flex flex-col gap-2 px-4 py-4 min-w-[320px] cursor-pointer whitespace-nowrap animate-pulse">
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
      </li>
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

  return (
    <Combobox.Option value={option} as={Fragment}>
      {({ active, selected }) => (
        <li
          className={clsx(
            "flex flex-col gap-2 px-4 py-5 min-w-[320px] cursor-pointer whitespace-nowrap",
            active ? "bg-neutral-800/30" : ""
          )}
        >
          <span className="flex gap-2 font-bold text-neutral-100">
            {tech.name}
            {option.alreadySelected && (
              <span className="grid place-items-center px-2 rounded-full text-xs bg-green-900/50 text-green-500">
                selected
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
                <dt className=" w-full text-[10px] text-center font-bold uppercase">
                  dmg
                </dt>
                <dd className="grid place-items-center flex-1 w-full rounded-md text-sm font-bold font-mono text-center">
                  {tech.damage}
                </dd>
              </div>
              <div className="flex flex-col justify-center w-10 h-10 rounded-md bg-gradient-to-b from-transparent to-sky-900/50 text-sky-500">
                <dt className=" w-full text-[10px] text-center font-bold uppercase">
                  sta
                </dt>
                <dd className="grid place-items-center flex-1 w-full rounded-md text-sm font-bold font-mono text-center">
                  {tech.cost}
                </dd>
              </div>
              <div className="flex flex-col justify-center w-10 h-10 rounded-md bg-gradient-to-b from-transparent to-yellow-900/50 text-yellow-500">
                <dt className=" w-full text-[10px] text-center font-bold uppercase">
                  hold
                </dt>
                <dd className="grid place-items-center flex-1 w-full rounded-md text-sm font-bold font-mono text-center">
                  {tech.hold}
                </dd>
              </div>
            </dl>
          </span>
          <p className="max-w-sm whitespace-pre-wrap text-sm text-neutral-500">
            {effectText}
          </p>

          {synType && (
            <>
              <span className="flex gap-2 font-bold text-neutral-300 text-sm pt-4">
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
              <p className="max-w-sm whitespace-pre-wrap text-sm text-neutral-500">
                {tech.synergyText}
              </p>
            </>
          )}
        </li>
      )}
    </Combobox.Option>
  );
};
