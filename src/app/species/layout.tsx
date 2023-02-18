import { SidebarTabs } from "../../components/SidebarTabs/SidebarTabs.component";
import { SpecieList } from "../../components/SpecieList/SpecieList.component";
import { MyTeams } from "../../components/MyTeams/MyTeams.component";
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
    <div className="pack-content flex gap-8 h-full">
      <div className="sticky top-16 min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] min-w-[20rem] max-w-[20rem]">
        {/* <SpecieList species={allSpecies} /> */}
        <SidebarTabs species={allSpecies} />
      </div>
      <div className="flex flex-col gap-4 py-4 flex-1">
        {/* <TemTeamTabs /> */}
        {children}
      </div>
    </div>
  );
}
