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

  return <Content listId={listId} state={state} />;
}

interface Props {
  listId: string;
  state: string | null;
}

function Content(props: Props) {
  const { listId, state } = props;
  const [list] = useList(listId);

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

          <div className="mb-4">
            <ListFilter />
          </div>

          <ListItems listId={listId} state={state} />
        </div>
      </AppLayout>
    </>
  );
}
