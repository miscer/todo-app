import { rest } from "msw";
import { List } from "./types";
import { v4 as uuid } from "uuid";
import z from "zod";

export const lists: List[] = [
  {
    id: uuid(),
    title: "Shopping",
    color: "#ffa200",
  },
  {
    id: uuid(),
    title: "Personal",
    color: "#00cc2f",
  },
  {
    id: uuid(),
    title: "Work",
    color: "#a20000",
  },
];

export const fetchLists = rest.get("/api/lists", (req, res, ctx) => {
  return res(ctx.status(200), ctx.json({ lists }), ctx.delay(300));
});

export const createList = rest.post("/api/lists", async (req, res, ctx) => {
  const data = await req.json();
  const attributes = listSchema.parse(data);

  const list = { id: uuid(), ...attributes };
  lists.push(list);

  return res(ctx.status(201), ctx.json(list), ctx.delay(300));
});

export const fetchList = rest.get("/api/lists/:listId", (req, res, ctx) => {
  const list = lists.find((list) => list.id === req.params.listId);

  if (list == null) {
    return res(ctx.status(404));
  }

  return res(ctx.status(200), ctx.json(list), ctx.delay(200));
});

const listSchema = z.object({
  title: z.string().min(1),
  color: z.string(),
});
