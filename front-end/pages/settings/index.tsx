import NavigationBar from "@/components/utils/NavigationBar";
import Head from "next/head";
import styles from "@/styles/settings.module.css";
import React from "react";

const Settings = () => {
  return (
    <>
      <Head>
        <title>Rootz | Settings</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <main className={`${styles.main}`}>
        <p>Settings</p>
      </main>
    </>
  );
};

export default Settings;
