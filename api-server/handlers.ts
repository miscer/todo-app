import { fetchList, fetchLists } from "./lists";
import {
  createListItem,
  deleteListItem,
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
  deleteListItem,
];
