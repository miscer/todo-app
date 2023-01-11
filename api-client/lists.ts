import { List } from "@/api-server/types";

export async function fetchLists() {
  const response = await fetch("/api/lists");

  if (!response.ok) {
    throw new Error(`Failed to fetch lists, got response ${response.status}`);
  }

  const data = await response.json();
  return data.lists as List[];
}
