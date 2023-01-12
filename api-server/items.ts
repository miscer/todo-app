import { Item } from "@/api-server/types";
import { v4 as uuid } from "uuid";
import { rest } from "msw";
import { z } from "zod";

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

export const createListItem = rest.post(
  "/api/lists/:listId/items",
  async (req, res, ctx) => {
    const { listId } = req.params;

    if (typeof listId !== "string") {
      throw new Error("Invalid list ID parameter");
    }

    const data = await req.json();
    const attributes = listItemSchema.parse(data);

    const listItem = { id: uuid(), listId, ...attributes };
    items.push(listItem);

    return res(ctx.status(201), ctx.json(listItem));
  }
);

const listItemSchema = z.object({
  title: z.string(),
  dueAt: z.string().datetime().nullable(),
  completedAt: z.string().datetime().nullable(),
  notes: z.string(),
  weight: z.number(),
});
