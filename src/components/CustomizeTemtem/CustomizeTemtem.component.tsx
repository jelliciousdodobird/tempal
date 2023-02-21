"use client";
import Image from "next/image";
import { useFetchTemQuery } from "../../hooks/useFetchTemQuery";
import { CustomTem } from "../../store/temteam-store";
import { Temtem } from "../../utils/augmented-types/temtems";
import { ElementTypeLabel } from "../ElementTypeLabel/ElementTypeLabel";

type CustomizeTemtemProps = { customTem: CustomTem };

export const CustomizeTemtem = ({ customTem }: CustomizeTemtemProps) => {
  const { data, isLoading, isError, isPaused } = useFetchTemQuery(
    customTem.name
  );

  if (!data || isLoading || isError || isPaused) return <>skeleton</>;

  const temData = data[0];

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-neutral-800/20">
      <div className="grid grid-cols-2 gap-2">
        <div className="relative flex w-[100px] h-[100px]">
          <div className="absolute inset-0 rounded-full w-full aspect-square scale-75 overflow-hidden">
            <Image
              alt={"background circle image for " + customTem.name}
              src={temData.portraitWikiUrl}
              height={100}
              width={100}
              quality={50}
              className="relative flex object-contain w-full h-full scale-125 blur-lg"
            ></Image>
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
        <div className="flex flex-col gap-1">
          <div className="">
            <span className="inline-flex items-center gap-2 bg-black/20 rounded-lg px-2 h-6">
              <span className="text-[8px] font-mono uppercase">lvl</span>
              <span className="text-sm font-mono font-bold">
                {customTem.level}
              </span>
            </span>
            {/* <ElementTypeLabel type={temData.types[0]} />
            {temData.types[1] && <ElementTypeLabel type={temData.types[1]} />} */}
          </div>
          {/* <div className="relative inline-flex items-center gap-2 bg-black/20 rounded-lg px-2 pb-2 pt-4">
            <span className="absolute top-1 left-2 text-[8px] font-mono uppercase">
              trait
            </span>
            <span className="text-sm font-bold whitespace-nowrap">
              {customTem.trait || "Common Factor"}
            </span>
          </div>
          <div className="relative inline-flex items-center gap-2 bg-black/20 rounded-lg px-2 pb-2 pt-4">
            <span className="absolute top-1 left-2 text-[8px] font-mono uppercase">
              gear
            </span>
            <span className="text-sm font-bold whitespace-nowrap">
              {customTem.gear || "Energy Drink"}
            </span>
          </div> */}
        </div>
      </div>
      <div className="">
        <div className="grid grid-cols-2 w-full gap-2">
          <div className="relative inline-flex items-center gap-2 bg-black/20 rounded-lg px-2 pb-2 pt-4">
            <span className="absolute top-1 left-2 text-[8px] font-mono uppercase">
              trait
            </span>
            <span className="text-sm font-bold whitespace-nowrap">
              {customTem.trait || "Common Factor"}
            </span>
          </div>
          <div className="relative inline-flex items-center gap-2 bg-black/20 rounded-lg px-2 pb-2 pt-4">
            <span className="absolute top-1 left-2 text-[8px] font-mono uppercase">
              gear
            </span>
            <span className="text-sm font-bold whitespace-nowrap">
              {customTem.gear || "Energy Drink"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full gap-2">
          {customTem.techniques.map((tech, i) => (
            <div
              key={tech + i}
              className="flex items-center px-3 w-full rounded-lg text-sm h-8 whitespace-nowrap text-neutral-500 bg-neutral-800/50"
            >
              {tech || "Mechanical Heat"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
