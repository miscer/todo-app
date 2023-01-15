import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

interface Props {
  state: "completed" | "pending" | null;
  children?: ReactNode;
}

export function ItemStateLink(props: Props) {
  const { state, children } = props;
  const active = useActive(state);
  const href = useLinkHref(state);

  return (
    <Link
      className={clsx(
        "px-2 py-1 rounded transition",
        active ? "bg-slate-200" : "bg-white hover:bg-slate-100"
      )}
      href={href}
    >
      {children}
    </Link>
  );
}

function useActive(state: string | null) {
  const router = useRouter();
  return state != null ? router.query.state === state : !router.query.state;
}

function useLinkHref(state: string | null) {
  const router = useRouter();

  const { state: _, ...rest } = router.query;

  return {
    pathname: router.pathname,
    query: state ? { ...rest, state } : rest,
  };
}
