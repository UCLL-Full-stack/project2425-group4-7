import NavigationBar from "@/components/utils/header";
import Head from "next/head";
import styles from "@/styles/settings.module.css";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("settings.title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex justify-center">
        <p className="mt-5 text-white font-semibold">
          {t("settings.settings")}
        </p>
      </main>
    </>
  );
};

export default Settings;

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
