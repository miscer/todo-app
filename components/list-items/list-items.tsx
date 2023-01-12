import useSWR from "swr";
import { useMemo } from "react";
import { ListItem } from "@/components/list-items/list-item";
import { AddItem } from "@/components/list-items/add-item";
import { apiFetcher } from "../../api-client/fetchers";
import { Item } from "@/api-server/types";

interface Props {
  listId: string;
}

export function ListItems(props: Props) {
  const { listId } = props;

  const { data } = useSWR<{ items: Item[] }>(
    `lists/${listId}/items`,
    apiFetcher
  );

  const sorted = useMemo(
    () =>
      data?.items ? [...data.items].sort((a, b) => a.weight - b.weight) : null,
    [data?.items]
  );

  const nextWeight = data?.items
    ? Math.max(...data.items.map((item) => item.weight)) + 1
    : 0;

  return (
    <div>
      <ul className="divide-y divide-slate-200 border-b border-slate-200">
        {sorted?.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </ul>

      <AddItem listId={listId} weight={nextWeight} />
    </div>
  );
}
