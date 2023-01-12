import { ParsedUrlQuery } from "querystring";

export function getRouteParam(
  query: ParsedUrlQuery,
  name: string
): string | null {
  const value = query[name];
  return typeof value === "string" ? value : null;
}
