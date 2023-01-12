import { Item } from "@/api-server/types";

export async function fetchListItems(listId: string) {
  const response = await fetch(`/api/lists/${listId}/items`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch list items, got response ${response.status}`
    );
  }

  const data = await response.json();
  return data.items as Item[];
}
