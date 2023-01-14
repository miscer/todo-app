import { List } from "@/api-server/types";
import useSWR from "swr";
import { createReadFetcher } from "./fetchers";

export function useLists() {
  const { data, error, isLoading } = useSWR<{ lists: List[] }>(
    ["lists"],
    createReadFetcher("/api/lists")
  );

  return [data?.lists, { error, isLoading }] as const;
}

export function useList(listId: string) {
  const { data, error, isLoading } = useSWR<List>(
    ["lists", listId],
    createReadFetcher(`/api/lists/${listId}`)
  );

  return [data, { error, isLoading }] as const;
}
