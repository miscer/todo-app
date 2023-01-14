import useSWR from "swr";
import { Item } from "@/api-server/types";
import {
  createDeleteFetcher,
  createReadFetcher,
  createUpdateFetcher,
} from "./fetchers";
import useSWRMutation from "swr/mutation";
import { useCallback } from "react";

export function useListItems(listId: string | null) {
  const query = new URLSearchParams();
  query.set("list", listId ?? "x");

  const { data, error, isLoading } = useSWR<{ items: Item[] }>(
    ["lists", listId, "items"],
    createReadFetcher(`/api/items?${query}`)
  );

  return { items: data?.items, error, isLoading };
}

export function useListItem(listId: string | null, itemId: string | null) {
  const { data, error, isLoading } = useSWR<Item>(
    ["lists", listId, "items", itemId],
    createReadFetcher(`/api/items/${itemId}`)
  );

  return { item: data, error, isLoading };
}

export function useCreateListItem(listId: string | null) {
  const { trigger, error, isMutating } = useSWRMutation(
    ["lists", listId, "items"],
    createUpdateFetcher(`/api/items`, "POST")
  );

  return { create: trigger, error, isLoading: isMutating };
}

export function useUpdateListItem(listId: string, itemId: string) {
  const { trigger, error, isMutating } = useSWRMutation(
    ["lists", listId, "items", itemId],
    createUpdateFetcher(`/api/items/${itemId}`, "PUT")
  );

  return { update: trigger, error, isLoading: isMutating };
}

export function useDeleteListItem(listId: string, itemId: string) {
  const { trigger, error, isMutating } = useSWRMutation(
    ["lists", listId, "items"],
    createDeleteFetcher(`/api/items/${itemId}`)
  );

  return [trigger, { error, isLoading: isMutating }] as const;
}

export function useMarkListItemDone(listId: string, itemId: string) {
  const { trigger, error, isMutating } = useSWRMutation(
    ["lists", listId, "items"],
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
