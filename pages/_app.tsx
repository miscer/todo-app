import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../api/setup";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
