// import { colord } from "colord";
import num2fraction from "num2fraction";

export interface HasId {
  id: string;
}

export const formatTemName = (name: string) => {
  const index = name.indexOf("(");
  const formattedName = index !== -1 ? name.slice(0, index) : name;
  return formattedName;
};

export const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

export const loadImage = (
  setImageDimensions: React.Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
    }>
  >,
  imageUrl: string
) => {
  const img = new Image();
  img.src = imageUrl;

  img.onload = () => {
    setImageDimensions({
      width: img.width,
      height: img.height,
    });
  };
  img.onerror = (err) => {
    console.log("img error");
    console.error(err);
  };
};

export const clamp = (num: number, min: number, max: number) =>
  Math.max(min, Math.min(num, max));

export const prettyNumber = (num: number) =>
  num.toFixed(2).replace(/[.,]00$/, "");

// export function* generateColors(num_of_colors: number) {
//   const step = num_of_colors < 360 ? 360 / num_of_colors : 1;

//   const colors = [...Array(num_of_colors).keys()].map((i) =>
//     colord(`hsla(${(i * step) % 360}, 100%, 50%, 1)`)
//   );

//   for (let color of colors) {
//     yield color;
//   }
// }

/**
 * Turns an array of item objects with type T into
 * an object with key value (k, v) pairs of (id, T)
 * @param arr an array of objects with atleast an "id" key
 * @returns an object with id strings as its keys and the item object as the values
 */
export const arrayToObject = <T extends HasId>(arr: T[]) => {
  const objects: { [id: string]: T } = {};
  arr.forEach((item) => {
    objects[item.id] = item;
  });

  return objects;
};

export const mapToArray = <T>(map: { [id: string]: T }) =>
  Object.entries(map).map(([id, item]) => item);

export const roundIntToNearestMultiple = (num: number, multiple: number) =>
  Math.round(num / multiple) * multiple;

export const round10 = (num: number) => Math.round(num * 10) / 10;
export const round100 = (num: number) => Math.round(num * 100) / 100;

export const deepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const mergeProps = <T>(oldValue: T, newValue: Partial<T>): T => {
  const a = deepCopy(oldValue);
  const b = deepCopy(newValue);
  return { ...a, ...b };
};

export const zeroPad = (num: number, zeroes: number) =>
  String(num).padStart(zeroes, "0");

export const prettyFraction = (num: string | number) => {
  const fraction = num2fraction(num).split("/");
  const numerator = fraction[0].trim();
  const denominator = fraction[1] ? fraction[1].trim() : "1";

  return denominator === "1" ? numerator : `${numerator}/${denominator}`;
};
