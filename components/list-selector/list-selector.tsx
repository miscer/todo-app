import { ListLink } from "@/components/list-selector/list-link";
import { useLists } from "@/hooks/api/lists";
import { AddList } from "@/components/list-selector/add-list";

export function ListSelector() {
  const [lists] = useLists();

  return (
    <div className="flex flex-col gap-4">
      <ul className="border border-slate-400 rounded divide-y divide-slate-400 overflow-hidden">
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
