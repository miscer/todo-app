import { fetchList, fetchLists } from "./lists";
import { createListItem, fetchListItems } from "./items";

export const handlers = [fetchLists, fetchList, fetchListItems, createListItem];
