import { ListLink } from "@/components/list-selector/list-link";
import { useLists } from "@/hooks/api/lists";
import { AddList } from "@/components/list-selector/add-list";

export function ListSelector() {
  const [lists, { isLoading }] = useLists();

  return (
    <div className="flex flex-col gap-4">
      <ul className="border border-slate-400 rounded divide-y divide-slate-400 overflow-hidden">
        {isLoading ? (
          <>
            <li className="p-2">
              <div className="h-6 bg-slate-200 rounded-full w-1/2 animate-pulse" />
            </li>
            <li className="p-2">
              <div className="h-6 bg-slate-200 rounded-full w-3/4 animate-pulse" />
            </li>
          </>
        ) : null}

        {lists?.map((list) => (
          <li key={list.id}>
            <ListLink listId={list.id} color={list.color} title={list.title} />
          </li>
        ))}
      </ul>
      <AddList />
    </div>
  );
}
