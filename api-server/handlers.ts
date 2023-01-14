import { fetchList, fetchLists } from "./lists";
import {
  createListItem,
  fetchListItem,
  fetchListItems,
  updateListItem,
} from "./items";

export const handlers = [
  fetchLists,
  fetchList,
  fetchListItems,
  fetchListItem,
  createListItem,
  updateListItem,
];
