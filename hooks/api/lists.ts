import { useQuery } from "@tanstack/react-query";
import { List } from "@/api-server/types";
import { createReadFetcher } from "./fetchers";

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
