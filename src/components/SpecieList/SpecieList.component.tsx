"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { forwardRef, Fragment, useMemo } from "react";
import { MinTemtem } from "../../app/species/layout";
import { formatTemName, zeroPad } from "../../utils/utils";
import { ElementTypeLabel } from "../ElementTypeLabel/ElementTypeLabel";
import { SearchInput } from "../SearchInput/SearchInput.component";
import { useList } from "./useList";
import { useUrlQuery } from "./useUrlQuery";
import { Combobox } from "@headlessui/react";
import { IconFilter } from "@tabler/icons-react";
import { SortType } from "./SpecieList.types";
import { SORT_LABELS } from "../SortMenu/SortMenu.component";
import { SORT_TYPE_MAP } from "./SpecieList.utils";

type Props = {
  species: MinTemtem[];
};
export const SpecieList = forwardRef<HTMLDivElement, Props>(function SpecieList(
  { species },
  ref
) {
  const router = useRouter();
  const { renderList } = useList(species);
  const { query, minimalQueryUrl } = useUrlQuery();

  const selectedSpecie = useMemo(
    () => ({
      ...species[0],
      name: "",
    }),
    [species]
  );

  const goToPath = (specie: MinTemtem) => {
    router.push("/species/" + specie.name + minimalQueryUrl);
  };

  return (
    <Combobox
      value={selectedSpecie}
      onChange={(val: MinTemtem) => goToPath(val)}
      by="name"
    >
      <SearchInput />

      <Combobox.Options
        ref={ref}
        static
        as="div"
        className={clsx(
          "relative flex flex-col w-full overflow-hidden",
          "bg-neutral-900"
        )}
      >
        <div className="absolute inset-0 pointer-events-none [background-image:linear-gradient(180deg,#171717,transparent_4rem,transparent_calc(100%-4rem),#171717_100%)]" />

        {renderList.length < 1 && (
          <div className="mt-8 text-neutral-500 text-sm rounded-lg p-4 border border-neutral-500/20">
            No temtems found. Try making sure you have your{" "}
            <span className="text-yellow-500 bg-yellow-800/50 px-1 rounded">
              <IconFilter className="inline" size={16} />
              filter
            </span>{" "}
            set right.
          </div>
        )}
        <ul
          className={clsx(
            "flex flex-col gap-4 py-8 custom-scrollbar-tiny overflow-y-auto overflow-x-hidden",
            "outline-none appearance-none"
          )}
        >
          {renderList.map((option) => (
            <SpecieItemLink
              key={option.name}
              specie={option}
              show={query.sortType}
            />
          ))}
        </ul>
      </Combobox.Options>
    </Combobox>
  );
});

type ItemProps = {
  specie: MinTemtem;
  show: SortType;
};

const SpecieItemLink = ({ specie, show }: ItemProps) => {
  const showSortData =
    show !== "relevance" && show !== "name" && show !== "number";

  const getStat = SORT_TYPE_MAP[show].accessor;

  return (
    <Combobox.Option value={specie} as={Fragment}>
      {({ active }) => (
        <li
          className={clsx(
            "flex items-center gap-4 pl-2 pr-4 min-h-[5rem] rounded-lg cursor-pointer whitespace-nowrap text-sm",
            active ? "bg-neutral-800/80" : "bg-transparent"
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
          {showSortData && (
            <div className="flex flex-col gap-1">
              <span className="font-extrabold text-xs text-center text-neutral-600">
                {SORT_LABELS[show]}
              </span>
              <span className="font-bold font-mono rounded-xl py-2 px-4 bg-neutral-800/50zz bg-[#1E1E1E] text-center">
                {getStat(specie)}
              </span>
            </div>
          )}
        </li>
      )}
    </Combobox.Option>
  );
};
