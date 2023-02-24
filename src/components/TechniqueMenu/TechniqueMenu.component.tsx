"use client";

import Image from "next/image";
import { Combobox } from "@headlessui/react";
import { IconCheck, IconCircleCheckFilled } from "@tabler/icons-react";
import clsx from "clsx";
import { Fragment, useRef, useState } from "react";
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

    if (inputRef != null && typeof inputRef !== "function")
      inputRef?.current?.focus();
  };
  const clickButton = (opened: boolean) =>
    !opened && buttonRef.current?.click();

  return (
    <Combobox value={value} onChange={setValue} by="techName">
      {({ open }) => (
        <>
          <div className="relative w-min">
            <Combobox.Input
              ref={inputRef}
              autoComplete="off"
              // placeholder={placeholder}
              className={clsx(
                "relative z-0 flex justify-between px-3 h-8 rounded-md text-base font-mono font-semibold caret-black disabled:cursor-not-allowed bg-neutral-800",
                ` placeholder:text-base placeholder:uppercase appearance-none outline-none`
              )}
              displayValue={(dept: TechOption) =>
                open ? query : dept.techName
              }
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => clickButton(open)}
              required
            />
            {/* 
                Taking advantage of this button in TWO ways:
                1. as a graphic element to let the user know they must fill in the input field (red dot)
                2. as a way to force headless-ui to open the options menu when the input is clicked (using refs)
            */}
            <Combobox.Button
              className="z-10 absolute top-[5px] right-[5px] flex h-1 w-1 text-red-500 pointer-events-none"
              ref={buttonRef}
              disabled
            >
              {value.techName === "" && (
                <>
                  <span className="absolute rounded-full h-2 w-2 -top-[0.125rem] -left-[0.125rem] animate-ping-slow bg-red-500/75" />
                  <span className="relative rounded-full h-full w-full bg-red-500" />
                </>
              )}
            </Combobox.Button>
          </div>

          <Combobox.Options
            // as="div"
            className={clsx(
              "absolute z-20 top-0 left-0 flex flex-col gap-[1px] max-h-[calc(10*2.5rem+4px)]",
              "bg-neutral-800 rounded-lg w-full sm:w-min min-w-[18rem] mb-32",
              "appearance-none outline-none shadow-lg ring-1 ring-white/5",
              "custom-scrollbar-tiny overflow-y-auto overflow-x-hidden",
              "  "
            )}
          >
            {/* <ul className="flex flex-col gap-[1px] custom-scrollbar-tiny overflow-y-auto overflow-x-hidden max-h-[calc(5*2.5rem+4px)] pr-3"> */}
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
            {/* </ul> */}
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

  // console.log(tech);

  const typeIcon = isTypeElement(tech.type) ? typeElementIcons[tech.type] : "";
  const classIcon = TECH_CLASS_ICON_URLS[tech.class];
  const priorityIcon = PRIORITY_ICON_URLS[tech.priority];
  const effectText = formatEffectText(tech.name, tech.effectText);

  return (
    <Combobox.Option value={option} as={Fragment}>
      {({ active, selected }) => (
        <li
          className={clsx(
            "flex flex-col gap-2 px-4 py-4 min-w-[320px] cursor-pointer whitespace-nowrap",
            active ? "bg-neutral-700/30" : ""
          )}
          onClick={() => console.log(tech)}
        >
          <span className="flex gap-2 font-bold text-neutral-100">
            {tech.name}
            {option.alreadySelected && (
              <IconCircleCheckFilled size={24} className="text-emerald-500" />
            )}
          </span>
          <span className="flex gap-1 items-center">
            <div className="grid place-content-center w-10 h-10 rounded-md bg-gradient-to-t from-transparent to-neutral-700/30">
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
            <div className="grid place-content-center w-10 h-10 rounded-md bg-gradient-to-t from-transparent to-neutral-700/30">
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
            <div className="grid place-content-center w-10 h-10 rounded-md bg-gradient-to-t from-transparent to-neutral-700/30">
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

          <p className="max-w-sm font-medium whitespace-pre-wrap text-sm text-neutral-500">
            {effectText}
          </p>
        </li>
      )}
    </Combobox.Option>
  );
};
