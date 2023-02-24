type SpecieParam = {
  teamId: string;
};

type Props = {
  params: SpecieParam;
};

export default function TeamPage({ params }: Props) {
  return (
    <div className="relative flex flex-col gap-8 min-h-full pb-8">
      Team {params.teamId}
    </div>
  );
}
