import { useMemo } from "react";
import { ListItem } from "@/components/list-items/list-item";
import { AddItem } from "@/components/list-items/add-item";
import { useListItems } from "@/hooks/api/items";

interface Props {
  listId: string;
}

export function ListItems(props: Props) {
  const { listId } = props;
  const { items } = useListItems(listId);

  const sorted = useMemo(
    () => (items ? [...items].sort((a, b) => a.weight - b.weight) : null),
    [items]
  );

  const nextWeight = items
    ? Math.max(...items.map((item) => item.weight)) + 1
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
