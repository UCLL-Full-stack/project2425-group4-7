import NavigationBar from "@/components/utils/header";
import Head from "next/head";
import styles from "@/styles/settings.module.css";
import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { useNotifications } from "../../components/utils/notifications";

const Settings = () => {
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const { sendNotification } = useNotifications();

  const onUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length === 0) {
      sendNotification(`${t("settings.notification_username_empty")}`, "error");
    } else if (password.length === 0) {
      sendNotification(`${t("settings.notification_password_empty")}`, "error");
    } else if (phone.length === 0) {
      sendNotification(`${t("settings.notification_phone_empty")}`, "error");
    } else if (email.length === 0) {
      sendNotification(`${t("settings.notification_email_empty")}`, "error");

      const updatedUser = {
        username,
        password,
        phone,
        email,
      };

      sendNotification(
        `${t("settings.notification_update_success")}`,
        "success"
      );
    }
  };

  return (
    <>
      <Head>
        <title>{t("settings.title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex flex-col items-center">
        <h1 className="text-white font-semibold text-2xl mt-5">
          {t("settings.update_profile")}
        </h1>
        <form
          onSubmit={onUpdate}
          className="bg-white bg-opacity-15 p-5 rounded-md shadow-md mt-5 w-[90%] sm:w-[400px]"
        >
          <div className="flex flex-col mb-4">
            <label className="text-white font-light mb-2">
              {t("settings.username")}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-white bg-transparent rounded-md border border-white placeholder:text-white pl-2 p-1"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-white font-light mb-2">
              {t("settings.password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-white bg-transparent rounded-md border border-white placeholder:text-white pl-2 p-1"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-white font-light mb-2">
              {t("settings.phone")}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="text-white bg-transparent rounded-md border border-white placeholder:text-white pl-2 p-1"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-white font-light mb-2">
              {t("settings.email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-white bg-transparent rounded-md border border-white placeholder:text-white pl-2 p-1"
            />
          </div>
          <button className="bg-white hover:bg-slate-200 text-gray-900 font-semibold w-full rounded-md p-2">
            {t("settings.update_button")}
          </button>
        </form>
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
