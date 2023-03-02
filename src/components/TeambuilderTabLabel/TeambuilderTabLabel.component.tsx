"use client";

import clsx from "clsx";
import { IconChevronRight } from "@tabler/icons-react";
import { motion } from "framer-motion";

type TeambuilderTabLabelProps = {
  selected: boolean;
  label: string;
  disabled?: boolean;
};

export const TeambuilderTabLabel = ({
  label,
  selected,
  disabled = false,
}: TeambuilderTabLabelProps) => {
  const animate = selected && !disabled;

  return (
    <span className="flex gap items-center text-left text-xs font-bold transition-[padding]">
      {animate && (
        <motion.span
          className="absolute left-0 mr-1"
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
      <motion.span initial={{ x: 0 }} animate={{ x: animate ? 20 : 0 }}>
        {label}
      </motion.span>
    </span>
  );
};
