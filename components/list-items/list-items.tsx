import { useMemo } from "react";
import { ListItem } from "@/components/list-items/list-item";
import { AddItem } from "@/components/list-items/add-item";
import { useListItems } from "@/hooks/api/items";

interface Props {
  listId: string;
  state: string | null;
  search: string | null;
}

export function ListItems(props: Props) {
  const { listId, state, search } = props;

  const params = useMemo(
    () => ({ listId, state: state ?? undefined, search: search ?? undefined }),
    [listId, state, search]
  );

  const [items, { isLoading }] = useListItems(params);

  const sorted = useMemo(
    () => (items ? [...items].sort((a, b) => a.weight - b.weight) : null),
    [items]
  );

  const nextWeight =
    items != null && items.length > 0
      ? Math.max(...items.map((item) => item.weight)) + 1
      : 0;

  return (
    <div>
      <ul className="divide-y divide-slate-200 border-b border-slate-200">
        {isLoading ? (
          <>
            <li className="py-2">
              <div className="h-6 bg-slate-200 rounded-full w-64 animate-pulse" />
            </li>
            <li className="py-2">
              <div className="h-6 bg-slate-200 rounded-full w-52 animate-pulse" />
            </li>
            <li className="py-2">
              <div className="h-6 bg-slate-200 rounded-full w-72 animate-pulse" />
            </li>
          </>
        ) : null}

        {!isLoading && items?.length === 0 ? (
          <li className="py-2">
            <div className="italic text-gray-400">Nothing to see here...</div>
          </li>
        ) : null}

        {sorted?.map((item) => (
          <ListItem key={item.id} params={params} item={item} />
        ))}
      </ul>

      <AddItem listId={listId} weight={nextWeight} />
    </div>
  );
}
