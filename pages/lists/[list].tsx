import Head from "next/head";
import { AppLayout } from "@/components/app-layout/app-layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import { getRouteParam } from "../../utils/router";
import { ListItems } from "@/components/list-items/list-items";
import { apiFetcher } from "../../api-client/fetchers";
import { List } from "@/api-server/types";

export default function ListDetail() {
  const router = useRouter();
  const listId = getRouteParam(router.query, "list");
  const { data } = useSWR<List>(`lists/${listId}`, apiFetcher);

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
