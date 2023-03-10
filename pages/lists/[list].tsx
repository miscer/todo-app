import Head from "next/head";
import { AppLayout } from "@/components/app-layout/app-layout";
import { useRouter } from "next/router";
import { getRouteParam } from "@/utils/router";
import { ListItems } from "@/components/list-items/list-items";
import { useList } from "@/hooks/api/lists";
import { ListFilter } from "@/components/list-filter/list-filter";

export default function ListDetail() {
  const router = useRouter();
  const listId = getRouteParam(router.query, "list");
  if (listId == null) return null;

  const state = getRouteParam(router.query, "state");
  const search = getRouteParam(router.query, "search");

  return <Content listId={listId} state={state} search={search} />;
}

interface Props {
  listId: string;
  state: string | null;
  search: string | null;
}

function Content(props: Props) {
  const { listId, state, search } = props;
  const [list, { isLoading }] = useList(listId);

  return (
    <>
      <Head>
        <title>{list?.title}</title>
      </Head>
      <AppLayout>
        <div className="px-4 border border-slate-400 rounded">
          <div className="my-4">
            {isLoading ? (
              <div className="h-7 bg-slate-200 rounded-full w-1/2 animate-pulse" />
            ) : (
              <h2 className="font-bold text-xl" style={{ color: list?.color }}>
                {list?.title}
              </h2>
            )}
          </div>

          <div className="mb-4">
            <ListFilter />
          </div>

          <ListItems listId={listId} state={state} search={search} />
        </div>
      </AppLayout>
    </>
  );
}
