"use client";

import { Combobox } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import {
  usePathname,
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { MinimalTemSpecie } from "../../app/species/layout";
import { useDebounce } from "../../hooks/useDebounce";
import { formatTemName } from "../../utils/utils";
import { ElementTypeLabel } from "../ElementTypeLabel/ElementTypeLabel";
import { SortMenu } from "../SortMenu/SortMenu.component";
import { SearchQuery } from "./SpecieList.types";
import {
  getMinimalQueryString,
  // getQueryFromUrlParams,
  cleanQuery,
  getQuery,
  // getQueryFromUrl,
} from "./SpecieList.utils";

import { useList } from "./useList";
import { useUrlQuery } from "./useUrlQuery";

export const SpecieList = ({ species }: { species: MinimalTemSpecie[] }) => {
  const router = useRouter();
  const { renderList } = useList(species);
  const { minimalQueryUrl } = useUrlQuery();

  const uniqueTypes = useMemo(
    () =>
      Array.from(
        new Set(species.flatMap((tem) => tem.types.map((type) => type)))
      ),
    [species]
  );

  const uniqueTraits = useMemo(
    () =>
      Array.from(
        new Set(species.flatMap((tem) => tem.traits.map((type) => type)))
      ),
    [species]
  );

  const uniqueNames = useMemo(
    () => Array.from(new Set(species.map((tem) => tem.name))),
    [species]
  );

  const selectedSpecie = useMemo(
    () => ({
      ...species[0],
      name: "",
    }),
    [species]
  );

  const goToPath = (specie: MinimalTemSpecie) => {
    router.push("/species/" + specie.name + minimalQueryUrl);
  };

  useEffect(() => {
    console.log("list");
  });

  useEffect(() => {
    console.log("first mount");
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full py-4 pr-4 border-r border-neutral-800">
      <Combobox
        value={selectedSpecie}
        onChange={(val) => goToPath(val)}
        by="name"
      >
        <SearchInput />

        <SortMenu />

        <Combobox.Options
          static
          as="div"
          className={clsx(
            "relative flex flex-col w-full overflow-hidden",
            "bg-neutral-900"
          )}
        >
          <div className="absolute inset-0 pointer-events-none [background-image:linear-gradient(180deg,#171717,transparent_4rem,transparent_calc(100%-4rem),#171717_100%)]" />
          <ul
            className={clsx(
              "flex flex-col gap-4 py-8 custom-scrollbar-tiny overflow-y-auto overflow-x-hidden flex-growzz pr-3",
              "outline-none appearance-none"
            )}
          >
            {renderList.map((option) => (
              <SpecieItemLink key={option.name} specie={option} />
            ))}
          </ul>
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

type ItemProps = {
  specie: MinimalTemSpecie;
};

const SpecieItemLink = ({ specie }: ItemProps) => {
  return (
    <Combobox.Option value={specie} as={Fragment}>
      {({ active }) => (
        <li
          className={clsx(
            "flex items-center gap-4 px-3 min-h-[5rem] rounded cursor-pointer whitespace-nowrap text-sm",
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
          {/* <span className="min-w-[2rem] font-mono font-medium">
            {specie.number}
          </span> */}
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

const SearchInput = () => {
  const router = useRouter();
  const { query, updateQueryUrl } = useUrlQuery();

  const [filterValue, setFilterValue] = useState<string>(query.filterValue);
  const debouncedFilterValue = useDebounce(filterValue, 1000);
  const currentQuery: SearchQuery = {
    ...query,
    filterValue: debouncedFilterValue,
  };

  const setUrlQuery = (newQuery: Partial<SearchQuery>) => {
    console.log("update");
    updateQueryUrl({ query: newQuery, updateType: "replace" });
  };

  const resetQueryFilter = () => setUrlQuery({ filterValue: "" });

  useEffect(() => {
    // To avoid unneccesary routing changes and rerenders,
    // we only update the url when the debouncedFilterValue changes,
    // but to ensure we don't have stale values for:
    // (1) the current pathname
    // (2) other current query values (sortType, sortOrder, filterType)
    // we use the URL() and getQuery():
    const url = new URL(window.location.href);
    const pathname = url.pathname;
    const searchParams = url.searchParams;
    const currentQuery = getQuery(searchParams);
    const queryString = getMinimalQueryString({
      ...currentQuery,
      filterValue: debouncedFilterValue,
    });

    router.replace(pathname + queryString);
  }, [debouncedFilterValue]);

  return (
    <>
      <div className="flex w-full">
        <Combobox.Input
          autoComplete="off"
          placeholder={"filtering by " + currentQuery.filterType}
          className={clsx(
            "outline-none appearance-none",
            "flex px-3 min-h-[2.5rem] w-full rounded-md text-base caret-white bg-neutral-800"
          )}
          value={filterValue}
          displayValue={() => filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>
    </>
  );
};
