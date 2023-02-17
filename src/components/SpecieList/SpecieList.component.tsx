"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { forwardRef, Fragment, useMemo } from "react";
import { MinTemtem } from "../../app/species/layout";
import { formatTemName } from "../../utils/utils";
import { ElementTypeLabel } from "../ElementTypeLabel/ElementTypeLabel";
import { filterType_shorthand } from "../SearchFilterSelectMenu/SearchFilterSelectMenu.component";
import { SearchInput } from "../SearchInput/SearchInput.component";
import { SortMenu } from "../SortMenu/SortMenu.component";
import { useList } from "./useList";
import { useUrlQuery } from "./useUrlQuery";
import { Combobox } from "@headlessui/react";

type Props = {
  species: MinTemtem[];
};
export const SpecieList = forwardRef<HTMLDivElement, Props>(
  ({ species }, ref) => {
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
      // <div className="flex flex-col gap-4 h-full py-4 border-r border-neutral-800">
      <Combobox
        ref={ref}
        value={selectedSpecie}
        onChange={(val: MinTemtem) => goToPath(val)}
        by="name"
        as="div"
        className="flex flex-col h-full overflow-hidden"
      >
        <SearchInput />
        <SortMenu />

        {!!query.filterValue && (
          <div className="text-neutral-500 text-sm">
            {"Showing tems with the "}
            <span className="text-pink-500 font-bold uppercase">
              {filterType_shorthand[query.filterType]}
            </span>
            {" = "}
            <span className="text-pink-500 font-bold ">
              {query.filterValue}
            </span>
          </div>
        )}
        {!query.filterValue && (
          <div className="text-neutral-500 text-sm">{"Showing all tems:"}</div>
        )}
        <Combobox.Options
          static
          as="div"
          className={clsx(
            "relative flex flex-col w-full overflow-hidden flex-1",
            "bg-neutral-900"
          )}
        >
          <div className="absolute inset-0 pointer-events-none [background-image:linear-gradient(180deg,#171717,transparent_4rem,transparent_calc(100%-4rem),#171717_100%)]" />
          <ul
            className={clsx(
              "flex flex-col gap-4 py-8 custom-scrollbar-tiny overflow-y-auto overflow-x-hidden h-full pr-4",
              "outline-none appearance-none"
            )}
          >
            {renderList.map((option) => (
              <SpecieItemLink key={option.name} specie={option} />
            ))}
          </ul>
        </Combobox.Options>
      </Combobox>
      // </div>
    );
  }
);
type ItemProps = {
  specie: MinTemtem;
};

const SpecieItemLink = ({ specie }: ItemProps) => {
  return (
    <Combobox.Option value={specie} as={Fragment}>
      {({ active }) => (
        <li
          className={clsx(
            "flex items-center gap-4 px-2 min-h-[5rem] rounded cursor-pointer whitespace-nowrap text-sm",
            active ? "bg-neutral-800" : "bg-transparent"
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
            <span className="flex text-base">{formatTemName(specie.name)}</span>

            <span className="flex gap-2">
              {specie.types[0] && <ElementTypeLabel type={specie.types[0]} />}
              {specie.types[1] && <ElementTypeLabel type={specie.types[1]} />}
            </span>
          </span>
          {/* {selected && <IconCheck size={20} stroke={3} />} */}
        </li>
      )}
    </Combobox.Option>
  );
};
