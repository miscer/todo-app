import { fetchList, fetchLists } from "./lists";
import { createListItem, fetchListItems, updateListItem } from "./items";

export const handlers = [
  fetchLists,
  fetchList,
  fetchListItems,
  createListItem,
  updateListItem,
];
