import { ListLink } from "@/components/list-selector/list-link";
import { useLists } from "@/hooks/api/lists";

export function ListSelector() {
  const [lists] = useLists();

  return (
    <ul className="border border-slate-400 rounded divide-y divide-slate-400">
      {lists?.map((list) => (
        <li key={list.id}>
          <ListLink listId={list.id} color={list.color} title={list.title} />
        </li>
      ))}
    </ul>
  );
}
