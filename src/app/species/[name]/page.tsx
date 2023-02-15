import { formatTemType } from "../../../utils/api-format";
import { TemType } from "../../../utils/types";
import { RawMinimalTemSpecie } from "../layout";

type SpecieParam = {
  name: string;
};

type Props = {
  params: SpecieParam;
};

export default async function Tem({ params }: Props) {
  const data = await fetchTem(params.name);

  return (
    <pre className="relative flex flex-col gap-8 min-h-full pb-8 overflow-x-hiddenzz">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

// export async function generateStaticParams() {
//   const posts = await fetchTems();

//   console.log(posts);

//   return posts.map((tem) => ({ name: tem.name, data: tem }));
// }

export type FullTemSpecieRaw = RawMinimalTemSpecie & {
  wikiRenderAnimatedUrl: string;
  wikiRenderStaticLumaUrl: string;
  wikiRenderAnimatedLumaUrl: string;
};

export type FullTemSpecie = Omit<FullTemSpecieRaw, "types"> & {
  types: TemType[];
};

const fetchTem = async (name: string): Promise<FullTemSpecie | null> => {
  const parsedName = name.length > 0 ? name.replace(/%20/g, " ") : null;
  if (!parsedName) return null;

  const params = new URLSearchParams({
    names: parsedName,
    fields:
      "name,number,types,traits,stats,tvYields,techniques,evolution,wikiRenderStaticUrl,wikiRenderAnimatedUrl,wikiRenderStaticLumaUrl,wikiRenderAnimatedLumaUrl",
  });

  const res = await fetch("https://temtem-api.mael.tech/api/temtems?" + params);
  const rawData: FullTemSpecieRaw[] = await res.json();
  const data: FullTemSpecie[] = rawData.map((specie) => ({
    ...specie,
    types: specie.types.map((t) => formatTemType(t)),
  }));

  return data.length > 0 ? data[0] : null;
};
