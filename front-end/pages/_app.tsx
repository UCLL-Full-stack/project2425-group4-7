import Header from "@/components/utils/header";
import Notifications from "@/components/utils/notifications";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Notifications>
        <Header></Header>
        <Component {...pageProps} />
      </Notifications>
    </>
  );
}

export default appWithTranslation(App);
