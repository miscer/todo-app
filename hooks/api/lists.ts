import { List } from "@/api-server/types";
import useSWR from "swr";
import { apiFetcher } from "./fetchers";

export function useLists() {
  const { data, error, isLoading } = useSWR<{ lists: List[] }>(
    "lists",
    apiFetcher
  );

  return { lists: data?.lists, error, isLoading };
}

export function useList(listId: string | null) {
  const { data, error, isLoading } = useSWR<List>(
    `lists/${listId}`,
    apiFetcher
  );

  return { list: data, error, isLoading };
}
