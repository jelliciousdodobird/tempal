"use client";

import clsx from "clsx";
import { IconChevronRight } from "@tabler/icons-react";
import { motion } from "framer-motion";

type TeambuilderTabLabelProps = {
  selected: boolean;
  label: string;
};

export const TeambuilderTabLabel = ({
  label,
  selected,
}: TeambuilderTabLabelProps) => {
  return (
    <span
      className={clsx(
        "flex gap items-center text-left text-xs font-bold transition-[padding]",
        selected && "pl-1zz"
      )}
    >
      {selected && (
        <motion.span
          className="mr-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <IconChevronRight
            size={16}
            stroke={3}
            className="animate-bounce-origin-right"
          />
        </motion.span>
      )}
      <motion.span layout className="">
        {label}
      </motion.span>
    </span>
  );
};
