import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { List } from "@/utils/types";
import { createReadFetcher, createUpdateFetcher } from "./fetchers";

export function useLists() {
  const { data, error, isLoading } = useQuery<{ lists: List[] }>({
    queryKey: ["lists"],
    queryFn: createReadFetcher("/api/lists"),
  });

  return [data?.lists, { error, isLoading }] as const;
}

export function useList(listId: string) {
  const { data, error, isLoading } = useQuery<List>({
    queryKey: ["lists", listId],
    queryFn: createReadFetcher(`/api/lists/${listId}`),
  });

  return [data, { error, isLoading }] as const;
}

interface Attributes {
  color: string;
  title: string;
}

export function useCreateList() {
  const queryClient = useQueryClient();

  const { mutate, error, isLoading } = useMutation<
    unknown,
    unknown,
    Attributes
  >({
    mutationFn: createUpdateFetcher(`/api/lists`, "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });

  return [mutate, { error, isLoading }] as const;
}
