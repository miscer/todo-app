import { List } from "@/api-server/types";
import useSWR from "swr";
import { createReadFetcher } from "./fetchers";

export function useLists() {
  const { data, error, isLoading } = useSWR<{ lists: List[] }>(
    ["lists"],
    createReadFetcher("/api/lists")
  );

  return { lists: data?.lists, error, isLoading };
}

export function useList(listId: string) {
  const { data, error, isLoading } = useSWR<List>(
    ["lists", listId],
    createReadFetcher(`/api/lists/${listId}`)
  );

  return { list: data, error, isLoading };
}
