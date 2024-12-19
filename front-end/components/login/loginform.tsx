import React, { useState } from "react";
import { useNotifications } from "../utils/notifications";
import UserService from "@/services/UserService";
import { useRouter } from "next/router";
import { User } from "@/types/types";
import { useTranslation } from "react-i18next";

interface LoginFormProps {
  toggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ toggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { sendNotification } = useNotifications();
  const router = useRouter();
  const { t } = useTranslation();

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length == 0) {
      sendNotification(
        `${t("loginForm.notification_username_empty")}`,
        "error"
      );
    } else if (password.length == 0) {
      sendNotification(
        `${t("loginForm.notification_password_empty")}`,
        "error"
      );
    } else {
      const loggedinUser: User = {
        username: username,
        password: password,
        email: "",
      };

      try {
        const response = await UserService.login(loggedinUser);

        if (!response.ok) {
          try {
            const error = await response.json();
            sendNotification(error.message, "error");
          } catch {
            sendNotification(
              `${t("loginForm.notification_incorrect_username_password")}`,
              "error"
            );
          }
          return;
        }

        try {
          const token = await response.json();
          sendNotification(
            `${t("loginForm.notification_succesfully_logged_in")}`,
            "success"
          );
          localStorage.setItem("loggedInUser", JSON.stringify(token));
          window.dispatchEvent(new Event("storage"));
          setTimeout(() => {
            router.push("/myplants");
          }, 1000);
        } catch (error) {
          sendNotification(
            `${t("loginForm.notification_login_failed")}`,
            "error"
          );
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        sendNotification(
          `${t("loginForm.notification_login_failed")}`,
          "error"
        );
      }
    }
  };

  return (
    <div className="fixed flex flex-row shadow-md border border-white text-white bg-white bg-opacity-15 p-5 h-max w-max rounded-md mt-[10vh]">
      <div className="mini:flex hidden">
        <img src="/rootz3.png" className="w-[10rem]" alt="" />
      </div>
      <div className="hidden mini:flex w-[0.5px] bg-white bg-opacity-80 ml-5 mr-8 rounded-md"></div>
      <div className="mr-3">
        <form onSubmit={onLogin} className="ml-3 mini:ml-0">
          <h1 className="font-semibold text-center text-lg mb-3">Login</h1>
          <div className="flex flex-col">
            <input
              placeholder={t("loginForm.placeholder_username")}
              type="username"
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent rounded-md border border-white placeholder:text-white p-0.5 mb-3 pl-2"
            />
          </div>
          <div className="flex flex-col">
            <input
              placeholder={t("loginForm.placeholder_password")}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent rounded-md border border-white placeholder:text-white pl-2 p-0.5"
            />
          </div>
          <button className="bg-white w-full hover:bg-slate-200 text-gray-900 font-semibold mt-4 rounded-md p-1 text-sm">
            {t("loginForm.login")}
          </button>
        </form>
        <p className="font-light text-sm mt-3 text-center">
          {t("loginForm.no_account")}{" "}
          <button className="font-semibold" onClick={toggleForm}>
            {" "}
            {t("loginForm.register_here")}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
// ROOTZ (Simon Denruyter / Ewout Servranckx)
