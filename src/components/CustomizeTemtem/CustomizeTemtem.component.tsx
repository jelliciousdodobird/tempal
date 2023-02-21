"use client";
import { IconQuestionMark } from "@tabler/icons-react";
import clsx from "clsx";
import Image from "next/image";
import { useFetchTemQuery } from "../../hooks/useFetchTemQuery";
import { CustomTem } from "../../store/temteam-store";
import { formatTemName } from "../../utils/utils";
import { ElementTypeLabel } from "../ElementTypeLabel/ElementTypeLabel";

type CustomizeTemtemProps = { customTem: CustomTem };

const NULL_TRAIT = "-";
const NULL_GEAR = "-";
const NULL_TECH = "-";

export const CustomizeTemtem = ({ customTem }: CustomizeTemtemProps) => {
  const { data, isLoading, isError, isPaused } = useFetchTemQuery(
    customTem.name
  );

  if (!data || isLoading || isError || isPaused)
    return (
      <div
        className={clsx(
          "flex flex-col gap-4 p-4 py-6 rounded-xl bg-neutral-800/20zz bg-gradient-to-b from-neutral-800 to-neutral-900 cursor-pointer",
          "hover:ring-1 ring-inset ring-neutral-700/50"
        )}
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="relative flex w-[100px] h-[100px] self-center justify-self-center">
            <div className="absolute inset-0 rounded-full w-full aspect-square scale-75 overflow-hidden bg-neutral-700/30"></div>
            {/* <Image
            alt={"image for custom temtem " + customTem.name}
            src={temData.wikiRenderAnimatedUrl}
            height={100}
            width={100}
            quality={100}
            className="relative flex object-contain w-full h-full"
          /> */}
            <span className="grid place-items-center relative text-xl font-extrabold text-neutral-500 text-center">
              select a temtem
            </span>

            {/* <IconQuestionMark className="relative w-full h-full" /> */}
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <div className="flex flex-col">
              <div className="text-base font-bold">No Name</div>
              <div className="flex gap-2">
                {/* <ElementTypeLabel type={temData.types[0]} />
              {temData.types[1] && <ElementTypeLabel type={temData.types[1]} />} */}
              </div>
            </div>

            <div className="relative flex justify-between gap-1 rounded-lg text-sm h-8 whitespace-nowrap text-neutral-300 bg-neutral-800">
              <span className="flex items-center text-xs text-neutral-500 font-bold px-2 text-center">
                Level
              </span>
              <span className="flex items-center px-3 font-bold font-mono">
                {customTem.level}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 w-full gap-2">
            <div className="relative inline-flex flex-col gap-1">
              <span className="text-xs text-neutral-500 font-bold">Trait</span>
              <span className="flex items-center px-3 w-full rounded-lg text-sm h-8 whitespace-nowrap text-neutral-500 bg-neutral-800/50">
                {customTem.trait || NULL_TRAIT}
              </span>
            </div>
            <div className="relative inline-flex flex-col gap-1">
              <span className="text-xs text-neutral-500 font-bold">Gear</span>
              <span className="flex items-center px-3 w-full rounded-lg text-sm h-8 whitespace-nowrap text-neutral-500 bg-neutral-800/50">
                {customTem.gear || NULL_GEAR}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-neutral-500 font-bold">
              Techniques
            </span>
            <div className="grid grid-cols-2 w-full gap-2">
              {customTem.techniques.map((tech, i) => (
                <div
                  key={tech + i}
                  className="flex items-center px-3 w-full rounded-lg text-sm h-8 whitespace-nowrap text-neutral-500 bg-neutral-800/20"
                >
                  {tech || NULL_TECH}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );

  const temData = data[0];

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 p-4 py-6 rounded-xl bg-neutral-800/20zz bg-gradient-to-b from-neutral-800 to-neutral-900 cursor-pointer",
        "hover:ring-1 ring-inset ring-neutral-700/50"
      )}
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="relative flex w-[100px] h-[100px] self-center justify-self-center">
          <div className="absolute inset-0 rounded-full w-full aspect-square scale-75 overflow-hidden">
            <Image
              alt={"background circle image for " + customTem.name}
              src={temData.portraitWikiUrl}
              height={100}
              width={100}
              quality={50}
              className="relative flex object-contain w-full h-full scale-[250%] blur-sm grayscale-[50%]"
            />
          </div>
          <Image
            alt={"image for custom temtem " + customTem.name}
            src={temData.wikiRenderAnimatedUrl}
            height={100}
            width={100}
            quality={100}
            className="relative flex object-contain w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <div className="flex flex-col">
            <div className="text-base font-bold">
              {formatTemName(temData.name)}
            </div>
            <div className="flex gap-2">
              <ElementTypeLabel type={temData.types[0]} />
              {temData.types[1] && <ElementTypeLabel type={temData.types[1]} />}
            </div>
          </div>

          <div className="relative flex justify-between gap-1 rounded-lg text-sm h-8 whitespace-nowrap text-neutral-300 bg-neutral-800">
            <span className="flex items-center text-xs text-neutral-500 font-bold px-2 text-center">
              Level
            </span>
            <span className="flex items-center px-3 font-bold font-mono">
              {customTem.level}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 w-full gap-2">
          <div className="relative inline-flex flex-col gap-1">
            <span className="text-xs text-neutral-500 font-bold">Trait</span>
            <span className="flex items-center px-3 w-full rounded-lg text-sm h-8 whitespace-nowrap text-neutral-500 bg-neutral-800/50">
              {customTem.trait || NULL_TRAIT}
            </span>
          </div>
          <div className="relative inline-flex flex-col gap-1">
            <span className="text-xs text-neutral-500 font-bold">Gear</span>
            <span className="flex items-center px-3 w-full rounded-lg text-sm h-8 whitespace-nowrap text-neutral-500 bg-neutral-800/50">
              {customTem.gear || NULL_GEAR}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-neutral-500 font-bold">Techniques</span>
          <div className="grid grid-cols-2 w-full gap-2">
            {customTem.techniques.map((tech, i) => (
              <div
                key={tech + i}
                className="flex items-center px-3 w-full rounded-lg text-sm h-8 whitespace-nowrap text-neutral-500 bg-neutral-800/20"
              >
                {tech || NULL_TECH}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
