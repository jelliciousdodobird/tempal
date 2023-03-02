"use client";

import Image from "next/image";
import { Tab } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { Fields, Temtem } from "../../../utils/augmented-types/temtems";
import { fetchTemtem } from "../../../utils/fetch-temtem";
import {
  createCustomTem,
  CustomTem,
  UpdateTem,
} from "../../../store/temteam-store";
import { PanelFilterInput } from "../../PanelFilterInput/PanelFilterInput.component";
import { useMemo, useState } from "react";
import { formatTemName, fuzzy, zeroPad } from "../../../utils/utils";
import { ElementTypeLabel } from "../../ElementTypeLabel/ElementTypeLabel";
import clsx from "clsx";
import { IconCheck } from "@tabler/icons-react";
import { useFavoritesStore } from "../../../store/favorites-store";

type TemPickerPanelProps = {
  customTem: CustomTem;
  updateCustomTem: (updatedTem: UpdateTem) => void;
};

const fields: Fields[] = [
  "name",
  "number",
  "types",
  "traits",
  "stats",
  "tvYields",
  "techniques",
  "evolution",
  "wikiRenderStaticUrl",
];

type TemItem = Pick<
  Temtem,
  | "name"
  | "number"
  | "types"
  | "traits"
  | "stats"
  | "tvYields"
  | "techniques"
  | "evolution"
  | "wikiRenderStaticUrl"
>;

const staleTime = 60 * 60 * 1000;

export const TemPickerPanel = ({
  customTem,
  updateCustomTem,
}: TemPickerPanelProps) => {
  // const enableQuery = customTem.name !== "";

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchAllTemtems"],
    queryFn: () => fetchTemtem({ fields }),
    // enabled: enableQuery,
    staleTime,
  });

  const { favoriteTems } = useFavoritesStore();

  const temList: TemItem[] = data;
  const [filter, setFilter] = useState("");

  const filteredData = useMemo(() => {
    return filter === ""
      ? temList
      : temList.filter((tem) =>
          filter === "favorites"
            ? favoriteTems.includes(tem.name)
            : fuzzy(tem.name, filter)
        );
  }, [filter, temList]);

  // const isTrueLoading = isLoading && enableQuery;

  if (isLoading || isError)
    return (
      <Tab.Panel className="flex flex-col gap-4">
        <span className="font-bold">Loading</span>
      </Tab.Panel>
    );

  const updateToFreshTem = (name: string) => {
    const freshTem = createCustomTem(name);
    updateCustomTem({ ...freshTem, id: customTem.id }); // we still want to keep the same id
  };

  const clearTem = () => updateToFreshTem("");
  const viewFavorites = () => setFilter("favorites");

  return (
    <Tab.Panel className="flex flex-col gap-4" tabIndex={-1}>
      {/* <span className="font-bold">TemPickerPanel</span> */}
      <div className="flex flex-row flex-wrap justify-between gap-4">
        <PanelFilterInput
          placeholder="Filter by TemTem name"
          value={filter}
          setValue={setFilter}
          htmlFor="temtem-picker-filter"
        />
        <div className="flex flex-row flex-wrap gap-4">
          <button
            type="button"
            className="flex justify-center items-center gap-2 rounded-md h-12 w-min py-2 px-4 font-bold text-xs uppercase whitespace-nowrap bg-red-900/50 text-red-400 outline-none appearance-none focus-visible:ring-1 ring-white ring-inset"
            onClick={clearTem}
          >
            clear selected tem
          </button>
          <button
            type="button"
            className="flex justify-center items-center gap-2 rounded-md h-12 w-min py-2 px-4 font-bold text-xs uppercase whitespace-nowrap bg-pink-900/50 text-pink-400 outline-none appearance-none focus-visible:ring-1 ring-white ring-inset"
            onClick={viewFavorites}
          >
            view favorites
          </button>
        </div>
      </div>
      {/* <ul className="flex flex-row flex-wrap gap-8"> */}
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-4 md:gap-8">
        {filteredData.length === 0 && (
          <li className="text-red-500 px-4">No results found.</li>
        )}
        {filteredData.map((tem) => (
          <li
            className={clsx(
              "relative flex items-center gap-4 px-4 min-h-[6rem] w-[16rem]zz",
              "whitespace-nowrap text-sm",
              "rounded-xl border",
              "cursor-pointer hover:bg-neutral-800/80 focus-visible:bg-neutral-800/80 hover:border-white/10 focus-visible:border-white/10",
              customTem.name === tem.name
                ? "border-emerald-900"
                : "border-neutral-800/80"
            )}
            key={tem.name}
            onClick={() => updateToFreshTem(tem.name)}
          >
            <div className="flex justify-center items-center w-16 h-16">
              <Image
                alt={tem.name + " image"}
                src={tem.wikiRenderStaticUrl}
                height={64}
                width={64}
                quality={100}
                className="flex object-contain w-full h-full"
              />
            </div>
            <span className="flex flex-col gap-1 flex-1">
              <span className="flex text-base font-bold">
                <span className="relative top-[-1px] text-[18px] [line-height:1.5rem] text-neutral-600 font-extrabold font-mono pr-1">
                  {zeroPad(tem.number, 3)}
                </span>
                <span className="text text-neutral-100 font-bold">
                  {formatTemName(tem.name)}
                </span>
              </span>

              <span className="flex gap-2">
                {tem.types[0] && <ElementTypeLabel type={tem.types[0]} />}
                {tem.types[1] && <ElementTypeLabel type={tem.types[1]} />}
              </span>
              {customTem.name === tem.name && (
                <div
                  className="absolute right-0 top-0 bg-neutral-800/80zz p-1 mt-2 mx-3 rounded-full bg-emerald-900/50 text-emerald-500"
                  onClick={clearTem}
                >
                  <IconCheck size={16} stroke={2.5} />
                </div>
              )}
            </span>
          </li>
        ))}
      </ul>
    </Tab.Panel>
  );
};
