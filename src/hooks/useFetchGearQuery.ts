import { useQuery } from "@tanstack/react-query";
import { fetchGears } from "../utils/fetch-gears";

export const useFetchAllGears = (staleTime = 60 * 60 * 1000) => {
  const query = useQuery({
    queryKey: ["fetchAllGears"],
    queryFn: () => fetchGears(),
    staleTime,
  });

  return query;
};
