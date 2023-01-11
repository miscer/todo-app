import useSWR from "swr";
import { fetchLists } from "@/api-client";

export function ListSelector() {
  const { data: lists } = useSWR("lists", fetchLists);

  return (
    <ul>
      {lists?.map((list) => (
        <li key={list.id}>{list.title}</li>
      ))}
    </ul>
  );
}
