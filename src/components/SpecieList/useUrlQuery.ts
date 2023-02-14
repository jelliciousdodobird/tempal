import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DirtyQuery, SearchQuery } from "./SpecieList.types";
import {
  cleanQuery,
  default_query,
  getMinimalQuery,
  getMinimalQueryString,
  getQuery,
  // getQueryFromUrlParams,
  minimalQueryToUrl,
} from "./SpecieList.utils";

export type UrlOption = {
  href?: string;
  query?: Partial<SearchQuery>;
  updateType?: "push" | "replace";
};

export const default_url_options: UrlOption = {
  href: "",
  query: {},
};

export const useUrlQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const query = getQuery(params);
  const minimalQuery = getMinimalQuery(query);
  const minimalQueryUrl = minimalQueryToUrl(minimalQuery);

  const updateQueryUrl = (options: UrlOption) => {
    const optQuery = options.query ?? {};
    const optHref = options.href ?? pathname ?? "";
    const optUpdateType = options.updateType ?? "push";

    const searchQuery = cleanQuery({ ...query, ...optQuery });
    const minQuery = getMinimalQueryString(searchQuery);

    if (optUpdateType === "push") router.push(optHref + minQuery);
    else if (optUpdateType === "replace") router.replace(optHref + minQuery);
  };

  return { query, minimalQuery, minimalQueryUrl, updateQueryUrl };
};
