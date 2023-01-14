import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { Item } from "@/api-server/types";
import {
  createDeleteFetcher,
  createReadFetcher,
  createUpdateFetcher,
} from "./fetchers";

export function useListItems(listId: string) {
  const query = new URLSearchParams();
  query.set("list", listId);

  const { data, error, isLoading } = useQuery<{ items: Item[] }>({
    queryKey: ["items", listId],
    queryFn: createReadFetcher(`/api/items?${query}`),
  });

  return [data?.items, { error, isLoading }] as const;
}

export function useListItem(listId: string, itemId: string) {
  const { data, error, isLoading } = useQuery<Item>({
    queryKey: ["item", itemId],
    queryFn: createReadFetcher(`/api/items/${itemId}`),
  });

  return [data, { error, isLoading }] as const;
}

type Attributes = Omit<Item, "id">;

export function useCreateListItem(listId: string) {
  const queryClient = useQueryClient();

  const { mutate, error, isLoading } = useMutation<
    unknown,
    unknown,
    Attributes
  >({
    mutationFn: createUpdateFetcher(`/api/items`, "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items", listId] });
    },
  });

  return [mutate, { error, isLoading }] as const;
}

export function useUpdateListItem(listId: string, itemId: string) {
  const queryClient = useQueryClient();

  const { mutate, error, isLoading } = useMutation<
    Item,
    unknown,
    Partial<Attributes>
  >({
    mutationFn: createUpdateFetcher(`/api/items/${itemId}`, "PUT"),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.setQueryData(["item", itemId], data);
    },
  });

  return [mutate, { error, isLoading }] as const;
}

export function useDeleteListItem(listId: string, itemId: string) {
  const queryClient = useQueryClient();

  const { mutate, error, isLoading } = useMutation({
    mutationFn: createDeleteFetcher(`/api/items/${itemId}`),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  return [mutate, { error, isLoading }] as const;
}

export function useMarkListItemDone(listId: string, itemId: string) {
  const queryClient = useQueryClient();

  const { mutate, error, isLoading } = useMutation({
    mutationFn: createUpdateFetcher(`/api/items/${itemId}`, "PUT"),
    onMutate(attributes) {
      queryClient.setQueryData<{ items: Item[] }>(
        ["items", listId],
        function (data) {
          if (data == null) return undefined;

          const items = data.items.map((item) =>
            item.id === itemId ? { ...item, ...attributes } : item
          );

          return { ...data, items };
        }
      );
    },
    onSettled() {
      queryClient.invalidateQueries(["items", listId]);
    },
  });

  const setDone = useCallback(
    (done: boolean) => {
      const completedAt = done ? new Date().toISOString() : null;
      return mutate({ completedAt });
    },
    [mutate]
  );

  return [setDone, { error, isLoading }] as const;
}
