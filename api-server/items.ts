import { lists } from "@/api-server/lists";
import { Item } from "@/api-server/types";
import { v4 as uuid } from "uuid";
import { rest } from "msw";
import { z } from "zod";

const items: Item[] = [
  {
    id: uuid(),
    listId: lists[0].id,
    title: "Onions",
    dueAt: "2023-01-18T12:30:00Z",
    completedAt: null,
    notes: "Red ones, ideally",
    weight: 0,
  },
  {
    id: uuid(),
    listId: lists[0].id,
    title: "Potatoes",
    dueAt: null,
    completedAt: "2023-01-03T00:00:00Z",
    notes: "The largest you can find",
    weight: 1,
  },
  {
    id: uuid(),
    listId: lists[1].id,
    title: "Take out the bins",
    dueAt: null,
    completedAt: null,
    notes: "",
    weight: 0,
  },
  {
    id: uuid(),
    listId: lists[1].id,
    title: "Make an appointment with the doctor",
    dueAt: "2023-02-13T12:00:00Z",
    completedAt: null,
    notes: "",
    weight: 1,
  },
  {
    id: uuid(),
    listId: lists[1].id,
    title: "Submit tax return",
    dueAt: "2023-03-30T09:00:00Z",
    completedAt: null,
    notes: "Call the accountant first, I have no idea how it works...",
    weight: 2,
  },
];

export const fetchListItems = rest.get("/api/items", (req, res, ctx) => {
  const { searchParams: query } = req.url;

  const listItems = items.filter(
    (item) =>
      (query.has("list") ? item.listId === query.get("list") : true) &&
      (query.has("state") ? getItemState(item) === query.get("state") : true) &&
      (query.has("search") ? isSearchMatch(item, query.get("search")!) : true)
  );

  return res(ctx.status(200), ctx.json({ items: listItems }), ctx.delay(300));
});

export const fetchListItem = rest.get(
  "/api/items/:itemId",
  async (req, res, ctx) => {
    const { itemId } = req.params;
    if (typeof itemId !== "string") {
      throw new Error("Invalid item ID parameter");
    }

    const index = items.findIndex((item) => item.id === itemId);
    if (index < 0) {
      return res(ctx.status(404));
    }

    return res(ctx.status(200), ctx.json(items[index]), ctx.delay(300));
  }
);

export const createListItem = rest.post("/api/items", async (req, res, ctx) => {
  const data = await req.json();
  const attributes = listItemSchema.parse(data);

  const listItem = { id: uuid(), ...attributes };
  items.push(listItem);

  return res(ctx.status(201), ctx.json(listItem), ctx.delay(300));
});

export const updateListItem = rest.put(
  "/api/items/:itemId",
  async (req, res, ctx) => {
    const { itemId } = req.params;
    if (typeof itemId !== "string") {
      throw new Error("Invalid item ID parameter");
    }

    const data = await req.json();
    const attributes = listItemSchema.partial().parse(data);

    const index = items.findIndex((item) => item.id === itemId);
    if (index < 0) {
      return res(ctx.status(404));
    }

    items[index] = { ...items[index], ...attributes };

    return res(ctx.status(200), ctx.json(items[index]), ctx.delay(300));
  }
);

export const deleteListItem = rest.delete(
  "/api/items/:itemId",
  async (req, res, ctx) => {
    const { itemId } = req.params;
    if (typeof itemId !== "string") {
      throw new Error("Invalid item ID parameter");
    }

    const index = items.findIndex((item) => item.id === itemId);
    if (index < 0) {
      return res(ctx.status(404));
    }

    items.splice(index, 1);

    return res(ctx.status(200), ctx.delay(300));
  }
);

function getItemState(item: Item) {
  if (item.completedAt != null) {
    return "completed";
  } else {
    return "pending";
  }
}

function isSearchMatch(item: Item, query: string): boolean {
  if (item.title.toLowerCase().includes(query.toLowerCase())) return true;
  if (item.notes.toLowerCase().includes(query.toLowerCase())) return true;
  return false;
}

const listItemSchema = z.object({
  listId: z.string(),
  title: z.string(),
  dueAt: z.string().datetime().nullable(),
  completedAt: z.string().datetime().nullable(),
  notes: z.string(),
  weight: z.number(),
});
