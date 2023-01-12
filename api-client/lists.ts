import { List } from "@/api-server/types";

export async function fetchLists() {
  const response = await fetch("/api/lists");

  if (!response.ok) {
    throw new Error(`Failed to fetch lists, got response ${response.status}`);
  }

  const data = await response.json();
  return data.lists as List[];
}

export async function fetchList(listId: string) {
  const response = await fetch(`/api/lists/${listId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch list, got response ${response.status}`);
  }

  const data = await response.json();
  return data as List;
}
