"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// import Tem from "../(explore)/species/[name]/page";
import { PageModal } from "../../components/PageModal/PageModal.component";
import {
  TechniqueMenu,
  TechOption,
} from "../../components/TechniqueMenu/TechniqueMenu.component";
import { useFetchTemQuery } from "../../hooks/useFetchTemQuery";
import { useHasMounted } from "../../hooks/useHasMounted";
import {
  useTemTeamsStore,
  TemTeam,
  CustomTem,
} from "../../store/temteam-store";

type SpecieParam = {
  teamId: string;
  customTemId: string;
};

type Props = {
  params: SpecieParam;
};

export default function TeamsViewPage({ params }: Props) {
  const hasMounted = useHasMounted();
  if (!hasMounted) return <div>NOT MOUNTED</div>;
  return (
    <div className="relative flex flex-col gap-8 min-h-full pb-8">
      <TeamsView />
    </div>
  );
}

const TeamsView = () => {
  const temTeams = useTemTeamsStore((state) => state.teams);

  return (
    <div className="pack-content sdfsdf">
      <div className="flex flex-col">
        {temTeams.map((temTeam) => (
          <Team key={temTeam.id} temTeam={temTeam} />
        ))}
      </div>
    </div>
  );
};

const Team = ({ temTeam }: { temTeam: TemTeam }) => {
  return (
    <Link href={`/teambuilder/${temTeam.id}`} className="flex gap-2">
      {temTeam.team.map((tem) => (
        <Tem key={tem.id} customTem={tem} />
      ))}
    </Link>
  );
};

const Tem = ({ customTem }: { customTem: CustomTem }) => {
  const { data, isLoading, isError, isPaused } = useFetchTemQuery(
    customTem.name
  );

  if (isLoading || isError || isPaused)
    return (
      <div className="rounded-full w-20 h-20 animate-pulse bg-neutral-700"></div>
    );

  if (!data || !data[0])
    return (
      <div className="grid place-items-center rounded-full w-20 h-20 bg-neutral-700">
        EMPTY
      </div>
    );

  const tem = data[0];

  return (
    <div className="grid place-items-center rounded-full w-20 h-20 bg-neutral-700">
      <figure className="flex w-20 h-20">
        <Image
          alt={"Tem image for " + tem.name}
          src={tem.wikiRenderStaticUrl}
          width={100}
          height={100}
          quality={100}
          className="flex object-contain w-full h-full"
        />
      </figure>
    </div>
  );
};
