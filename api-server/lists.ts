import { rest } from "msw";
import { List } from "./types";

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

export const fetchList = rest.get("/api/lists/:listId", (req, res, ctx) => {
  const list = lists.find((list) => list.id === req.params.listId);

  if (list == null) {
    return res(ctx.status(404));
  }

  return res(ctx.status(200), ctx.json(list));
});
