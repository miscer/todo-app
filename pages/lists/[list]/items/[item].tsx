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
  const itemId = getRouteParam(router.query, "item");
  const { list } = useList(listId);
  const { item } = useListItem(listId, itemId);

  return (
    <>
      <Head>
        <title>{item?.title}</title>
      </Head>
      <AppLayout>
        <div className="px-4 border border-slate-400 rounded">
          <h2 className="my-4 font-bold text-xl" style={{ color: list?.color }}>
            <Link href={`/lists/${listId}`}>{list?.title}</Link>
          </h2>

          {item != null ? <ListItemForm item={item} /> : null}
        </div>
      </AppLayout>
    </>
  );
}
