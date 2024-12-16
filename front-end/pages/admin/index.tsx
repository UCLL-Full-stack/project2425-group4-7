import Head from "next/head";
import styles from "@/styles/settings.module.css";
import React from "react";

const Settings = () => {
  return (
    <>
      <Head>
        <title>Rootz | Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex justify-center">
        <p className="mt-5 text-white font-semibold">Admin</p>
      </main>
    </>
  );
};

export default Settings;
