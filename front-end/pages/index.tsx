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
        <main className={`${styles.main}`}>
          <p className="text-white"> {t("homepage.home_tekst")}</p>
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
