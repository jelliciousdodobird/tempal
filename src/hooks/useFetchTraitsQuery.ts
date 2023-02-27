import { useQuery } from "@tanstack/react-query";
import { fetchTraits } from "../utils/fetch-traits";

export const useFetchTraitsQuery = (
  name: string,
  staleTime = 60 * 60 * 1000
) => {
  const enableQuery = name !== "";

  const query = useQuery({
    queryKey: ["fetchTraits", name],
    queryFn: () => fetchTraits({ names: [name] }),
    enabled: enableQuery,
    staleTime,
  });

  return query;
};

export const useFetchAllTraitsQuery = (staleTime = 60 * 60 * 1000) => {
  const query = useQuery({
    queryKey: ["fetchAllTraits"],
    queryFn: () => fetchTraits(),
    staleTime,
  });

  return query;
};
