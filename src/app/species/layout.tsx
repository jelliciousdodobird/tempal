import { SpecieList } from "../../components/SpecieList/SpecieList.component";
import { formatTemType } from "../../utils/api-format";
import { Stats, StatsWithTotal, TemType } from "../../utils/types";

type SpecieLayoutProps = {
  children: React.ReactNode;
};

export default async function SpecieLayout({ children }: SpecieLayoutProps) {
  const allSpecies = await fetchAllSpecies();

  return (
    // <div className="relative flex flex-col gap-8 min-h-full pb-8">
    <div className="pack-content flex">
      <div className="sticky top-0 max-h-[calc(100vh-4rem)] flex-1 min-w-[20rem] max-w-[20rem]">
        <SpecieList species={allSpecies} />
      </div>
      {children}
    </div>
  );
}

export type RawTechnique = {
  name: string;
  source: string;
  levels: number;
};

export type RawEvolutionTree = {
  number: number;
  name: string;
  stage: number;
  levels: number;
  trading: boolean;
  traitMapping: { [trait: string]: string };
};

export type RawEvolution = {
  stage: number;
  evolutionTree: RawEvolutionTree[];
  evolves: boolean;
  type: string;
};

export type MinimalTemSpecieRaw = {
  name: string;
  number: number;
  types: string[];
  traits: string[];
  stats: StatsWithTotal;
  tvYields: Stats;
  techniques: RawTechnique[];
  evolution: RawEvolution;
  wikiRenderStaticUrl: string;
};

export type MinimalTemSpecie = Omit<
  MinimalTemSpecieRaw,
  "types" | "techniques"
> & {
  types: TemType[];
  techniques: string[];
};

const fetchAllSpecies = async (): Promise<MinimalTemSpecie[]> => {
  const params = new URLSearchParams({
    fields:
      "name,number,types,traits,stats,tvYields,techniques,evolution,wikiRenderStaticUrl",
  });

  const res = await fetch("https://temtem-api.mael.tech/api/temtems?" + params);
  const rawData: MinimalTemSpecieRaw[] = await res.json();
  const data: MinimalTemSpecie[] = rawData.map((specie) => ({
    ...specie,
    types: specie.types.map((t) => formatTemType(t)),
    techniques: specie.techniques.map(({ name }) => name),
  }));

  return data;
};
