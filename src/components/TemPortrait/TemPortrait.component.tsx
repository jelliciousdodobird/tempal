"use client";
import { useFetchTemQuery } from "../../hooks/useFetchTemQuery";
import { CustomTem } from "../../store/temteam-store";
import Image from "next/image";
import clsx from "clsx";

type BaseTemPortraitProps = {
  size?: PortraitSize;
  bgColor?: string;
};

type PortraitUsingName = BaseTemPortraitProps & {
  temName: string;
  customTem?: CustomTem;
};

type PortraitUsingTemtem = BaseTemPortraitProps & {
  temName?: never;
  customTem: CustomTem;
};

type TemPortraitProps = PortraitUsingName | PortraitUsingTemtem;

export const TemPortrait = ({
  bgColor = "bg-neutral-700/30",
  size = "M",
  temName = "",
  customTem,
}: TemPortraitProps) => {
  const name = customTem ? customTem.name : temName;
  const sizing = PORTRAIT_SIZES[size];

  const { data, isLoading, isError, isPaused } = useFetchTemQuery(name);

  if (isLoading || !(data && data.length > 0) || isPaused)
    return (
      <div
        className={clsx(
          "flex rounded-full overflow-hidden bg-neutral-700/50",
          sizing
        )}
      />
    );

  const tem = data[0];

  return (
    <figure
      className={clsx("flex rounded-full overflow-hidden", bgColor, sizing)}
    >
      <Image
        alt={`Portrait for ${tem.name}`}
        src={tem.portraitWikiUrl}
        height={PORTRAIT_SIZE}
        width={PORTRAIT_SIZE}
        quality={100}
        className="flex object-contain w-full h-full"
      />
    </figure>
  );
};

export const VALID_PORTRAIT_SIZES = ["S", "M", "L", "FULL"] as const;
export type PortraitSize = typeof VALID_PORTRAIT_SIZES[number];
export const PORTRAIT_SIZES: Record<PortraitSize, string> = {
  S: "w-6 h-6",
  M: "w-8 h-8",
  L: "w-10 h-10",
  FULL: "w-[55px] h-[55px]",
};

export const PORTRAIT_SIZE = 55; // this is the natural width and height of tem.portraitWikiUrl
