import React, { useState } from "react";
import { useNotifications } from "../utils/notifications";
import UserService from "@/services/UserService";
import { User } from "@/types/types";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface RegisterFormProps {
  toggleForm: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ toggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [email, setEmail] = useState("");
  const { sendNotification } = useNotifications();
  const router = useRouter();
  const { t } = useTranslation();

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.length === 0) {
      sendNotification(
        `${t("registerForm.notification_username_required")}`,
        "error"
      );
    } else if (email.length === 0) {
      sendNotification(
        `${t("registerForm.notification_email_required")}`,
        "error"
      );
    } else if (password.length === 0) {
      sendNotification(
        `${t("registerForm.notification_password_required")}`,
        "error"
      );
    } else if (verifyPassword != password) {
      sendNotification(
        `${t("registerForm.notification_password_match")}`,
        "error"
      );
    } else {
      const newUser: User = {
        username: username,
        email: email,
        password: password,
        role: "user",
      };

      try {
        const response = await UserService.register(newUser);
        if (!response.ok) {
          try {
            const error = await response.json();
            sendNotification(error.message, "error");
          } catch {
            sendNotification(
              `${t("registerForm.notification_registration_failed")}`,
              "error"
            );
          }
          return;
        }
        sendNotification(
          `${t("registerForm.notification_successfully_created")}`,
          "success"
        );
        if (response.ok) {
          try {
            const loggedinUser: User = {
              username: username,
              password: password,
              email: "",
            };
            const response = await UserService.login(loggedinUser);
            if (!response.ok) {
              try {
                const error = await response.json();
                sendNotification(error.message, "error");
              } catch {
                sendNotification(
                  `${t("registerForm.notification_failed_login")}`,
                  "error"
                );
              }
              return;
            }

            try {
              const token = await response.json();
              localStorage.setItem("loggedInUser", JSON.stringify(token));
              setTimeout(() => {
                router.push("/myplants").then(() => {
                  window.location.reload();
                });
              }, 2000);
            } catch (error) {
              sendNotification(
                `${t("registerForm.notification_failed_try_again")}`,
                "error"
              );
            }
          } catch (error) {
            sendNotification(
              `${t("registerForm.notification_error")} ${error}`,
              "error"
            );
          }
        }
      } catch (error) {
        sendNotification(
          `${t("registerForm.notification_registration_failed_try_again")}`,
          "error"
        );
        sendNotification(
          `${t("registerForm.notification_error")} ${error}`,
          "error"
        );
      }
    }
  };

  return (
    <div className="fixed flex flex-row shadow-md border border-white text-white bg-white bg-opacity-15 p-5 h-max w-max rounded-md mt-8">
      <div className="h-auto hidden mini:flex">
        <img src="/rootz3.png" className="w-[10rem] my-auto" alt="" />
      </div>
      <div className="w-[0.5px] mini:flex hidden bg-white bg-opacity-80 ml-5 mr-8 rounded-md"></div>
      <div className="mr-3">
        <form className="ml-3 mini:ml-0">
          <h1 className="font-semibold text-center text-lg mb-3">Register</h1>
          <div className="flex flex-col">
            <input
              placeholder={t("registerForm.placeholder_username")}
              type="username"
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent rounded-md border border-white placeholder:text-white p-0.5 mb-3 pl-2"
            />
          </div>
          <div className="flex flex-col">
            <input
              placeholder={t("registerForm.placeholder_email")}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent rounded-md border border-white placeholder:text-white p-0.5 mb-3 pl-2"
            />
          </div>
          <div className="flex flex-col">
            <input
              placeholder={t("registerForm.placeholder_password")}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent rounded-md border border-white placeholder:text-white p-0.5 mb-3 pl-2"
            />
          </div>
          <div className="flex flex-col">
            <input
              placeholder={t("registerForm.placeholder_repeat_password")}
              type="password"
              onChange={(e) => setVerifyPassword(e.target.value)}
              className="bg-transparent rounded-md border border-white placeholder:text-white pl-2 p-0.5"
            />
          </div>
          <button
            onClick={onRegister}
            className="bg-white w-full hover:bg-slate-200 text-gray-900 font-semibold mt-4 rounded-md p-1 text-sm"
          >
            {t("registerForm.register")}
          </button>
        </form>
        <p className="font-light text-sm mt-3 text-center">
          {t("registerForm.already_have_an_account")}{" "}
          <button className="font-semibold" onClick={toggleForm}>
            {" "}
            {t("registerForm.login_here")}
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
// ROOTZ (Simon Denruyter / Ewout Servranckx)
