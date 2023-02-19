"use client";
import Image from "next/image";
import { forwardRef, Fragment, useEffect, useMemo, useState } from "react";
import { useHasMounted } from "../../hooks/useHasMounted";
import { useFavoritesStore } from "../../store/favorites-store";
import { fetchTemtem } from "../../utils/fetch";
import { Temtem } from "../../utils/augmented-types/temtems";
import { Combobox } from "@headlessui/react";
import { MinTemtem } from "../../app/species/layout";
import clsx from "clsx";
import { ElementTypeLabel } from "../ElementTypeLabel/ElementTypeLabel";
import { formatTemName } from "../../utils/utils";
import { useRouter } from "next/navigation";
import { useUrlQuery } from "../SpecieList/useUrlQuery";

type SpecieParam = {
  name: string;
};

type FavoritesTemsProps = {
  params: SpecieParam;
};

async function getFavData(favs: string[]) {
  const data = await fetchTemtem({ names: favs });
  return data;
}

export const Favorites = forwardRef<HTMLDivElement>(({ ...props }, ref) => {
  const router = useRouter();
  const mounted = useHasMounted();
  const { favoriteTems, addToFavorites, removeFromFavorites } =
    useFavoritesStore();
  const [data, setData] = useState<Temtem[]>([]);

  useEffect(() => {
    getFavData(favoriteTems).then((updatedData) => setData(updatedData));
  }, [favoriteTems]);

  const selectedSpecie = useMemo(
    () => ({
      ...data[0],
      name: "",
    }),
    [data]
  );

  const { query, minimalQueryUrl } = useUrlQuery();

  const goToPath = (specie: MinTemtem) => {
    router.push("/species/" + specie.name + minimalQueryUrl);
  };

  if (!mounted) return <>skeleton</>;

  return (
    <div>
      Favorites<div>{favoriteTems}</div>
      <div
        onClick={() => {
          // getFavData(favoriteTems);
          console.log(data);
        }}
      >
        uwu
      </div>
      <Combobox
        ref={ref}
        value={selectedSpecie}
        onChange={(val: MinTemtem) => goToPath(val)}
        by="name"
        as="div"
        className="flex flex-col gap-4 h-full overflow-hidden"
      >
        <Combobox.Options
          static
          as="div"
          className={clsx(
            "relative flex flex-col w-full overflow-hidden flex-1",
            "bg-neutral-900"
          )}
        >
          <div className="absolute inset-0 pointer-events-none [background-image:linear-gradient(180deg,#171717,transparent_4rem,transparent_calc(100%-4rem),#171717_100%)]" />
          <ul
            className={clsx(
              "flex flex-col gap-4 py-8 custom-scrollbar-tiny overflow-y-auto overflow-x-hidden h-full",
              "outline-none appearance-none"
            )}
          >
            {data.map((option) => (
              <SpecieData key={option.name} specie={option} />
            ))}
          </ul>
        </Combobox.Options>
      </Combobox>
    </div>
  );
});

type SpecieProps = {
  specie: MinTemtem;
};

const SpecieData = ({ specie }: SpecieProps) => {
  return (
    <Combobox.Option value={specie} as={Fragment}>
      {({ active }) => (
        <li
          className={clsx(
            "flex items-center gap-4 px-2 min-h-[5rem] rounded-lg cursor-pointer whitespace-nowrap text-sm",
            active ? "bg-neutral-800" : "bg-transparent"
          )}
        >
          <div className="flex w-16 h-16">
            <Image
              alt={specie.name + " image"}
              src={specie.wikiRenderStaticUrl}
              height={64}
              width={64}
              quality={100}
              className="flex object-contain w-full h-full"
            />
          </div>
          <span className="flex flex-col flex-1">
            <span className="flex text-base">{formatTemName(specie.name)}</span>

            <span className="flex gap-2">
              {specie.types[0] && <ElementTypeLabel type={specie.types[0]} />}
              {specie.types[1] && <ElementTypeLabel type={specie.types[1]} />}
            </span>
          </span>
        </li>
      )}
    </Combobox.Option>
  );
};
