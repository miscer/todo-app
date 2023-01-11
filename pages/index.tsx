import Head from "next/head";
import { AppLayout } from "@/components/app-layout/app-layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo app</title>
      </Head>
      <AppLayout />
    </>
  );
}
