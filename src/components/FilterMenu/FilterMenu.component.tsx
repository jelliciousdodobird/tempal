import clsx from "clsx";
import { Listbox } from "@headlessui/react";
import { IconCheck, IconFilter } from "@tabler/icons-react";
import { Fragment } from "react";
import { FilterType } from "../SpecieList/SpecieList.types";

type SearchFilterSelectMenuProps = {
  value: FilterType;
  onChange: (value: FilterType) => void;
  list: FilterType[];
};

export const FilterMenu = ({
  value,
  onChange,
  list,
}: SearchFilterSelectMenuProps) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <Listbox.Button
        className={clsx(
          "flex items-center gap-2 rounded-lg h-8 pl-2 pr-4 font-bold text-xs w-min text-yellow-500 bg-yellow-800/50",
          "outline-none appearance-none focus-visible:ring-1 ring-white ring-inset"
        )}
      >
        <IconFilter size={20} />
        <span className="uppercase">{filterType_shorthand[value]}</span>
      </Listbox.Button>

      <Listbox.Options
        as="div"
        className={clsx(
          "z-10 absolute flex flex-col left-0 w-full rounded-md overflow-hidden backdrop-blur-md shadow-lg bg-neutral-800/90",
          "outline-none appearance-none"
        )}
      >
        <Listbox.Label className="flex flex-row items-center gap-2 whitespace-nowrap capitalize m-2 px-3 py-1 rounded-md text-lg font-extrabold tracking-wide text-neutral-200">
          <IconFilter size={20} />
          filter
        </Listbox.Label>
        <ul className="">
          {list.map((filter) => (
            <Listbox.Option as={Fragment} key={filter} value={filter}>
              {({ active, selected }) => (
                <li
                  className={clsx(
                    "flex justify-between items-center w-full h-9 px-6 capitalize cursor-pointer text-sm",
                    active ? "bg-neutral-700/40" : "transparent",
                    active ? "text-neutral-100" : "text-neutral-400"
                  )}
                >
                  <span className="hover:scale-110">{filter}</span>
                  {selected && (
                    <span className="flex">
                      <IconCheck size={20} />
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
