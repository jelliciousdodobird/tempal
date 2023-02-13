import clsx from "clsx";
import { TemType } from "../../utils/types";

type ElementTypeLabelProps = {
  type: TemType;
};

export const ElementTypeLabel = ({ type }: ElementTypeLabelProps) => {
  const bgColor = bg_colors[type];
  const textColor = text_colors[type];
  return (
    <span
      className={clsx(
        "rounded px-2 py-1 text-xs font-bold capitalize",
        bgColor,
        textColor
      )}
    >
      {type}
    </span>
  );
};

export const bg_colors: Record<TemType, string> = {
  neutral: "bg-neutral-base",
  wind: "bg-wind-base",
  earth: "bg-earth-base",
  water: "bg-water-base",
  fire: "bg-fire-base",
  nature: "bg-nature-base",
  electric: "bg-electric-base",
  mental: "bg-mental-base",
  digital: "bg-digital-base",
  melee: "bg-melee-base",
  crystal: "bg-crystal-base",
  toxic: "bg-toxic-base",
};

export const text_colors: Record<TemType, string> = {
  neutral: "text-neutral-dark",
  wind: "text-wind-dark",
  earth: "text-earth-dark",
  water: "text-water-dark",
  fire: "text-fire-dark",
  nature: "text-nature-dark",
  electric: "text-electric-dark",
  mental: "text-mental-dark",
  digital: "text-digital-dark",
  melee: "text-melee-dark",
  crystal: "text-crystal-dark",
  toxic: "text-toxic-dark",
};
