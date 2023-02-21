"use client";
import Image from "next/image";
import {
  forwardRef,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useHasMounted } from "../../hooks/useHasMounted";
import { useFavoritesStore } from "../../store/favorites-store";
import { MinTemtem } from "../../app/species/layout";
import clsx from "clsx";
import { ElementTypeLabel } from "../ElementTypeLabel/ElementTypeLabel";
import { formatTemName, zeroPad } from "../../utils/utils";
import { useUrlQuery } from "../SpecieList/useUrlQuery";
import Link from "next/link";
import useVirtualScroll from "../../hooks/useVirtualScroll";
import { useFetchTemQuery } from "../../hooks/useFetchTemQuery";

type SpecieParam = {
  name: string;
};

type FavoritesTemsProps = {
  params: SpecieParam;
};

export const Favorites = forwardRef<HTMLDivElement>(({ ...props }, ref) => {
  const mounted = useHasMounted();

  const { favoriteTems, addToFavorites, removeFromFavorites } =
    useFavoritesStore();
  const [data, setData] = useState<MinTemtem[]>([]);

  const updateData = (temtem: MinTemtem) => {};

  const scrollRef = useRef<HTMLDivElement>(null!);

  const { blankHeight, listHeight, renderList } = useVirtualScroll<MinTemtem>({
    scrollContainerRef: scrollRef,
    list: data,
    itemHeight: 80,
    itemGutter: 14,
    overscan: 2,
  });

  if (!mounted) return <>skeleton</>;

  return (
    <div>
      Favorites<div>{favoriteTems}</div>
      <div
        onClick={() => {
          console.log(data);
        }}
      >
        uwu
      </div>
      <div
        ref={ref}
        className={clsx(
          "relative flex flex-col w-full overflow-hidden",
          "bg-neutral-900"
        )}
      >
        <div
          ref={scrollRef}
          className={clsx(
            "flex flex-col gap-4 py-8 custom-scrollbar-tiny overflow-y-auto overflow-x-hidden",
            "outline-none appearance-none"
          )}
        />
        <ul className="relative flex flex-col gap-4 h-auto">
          {favoriteTems.map((temtem, index) => (
            <SpecieData temtem={temtem} key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
});

type SpecieProps = {
  temtem: string;
};

const SpecieData = ({ temtem }: SpecieProps) => {
  const { minimalQueryUrl } = useUrlQuery();
  const getUrl = (tem: MinTemtem) => "/species/" + tem.name + minimalQueryUrl;

  const { data, isLoading, isError, isPaused } = useFetchTemQuery(temtem);

  if (!data || isLoading || isError || isPaused) return <Fragment />;
  if (data.length < 1) return <Fragment />;

  const specie = data[0];

  return (
    <Link
      tabIndex={-1}
      href={getUrl(specie)}
      className={clsx(
        "flex items-center gap-4 pl-2 pr-4 min-h-[5rem] rounded-lg cursor-pointer whitespace-nowrap text-sm",
        "outline-none appearance-none hover:bg-neutral-800/80"
      )}
    >
      <div className="flex w-16 h-16">
        <Image
          alt={specie.name + " image"}
          src={specie.wikiRenderStaticUrl}
          height={64}
          width={64}
          quality={100}
          className="flex object-contain w-full h-full"
        />
      </div>
      <span className="flex flex-col flex-1">
        <span className="flex text-base font-bold">
          <span className="relative top-[-1px] text-[18px] [line-height:1.5rem] text-neutral-600 font-extrabold font-mono pr-1">
            {zeroPad(specie.number, 3)}
          </span>
          <span className="text">{formatTemName(specie.name)}</span>
        </span>
        <span className="flex gap-2">
          {specie.types[0] && <ElementTypeLabel type={specie.types[0]} />}
          {specie.types[1] && <ElementTypeLabel type={specie.types[1]} />}
        </span>
      </span>
    </Link>
  );
};
