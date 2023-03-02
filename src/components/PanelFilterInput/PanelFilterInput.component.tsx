import { IconSearch, IconX } from "@tabler/icons-react";
import { ChangeEventHandler } from "react";

type PanelFilterInputProps = {
  placeholder?: string;
  label?: string;
  htmlFor: string;
  value: string;
  setValue: (value: string) => void;
};

const iconProps = {
  size: 20,
};

export const PanelFilterInput = ({
  value,
  setValue,
  label,
  placeholder = "Filter...",
  htmlFor,
}: PanelFilterInputProps) => {
  const isEmpty = value === "";

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const clearValue = () => setValue("");

  return (
    <div className="flex gap-2 rounded-lg max-w-sm w-full h-12 px-3 bg-neutral-800 text-neutral-400 focus-within:bg-white/10 focus-within:ring-1 ring-white/20">
      <button
        tabIndex={-1}
        type="button"
        className="grid place-items-center"
        onClick={clearValue}
      >
        {isEmpty ? <IconSearch {...iconProps} /> : <IconX {...iconProps} />}
      </button>
      <label htmlFor={htmlFor} className="hidden">
        {label}
      </label>
      <input
        id={htmlFor}
        type="text"
        className="text-base w-full outline-none appearance-none bg-transparent placeholder:text-white/30"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
