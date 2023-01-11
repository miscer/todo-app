import type { AppProps } from "next/app";
import "../styles/globals.css";
import "@/api-server/setup";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
