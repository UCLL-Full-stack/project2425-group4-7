import NavigationBar from "@/components/utils/header";
import Head from "next/head";
import styles from "@/styles/settings.module.css";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import UserService from "@/services/UserService";
import { useNotifications } from "@/components/utils/notifications";
import { useRouter } from "next/router";

const Settings = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState({
    id: null,
    username: "",
    password: "",
    email: "",
    role: "",
    profile: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });
  const { sendNotification } = useNotifications();
  const [passwordData, setPasswordData] = useState({
    password: "",
    repeatPassword: "",
  });
  const router = useRouter();

  const checkRolePerms = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      router.push("/unauthorized");
    }
  };

  useEffect(() => {
    checkRolePerms();
    const fetchUserData = async () => {
      try {
        const user = await UserService.getLoggedInUser();
        const updatedUserData = {
          ...user,
          profile: {
            ...user.profile,
            firstName: user.profile?.firstName ?? "",
            lastName: user.profile?.lastName ?? "",
            phoneNumber: user.profile?.phoneNumber ?? "",
          },
        };
        setUserData(updatedUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // bepaald welk veld aangepast word (niet aankomen aub)
    const { name, value } = e.target;
    if (name.startsWith("profile.")) {
      const profileField = name.split(".")[1];
      setUserData((prevState) => ({
        ...prevState,
        profile: {
          ...prevState.profile,
          [profileField]: value,
        },
      }));
    } else if (name === "password" || name === "repeatPassword") {
      setPasswordData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setUserData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordData.password !== passwordData.repeatPassword) {
      sendNotification(`${t("settings.password_nomatch")}`, "error");
      return;
    }
    try {
      const userId = userData.id;
      if (userId === null) {
        return;
      }
      const newPassword = passwordData.password;
      await UserService.editPassword(userId, newPassword);
      sendNotification(`${t("settings.password_success")}`, "success");
    } catch (error) {
      console.error("Error updating password:", error);
      sendNotification(`${t("settings.password_error")}`, "error");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedUser = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      profile: {
        ...userData.profile,
        user: {
          id: userData.id !== null ? userData.id : undefined,
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      },
    };
    sendNotification("Successfully saved account information", "success");
    const userId = userData.id;
    if (userId === null) {
      return;
    }
    const response = await UserService.editUser(userId, updatedUser);
  };

  return (
    <>
      <Head>
        <title>{t("settings.title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex flex-col items-center mt-10 text-white">
        <div className="w-full px-2 mini:px-0 mini:w-[30rem]">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row justify-between">
              <h1 className="font-bold text-lg">{t("settings.settings")}</h1>
              <button className="text-sm">
                {t("settings.confirm_changes")}
              </button>
            </div>
            <hr className="mb-3 mt-2 bg-white w-full" />
            <div className="flex mini:flex-row flex-col justify-between">
              <div className="flex flex-col italic font-semibold gap-1 mb-2 mini:mb-0">
                <label className="text-sm">{t("settings.firstname")}</label>
                <input
                  className="mini:w-[14rem] bg-transparent border-b border-zinc-600 outline-none p-0.5 font-normal"
                  type="text"
                  required
                  name="profile.firstName"
                  value={userData.profile.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col italic font-semibold gap-1">
                <label className="text-sm">{t("settings.lastname")}</label>
                <input
                  className="mini:w-[14rem] bg-transparent border-b border-zinc-600 outline-none p-0.5 font-normal"
                  type="text"
                  required
                  name="profile.lastName"
                  value={userData.profile.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex mini:flex-row flex-col justify-between mt-5">
              <div className="flex flex-col italic font-semibold gap-1 mb-2 mini:mb-0">
                <label className="text-sm">{t("settings.email")}</label>
                <input
                  className="mini:w-[14rem] bg-transparent border-b border-zinc-600 outline-none p-0.5 font-normal"
                  type="text"
                  required
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col italic font-semibold gap-1">
                <label className="text-sm">{t("settings.phone")}</label>
                <input
                  className="mini:w-[14rem] bg-transparent border-b border-zinc-600 outline-none p-0.5 font-normal"
                  type="text"
                  required
                  name="profile.phoneNumber"
                  value={userData.profile.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
          <form onSubmit={handlePasswordSubmit}>
            <div className="flex flex-row justify-between mt-10">
              <h1 className="font-bold text-lg">
                {t("settings.changepassword_title")}
              </h1>
              <button className="text-sm">
                {t("settings.changepassword_button")}
              </button>
            </div>
            <hr className="mb-3 mt-2 bg-white w-full" />
            <div className="flex mini:flex-row flex-col justify-between mt-5">
              <div className="flex flex-col italic font-semibold gap-1">
                <label className="text-sm">{t("settings.password")}</label>
                <input
                  className="mini:w-[14rem] bg-transparent border-b border-zinc-600 outline-none p-0.5 font-normal mb-2 mini:mb-0"
                  type="password"
                  required
                  name="password"
                  value={passwordData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col italic font-semibold gap-1">
                <label className="text-sm">
                  {t("settings.repeat_password")}
                </label>
                <input
                  className="mini:w-[14rem] bg-transparent border-b border-zinc-600 outline-none p-0.5 font-normal"
                  type="password"
                  required
                  name="repeatPassword"
                  value={passwordData.repeatPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </div>
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
