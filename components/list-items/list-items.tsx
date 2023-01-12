import useSWR from "swr";
import { fetchListItems } from "@/api-client";
import { useMemo } from "react";
import { ListItem } from "@/components/list-items/list-item";

interface Props {
  listId: string;
}

export function ListItems(props: Props) {
  const { listId } = props;

  const { data: items } = useSWR(["lists", listId, "items"], () =>
    fetchListItems(listId)
  );

  const sorted = useMemo(
    () => (items ? [...items].sort((a, b) => a.weight - b.weight) : null),
    [items]
  );

  return (
    <div>
      <ul className="divide-y divide-slate-200">
        {sorted?.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}
