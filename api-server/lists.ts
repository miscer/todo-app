import { rest } from "msw";
import { List } from "./types";
import { v4 as uuid } from "uuid";
import z from "zod";

const lists: List[] = [
  {
    id: "1",
    title: "Shopping",
    color: "#ffa200",
  },
  {
    id: "2",
    title: "Work",
    color: "#a20000",
  },
];

export const fetchLists = rest.get("/api/lists", (req, res, ctx) => {
  return res(ctx.status(200), ctx.json({ lists }));
});

export const createList = rest.post("/api/lists", async (req, res, ctx) => {
  const data = await req.json();
  const attributes = listSchema.parse(data);

  const list = { id: uuid(), ...attributes };
  lists.push(list);

  return res(ctx.status(201), ctx.json(list));
});

export const fetchList = rest.get("/api/lists/:listId", (req, res, ctx) => {
  const list = lists.find((list) => list.id === req.params.listId);

  if (list == null) {
    return res(ctx.status(404));
  }

  return res(ctx.status(200), ctx.json(list));
});

const listSchema = z.object({
  title: z.string().min(1),
  color: z.string(),
});
