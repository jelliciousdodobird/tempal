import { SpecieList } from "../../components/SpecieList/SpecieList.component";
import { Fields, Temtem } from "../../utils/augmented-types/temtems";
import { fetchTemtem } from "../../utils/fetch";

type SpecieLayoutProps = {
  children: React.ReactNode;
};

const fields: Fields[] = [
  "name",
  "number",
  "types",
  "traits",
  "stats",
  "tvYields",
  "techniques",
  "evolution",
  "wikiRenderStaticUrl",
];

export type MinTemtem = Pick<
  Temtem,
  | "name"
  | "number"
  | "types"
  | "traits"
  | "stats"
  | "tvYields"
  | "techniques"
  | "evolution"
  | "wikiRenderStaticUrl"
>;

export default async function SpecieLayout({ children }: SpecieLayoutProps) {
  const allSpecies: MinTemtem[] = await fetchTemtem({ fields });

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
