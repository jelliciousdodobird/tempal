import { SidebarTabs } from "../../components/SidebarTabs/SidebarTabs.component";
import { Fields, Temtem } from "../../utils/augmented-types/temtems";
import { fetchTemtem } from "../../utils/fetch-temtem";

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
    <div className="pack-content flex flex-col md:flex-row gap-8 h-full">
      <div className="z-10 sticky top-16 md:min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] md:min-w-[20rem] md:max-w-[20rem]">
        <SidebarTabs species={allSpecies} />
      </div>
      <div className="z-0 relative flex flex-col gap-4 py-4 flex-1">
        {children}
      </div>
    </div>
  );
}
