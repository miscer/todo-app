import useSWR from "swr";
import { ListLink } from "@/components/list-selector/list-link";
import { apiFetcher } from "../../api-client/fetchers";
import { List } from "@/api-server/types";

export function ListSelector() {
  const { data } = useSWR<{ lists: List[] }>("lists", apiFetcher);

  return (
    <ul className="border border-slate-400 rounded divide-y divide-slate-400">
      {data?.lists.map((list) => (
        <li key={list.id}>
          <ListLink listId={list.id} color={list.color} title={list.title} />
        </li>
      ))}
    </ul>
  );
}
