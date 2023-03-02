"use client";

import { useState } from "react";
import { useFetchTemQuery } from "../../../../../hooks/useFetchTemQuery";
import { useHasMounted } from "../../../../../hooks/useHasMounted";
import { useTemTeamsStore } from "../../../../../store/temteam-store";

type SpecieParam = {
  teamId: string;
  customTemId: string;
};

type Props = {
  params: SpecieParam;
};

export default function EditCustomTemPage({ params }: Props) {
  const hasMounted = useHasMounted();
  if (!hasMounted) return <></>;
  return (
    <div className="relative flex flex-col gap-8 min-h-full pb-8">
      <EditCustomTem {...params} />
    </div>
  );
}

const EditCustomTem = ({ teamId, customTemId }: SpecieParam) => {
  const { updateCustomTem, teams } = useTemTeamsStore();
  const team = teams.find((team) => team.id === teamId);
  const tem = team?.team.find((tem) => tem.id === customTemId);
  const { data, isLoading, isError, isPaused } = useFetchTemQuery(
    tem?.name || ""
  );

  if (!data || isLoading || isError || isPaused) return <></>;
  if (!team || !tem) return <></>;

  const temData = data[0];

  return <div className="border border-red-500"></div>;
};
