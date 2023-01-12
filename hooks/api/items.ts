import useSWR from "swr";
import { Item } from "@/api-server/types";
import { apiFetcher, createFetcher } from "./fetchers";
import useSWRMutation from "swr/mutation";

export function useListItems(listId: string | null) {
  const { data, error, isLoading } = useSWR<{ items: Item[] }>(
    `lists/${listId}/items`,
    apiFetcher
  );

  return { items: data?.items, error, isLoading };
}

export function useCreateListItem(listId: string | null) {
  const { trigger, error, isMutating } = useSWRMutation(
    `lists/${listId}/items`,
    createFetcher
  );

  return { createListItem: trigger, error, isLoading: isMutating };
}
