import { formatTemType } from "../../../../utils/api-format";
import { FullTemSpecie, FullTemSpecieRaw } from "../../[name]/page";

type SpecieParam = {
  names: string[];
};

type Props = {
  params: SpecieParam;
};

export default async function CompareTems({ params }: Props) {
  const data = await fetchTem(params.names);

  return (
    <pre className="relative flex flex-col gap-8 min-h-full pb-8">
      {JSON.stringify(params, null, 2)}
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

const fetchTem = async (names: string[]): Promise<FullTemSpecie[]> => {
  if (names.length === 0) return [];
  const queryString = names
    .map((name) =>
      name.length > 0 ? name[0].toUpperCase() + name.slice(1).toLowerCase() : ""
    )
    .filter((name) => name !== "")
    .join(",")
    .replace(/%20/g, " ");

  const params = new URLSearchParams({
    names: queryString,
    fields:
      "name,number,types,traits,stats,tvYields,techniques,wikiRenderStaticUrl,wikiRenderAnimatedUrl,wikiRenderStaticLumaUrl,wikiRenderAnimatedLumaUrl",
  });

  const res = await fetch("https://temtem-api.mael.tech/api/temtems?" + params);
  const rawData: FullTemSpecieRaw[] = await res.json();
  const data: FullTemSpecie[] = rawData.map((specie) => ({
    ...specie,
    types: specie.types.map((t) => formatTemType(t)),
  }));

  return data;
};
