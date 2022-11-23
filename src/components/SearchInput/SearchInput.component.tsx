import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDisableIOSInputZoom } from "../../hooks/useDisableIOSInputZoom";
import { usePopup } from "../../hooks/usePopup";
import { FilterKey, SearchQuery } from "../../pages/tems/index.page";

// types:
import {
  dropdownBox,
  searchContainer,
  searchInput,
  selectItem,
  selectMenuBox,
  selectValueButton,
} from "./SearchInput.css";

const placeholders: Record<FilterKey, string> = {
  all: "Filtering by name, number, types, and traits",
  name: "Filtering by name only",
  number: "Filtering by number only",
  types: "Filtering by types only",
  traits: "Filtering by traits only",
};

interface SearchInputProps {
  value: string;
  // setValue: Dispatch<SetStateAction<string>>;

  filter: FilterKey;
  // setFilter: Dispatch<SetStateAction<FilterKey>>;

  setQuery: Dispatch<SetStateAction<SearchQuery>>;
}

export const SearchInput = ({
  value,
  // setValue,
  filter,
  // setFilter,
  setQuery,
}: SearchInputProps) => {
  const {
    opened: showFilterMenu,
    setOpened: setShowFilterMenu,
    togglePopup: toggleMenu,
    safeMark,
  } = usePopup();
  const searchRef = useRef<HTMLInputElement>(null);

  const toggleItem = (item: FilterKey) => {
    // setFilter(item);
    // setShowFilterMenu(false);

    setQuery((v) => ({ ...v, filterKey: item }));
    setShowFilterMenu(false);
  };

  useDisableIOSInputZoom(searchRef);

  useEffect(() => {
    const focusOnCtrlF = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "f") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", focusOnCtrlF);

    return () => {
      window.removeEventListener("keydown", focusOnCtrlF);
    };
  }, []);

  return (
    <div className={searchContainer}>
      <div className={selectMenuBox}>
        <button
          className={selectValueButton + safeMark}
          type="button"
          onClick={toggleMenu}
        >
          {filter}
        </button>
        {showFilterMenu && (
          <ul className={dropdownBox}>
            <SelectItem
              className={safeMark}
              value="all"
              selectedItem={filter}
              toggleItem={toggleItem}
            />
            <SelectItem
              className={safeMark}
              value="name"
              selectedItem={filter}
              toggleItem={toggleItem}
            />
            <SelectItem
              className={safeMark}
              value="number"
              selectedItem={filter}
              toggleItem={toggleItem}
            />
            <SelectItem
              className={safeMark}
              value="types"
              selectedItem={filter}
              toggleItem={toggleItem}
            />

            <SelectItem
              className={safeMark}
              value="traits"
              selectedItem={filter}
              toggleItem={toggleItem}
            />
          </ul>
        )}
      </div>
      <input
        type="search"
        ref={searchRef}
        className={searchInput}
        placeholder={placeholders[filter]}
        value={value}
        onChange={(e) => {
          // setValue(e.target.value);
          setQuery((v) => ({ ...v, value: e.target.value }));
        }}
      />
    </div>
  );
};

interface SelectItemProps {
  className?: string;
  value: FilterKey;
  selectedItem: FilterKey;
  toggleItem: (item: FilterKey) => void;
}

const SelectItem = ({
  className,
  value,
  selectedItem,
  toggleItem,
}: SelectItemProps) => {
  return (
    <li
      className={selectItem + className}
      data-selected={selectedItem === value}
      onClick={() => toggleItem(value)}
    >
      {value}
    </li>
  );
};
