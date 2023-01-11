import Head from "next/head";
import { ListSelector } from "@/components/list-selector/list-selector";

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo app</title>
      </Head>
      <ListSelector />
    </>
  );
}
