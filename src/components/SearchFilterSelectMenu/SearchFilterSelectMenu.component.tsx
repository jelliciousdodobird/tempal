import clsx from "clsx";
import { Listbox } from "@headlessui/react";
import { IconCheck } from "@tabler/icons-react";
import { Fragment } from "react";
import { FilterType } from "../SpecieList/SpecieList.types";

type SearchFilterSelectMenuProps = {
  value: FilterType;
  onChange: (value: FilterType) => void;
  list: FilterType[];
};

export const SearchFilterSelectMenu = ({
  value,
  onChange,
  list,
}: SearchFilterSelectMenuProps) => {
  return (
    <Listbox
      as="div"
      value={value}
      onChange={onChange}
      className="flex flex-col h-full"
    >
      <Listbox.Button className="relative rounded-tl-lg rounded-bl-lg w-20 h-full font-bold text-sm uppercase text-neutral-300 bg-neutral-700 outline-none appearance-none focus-visible:ring-1 ring-white ring-inset">
        {filterType_shorthand[value]}
      </Listbox.Button>

      <Listbox.Options
        as="div"
        className={clsx(
          "z-10 absolute flex flex-col left-0 top-[2.5rem] mt-4 w-full rounded-md overflow-hidden backdrop-blur-md shadow-lg bg-neutral-800/90",
          "outline-none appearance-none"
        )}
      >
        <Listbox.Label className="w-min whitespace-nowrap m-2 px-3 py-1 rounded uppercase text-sm font-bold bg-neutral-700 text-neutral-200">
          filter
        </Listbox.Label>
        <ul className="">
          {list.map((filter) => (
            <Listbox.Option as={Fragment} key={filter} value={filter}>
              {({ active, selected }) => (
                <li
                  className={clsx(
                    "flex justify-between items-center w-full h-12 px-6 capitalize cursor-pointer",
                    active ? "bg-neutral-700/40" : "transparent",
                    active ? "text-neutral-100" : "text-neutral-400"
                  )}
                >
                  {filter}
                  {selected && (
                    <span className="flex">
                      <IconCheck />
                    </span>
                  )}
                </li>
              )}
            </Listbox.Option>
          ))}
        </ul>
      </Listbox.Options>
    </Listbox>
  );
};

export const filterType_shorthand: Record<FilterType, string> = {
  name: "name",
  types: "types",
  traits: "trait",
  number: "#",
  techniques: "tech",
};
