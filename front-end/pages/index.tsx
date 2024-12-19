import Head from "next/head";
import styles from "@/styles/home.module.css";
import NavigationBar from "@/components/utils/header";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <div className={`${styles.container}`}>
        <Head>
          <title>{t("homepage.title")}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="min-h-screen flex flex-col items-center mt-10 text-white">
          <div className="flex flex-row mt-10 p-5 text-center xsm:text-left">
            <img
              src="/rootz3.png"
              className="h-[13rem] p-1 hidden xsm:flex"
              alt=""
            />
            <div className="w-[0.5px] xsm:flex hidden bg-white bg-opacity-80 ml-5 mr-8 rounded-md"></div>
            <div className="max-w-[35rem] my-auto">
              <h1 className="text-2xl font-bold">Welcome to Rootz</h1>
              <p className="text-white mt-2">{t("homepage.home_tekst")}</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
