import useSWR from "swr";
import { Item } from "@/api-server/types";
import { apiFetcher, createUpdateFetcher } from "./fetchers";
import useSWRMutation from "swr/mutation";
import { useCallback } from "react";

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
    createUpdateFetcher(`/api/lists/${listId}/items`, "POST")
  );

  return { create: trigger, error, isLoading: isMutating };
}

export function useMarkListItemDone(listId: string, itemId: string) {
  const { trigger, error, isMutating } = useSWRMutation(
    `lists/${listId}/items`,
    createUpdateFetcher(`/api/items/${itemId}`, "PUT")
  );

  const setDone = useCallback(
    (done: boolean) => {
      const completedAt = done ? new Date().toISOString() : null;

      function optimisticData(data: { items: Item[] }) {
        const items = data.items.map((item) =>
          item.id === itemId ? { ...item, completedAt } : item
        );

        return { ...data, items };
      }

      return trigger({ completedAt }, { optimisticData });
    },
    [trigger, itemId]
  );

  return { setDone, error, isLoading: isMutating };
}
