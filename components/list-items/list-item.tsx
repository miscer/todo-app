import { Item } from "@/api-server/types";
import clsx from "clsx";
import { DeadlineIcon, NotesIcon } from "@/components/list-items/icons";
import { useMarkListItemDone } from "@/hooks/api/items";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  item: Item;
}

export function ListItem(props: Props) {
  const { item } = props;
  const router = useRouter();
  const { setDone } = useMarkListItemDone(item.listId, item.id);
  const completed = item.completedAt != null;
  const notes = item.notes.trim().length > 0;
  const deadline = item.dueAt ? new Date(item.dueAt) : null;
  const href = `/lists/${item.listId}/items/${item.id}`;

  return (
    <li
      key={item.id}
      className="py-2 flex items-center cursor-pointer"
      onClick={() => {
        router.push(href);
      }}
    >
      <input
        type="checkbox"
        checked={completed}
        className="mr-2"
        onClick={(event) => event.stopPropagation()}
        onChange={(event) => {
          setDone(event.target.checked);
        }}
      />

      <Link
        className={clsx(
          "mr-2",
          completed ? "line-through text-gray-400" : null
        )}
        href={href}
      >
        {item.title}
      </Link>

      {notes ? (
        <span className="text-gray-400">
          <NotesIcon />
        </span>
      ) : null}

      <span className="mr-auto" />

      {deadline ? (
        <span className="flex gap-1 items-center text-gray-400">
          <DeadlineIcon />
          <span className="text-sm">{deadlineFormat.format(deadline)}</span>
        </span>
      ) : null}
    </li>
  );
}

const deadlineFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "short",
  timeStyle: "short",
});
