import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

interface Props {
  listId: string;
  color: string;
  title: string;
}

export function ListLink(props: Props) {
  const router = useRouter();
  const { listId, title, color } = props;
  const href = `/lists/${listId}`;
  const active = router.asPath.startsWith(href);

  return (
    <Link
      href={href}
      className="flex gap-3 items-center p-2 hover:bg-slate-50 transition group"
    >
      <span
        className="block w-4 h-4 rounded-full group-hover:scale-110 transition"
        style={{ backgroundColor: color }}
      />

      <span className={clsx(active ? "font-bold" : null)}>{title}</span>
    </Link>
  );
}
