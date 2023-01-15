import Head from "next/head";
import { AppLayout } from "@/components/app-layout/app-layout";
import { useRouter } from "next/router";
import { getRouteParam } from "@/utils/router";
import { useListItem } from "@/hooks/api/items";
import { useList } from "@/hooks/api/lists";
import { ListItemForm } from "@/components/list-item-form/list-item-form";
import Link from "next/link";

export default function ListDetail() {
  const router = useRouter();

  const listId = getRouteParam(router.query, "list");
  if (listId == null) return null;

  const itemId = getRouteParam(router.query, "item");
  if (itemId == null) return null;

  return <Content listId={listId} itemId={itemId} />;
}

interface Props {
  listId: string;
  itemId: string;
}

function Content(props: Props) {
  const [list, { isLoading: isLoadingList }] = useList(props.listId);
  const [item, { isLoading: isLoadingItem }] = useListItem(props.itemId);

  return (
    <>
      <Head>
        <title>{item?.title}</title>
      </Head>
      <AppLayout>
        <div className="px-4 border border-slate-400 rounded">
          <div className="my-4">
            {isLoadingList ? (
              <div className="h-7 bg-slate-200 rounded-full w-1/2 animate-pulse" />
            ) : (
              <h2 className="font-bold text-xl" style={{ color: list?.color }}>
                <Link href={`/lists/${props.listId}`}>{list?.title}</Link>
              </h2>
            )}
          </div>

          {isLoadingItem ? (
            <div className="flex flex-col gap-4 pb-4 w-full max-w-sm">
              <div className="h-7 bg-slate-200 rounded-full w-full animate-pulse" />
              <div className="h-6 bg-slate-200 rounded-full w-64 animate-pulse" />
              <div className="h-14 bg-slate-200 rounded-full w-full animate-pulse" />
            </div>
          ) : null}

          {item != null ? <ListItemForm item={item} /> : null}
        </div>
      </AppLayout>
    </>
  );
}
