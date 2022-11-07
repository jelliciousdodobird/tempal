import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

// types:
import { searchContainer, searchInput } from "./SearchInput.css";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export const SearchInput = ({ value, setValue }: Props) => {
  const [hover, setHover] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
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
    <div className={searchContainer[focused]}>
      <input
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
