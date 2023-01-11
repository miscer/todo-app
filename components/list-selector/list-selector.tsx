import useSWR from "swr";
import { fetchLists } from "@/api-client";
import { ListLink } from "@/components/list-selector/list-link";

export function ListSelector() {
  const { data: lists } = useSWR("lists", fetchLists);

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
