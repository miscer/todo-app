import Head from "next/head";
import { AppLayout } from "@/components/app-layout/app-layout";
import useSWR from "swr";
import { fetchList } from "@/api-client";
import { useRouter } from "next/router";
import { getRouteParam } from "../../utils/router";
import { ListItems } from "@/components/list-items/list-items";

export default function ListDetail() {
  const router = useRouter();
  const listId = getRouteParam(router.query, "list");

  const { data } = useSWR(["lists", listId], () =>
    listId != null ? fetchList(listId) : null
  );

  return (
    <>
      <Head>
        <title>{data?.title}</title>
      </Head>
      <AppLayout>
        <div className="px-4 border border-slate-400 rounded">
          <h2 className="my-4 font-bold text-xl" style={{ color: data?.color }}>
            {data?.title}
          </h2>

          {listId != null ? <ListItems listId={listId} /> : null}
        </div>
      </AppLayout>
    </>
  );
}
