import useSWR from "swr";
import { List } from "../api/types";

async function fetchLists() {
  const response = await fetch("/api/lists");
  const data = await response.json();
  return data.lists as List[];
}

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
