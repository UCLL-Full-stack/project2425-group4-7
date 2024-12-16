import Header from "@/components/utils/header";
import Notifications from "@/components/utils/notifications";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { useEffect, useState } from "react";

function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
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
