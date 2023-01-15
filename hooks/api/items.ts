import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { Item } from "@/api-server/types";
import {
  createDeleteFetcher,
  createReadFetcher,
  createUpdateFetcher,
} from "./fetchers";

export interface ListItemParams {
  listId?: string;
}

export function useListItems(params: ListItemParams) {
  const query = new URLSearchParams();
  if (params.listId != null) query.set("list", params.listId);

  const { data, error, isLoading } = useQuery<{ items: Item[] }>({
    queryKey: ["items", params],
    queryFn: createReadFetcher(`/api/items?${query}`),
  });

  return [data?.items, { error, isLoading }] as const;
}

export function useListItem(itemId: string) {
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

export function useUpdateListItem(itemId: string) {
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

export function useDeleteListItem(itemId: string) {
  const queryClient = useQueryClient();

  const { mutate, error, isLoading } = useMutation({
    mutationFn: createDeleteFetcher(`/api/items/${itemId}`),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  return [mutate, { error, isLoading }] as const;
}

export function useMarkListItemDone(params: ListItemParams, itemId: string) {
  const queryClient = useQueryClient();

  const { mutate, error, isLoading } = useMutation({
    mutationFn: createUpdateFetcher(`/api/items/${itemId}`, "PUT"),
    onMutate(attributes) {
      queryClient.setQueryData<{ items: Item[] }>(
        ["items", params],
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
      queryClient.invalidateQueries(["items", params]);
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
