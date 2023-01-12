import Head from "next/head";
import { AppLayout } from "@/components/app-layout/app-layout";
import { useRouter } from "next/router";
import { getRouteParam } from "../../utils/router";
import { ListItems } from "@/components/list-items/list-items";
import { useList } from "@/hooks/api/lists";

export default function ListDetail() {
  const router = useRouter();
  const listId = getRouteParam(router.query, "list");
  const { list } = useList(listId);

  return (
    <>
      <Head>
        <title>{list?.title}</title>
      </Head>
      <AppLayout>
        <div className="px-4 border border-slate-400 rounded">
          <h2 className="my-4 font-bold text-xl" style={{ color: list?.color }}>
            {list?.title}
          </h2>

          {listId != null ? <ListItems listId={listId} /> : null}
        </div>
      </AppLayout>
    </>
  );
}
