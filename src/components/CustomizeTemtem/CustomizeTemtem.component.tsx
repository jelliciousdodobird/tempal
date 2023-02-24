"use client";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFetchTemQuery } from "../../hooks/useFetchTemQuery";
import { CustomTem, useTemTeamsStore } from "../../store/temteam-store";
import { formatTemName } from "../../utils/utils";
import { ElementTypeLabel } from "../ElementTypeLabel/ElementTypeLabel";

type CustomizeTemtemProps = { customTem: CustomTem; link: string };

const NULL_TRAIT = "-";
const NULL_GEAR = "-";
const NULL_TECH = "-";
const NULL_NAME = "Empty Slot";
const NULL_LEVEL = "-";

export const CustomizeTemtem = ({ customTem, link }: CustomizeTemtemProps) => {
  const { data, isLoading, isError, isPaused } = useFetchTemQuery(
    customTem.name
  );

  const router = useRouter();

  if (!data || isLoading || isError || isPaused)
    return (
      <button
        type="button"
        className={clsx(
          "group flex flex-col gap-4 p-4 py-6 rounded-xl bg-gradient-to-b from-neutral-800 to-neutral-900 cursor-pointer",
          "ring-inset ring-neutral-700/50 hover:ring-1 focus-visible:ring-1",
          "outline-none appearance-none"
        )}
      >
        <div className="grid grid-cols-2 gap-2 w-full">
          <div className="relative flex w-[100px] h-[100px] self-center justify-self-center">
            <div className="absolute inset-0 rounded-full w-full aspect-square scale-75 overflow-hidden bg-neutral-700/50" />
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <div className="flex flex-col">
              <div className="text-left text-base font-bold">{NULL_NAME}</div>
            </div>

            <div className="relative flex justify-between gap-1 rounded-lg text-sm h-8 whitespace-nowrap text-neutral-300 bg-neutral-800">
              <span className="flex items-center text-xs text-neutral-500 font-bold px-2 text-center">
                Level
              </span>
              <span className="flex items-center px-3 font-bold font-mono">
                {NULL_LEVEL}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-2 gap-2">
            <div className="relative inline-flex flex-col gap-1">
              <span className="text-left text-xs text-neutral-500 font-bold">
                Trait
              </span>
              <span className="flex items-center px-3 w-full rounded-lg text-sm h-8 whitespace-nowrap text-neutral-500 bg-neutral-800">
                {NULL_TRAIT}
              </span>
            </div>
            <div className="relative inline-flex flex-col gap-1">
              <span className="text-left text-xs text-neutral-500 font-bold">
                Gear
              </span>
              <span className="flex items-center px-3 w-full rounded-lg text-sm h-8 whitespace-nowrap text-neutral-500 bg-neutral-800">
                {NULL_GEAR}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-left text-xs text-neutral-500 font-bold">
              Techniques
            </span>
            <div className="grid grid-cols-2 w-full gap-2">
              {[...Array(4).keys()].map((tech) => (
                <div
                  key={tech}
                  className="flex items-center px-3 w-full rounded-lg text-sm h-8 whitespace-nowrap text-neutral-500 bg-neutral-800"
                >
                  {NULL_TECH}
                </div>
              ))}
            </div>
          </div>
        </div>
      </button>
    );

  const temData = data[0];
  const activate = () => {
    router.push(link);
  };

  return (
    <button
      type="button"
      className={clsx(
        "group flex flex-col gap-4 p-4 py-6 rounded-xl bg-gradient-to-b from-neutral-800 to-neutral-900 cursor-pointer",
        "ring-inset ring-neutral-700/50 hover:ring-1 focus-visible:ring-1",
        "outline-none appearance-none"
      )}
      onClick={activate}
    >
      <div className="grid grid-cols-2 gap-2 w-full">
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
            className="relative flex object-contain w-full h-full group-hover:animate-bounce-origin group-focus-visible:animate-bounce-origin"
          />
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <div className="flex flex-col">
            <div className="text-left text-base font-bold">
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
      <div className="flex flex-col gap-4 w-full">
        <div className="grid grid-cols-2 gap-2">
          <div className="relative inline-flex flex-col gap-1">
            <span className="text-left text-xs text-neutral-500 font-bold">
              Trait
            </span>
            <span className="flex items-center px-3 w-full rounded-lg text-sm h-8 whitespace-nowrap text-neutral-500 bg-neutral-800">
              {customTem.trait || NULL_TRAIT}
            </span>
          </div>
          <div className="relative inline-flex flex-col gap-1">
            <span className="text-left text-xs text-neutral-500 font-bold">
              Gear
            </span>
            <span className="flex items-center px-3 w-full rounded-lg text-sm h-8 whitespace-nowrap text-neutral-500 bg-neutral-800">
              {customTem.gear || NULL_GEAR}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-left text-xs text-neutral-500 font-bold">
            Techniques
          </span>
          <div className="grid grid-cols-2 w-full gap-2">
            {customTem.techniques.map((tech, slot) => (
              <div
                key={slot + tech}
                className="flex items-center px-3 w-full rounded-lg text-sm h-8 whitespace-nowrap text-neutral-500 bg-neutral-800"
              >
                {tech || NULL_TECH}
              </div>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
};
