import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDisableIOSInputZoom } from "../../hooks/useDisableIOSInputZoom";

// types:
import { searchContainer, searchInput } from "./SearchInput.css";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export const SearchInput = ({ value, setValue }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  useDisableIOSInputZoom(searchRef);
  const [focused, setFocused] =
    useState<keyof typeof searchContainer>("normal");

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
    <div className={searchContainer[focused]} id="yell">
      <input
        type="search"
        ref={searchRef}
        className={searchInput}
        placeholder="Search by name, number, traits, or types."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onFocus={() => setFocused("focused")}
        onBlur={() => setFocused("normal")}
      />
      <button type="button"></button>
    </div>
  );
};
