import clsx from "clsx";
import { TypeElement } from "../../utils/augmented-types/temtems";

type ElementTypeLabelProps = {
  type: TypeElement;
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

export const bg_colors: Record<TypeElement, string> = {
  Neutral: "bg-neutral-base",
  Wind: "bg-wind-base",
  Earth: "bg-earth-base",
  Water: "bg-water-base",
  Fire: "bg-fire-base",
  Nature: "bg-nature-base",
  Electric: "bg-electric-base",
  Mental: "bg-mental-base",
  Digital: "bg-digital-base",
  Melee: "bg-melee-base",
  Crystal: "bg-crystal-base",
  Toxic: "bg-toxic-base",
};

export const text_colors: Record<TypeElement, string> = {
  Neutral: "text-neutral-dark",
  Wind: "text-wind-dark",
  Earth: "text-earth-dark",
  Water: "text-water-dark",
  Fire: "text-fire-dark",
  Nature: "text-nature-dark",
  Electric: "text-electric-dark",
  Mental: "text-mental-dark",
  Digital: "text-digital-dark",
  Melee: "text-melee-dark",
  Crystal: "text-crystal-dark",
  Toxic: "text-toxic-dark",
};
