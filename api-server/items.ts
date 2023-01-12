import { Item } from "@/api-server/types";
import { rest } from "msw";

const items: Item[] = [
  {
    id: "1",
    listId: "1",
    title: "Onions",
    dueAt: "2023-01-18T12:30:00Z",
    completedAt: null,
    notes: "Red ones, ideally",
    weight: 0,
  },
  {
    id: "2",
    listId: "1",
    title: "Potatoes",
    dueAt: null,
    completedAt: "2023-01-03T00:00:00Z",
    notes: "The largest you can find",
    weight: 1,
  },
];

export const fetchListItems = rest.get(
  "/api/lists/:listId/items",
  (req, res, ctx) => {
    const listItems = items.filter((item) => item.listId === req.params.listId);
    return res(ctx.status(200), ctx.json({ items: listItems }));
  }
);
