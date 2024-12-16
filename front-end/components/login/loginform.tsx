import React, { useState } from "react";
import { useNotifications } from "../utils/notifications";
import UserService from "@/services/UserService";
import { useRouter } from "next/router";
import { User } from "@/types/types";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { sendNotification } = useNotifications();
  const router = useRouter();

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length == 0) {
      sendNotification("Username cannot be empty.", "error");
    } else if (password.length == 0) {
      sendNotification("Password cannot be empty.", "error");
    } else {
      const loggedinUser: User = {
        username: username,
        password: password,
      };

      try {
        const response = await UserService.login(loggedinUser);

        if (!response.ok) {
          try {
            const error = await response.json();
            sendNotification(error.message, "error");
          } catch {
            sendNotification(
              "Incorrect username and/or password. Please try again.",
              "error"
            );
          }
          return;
        }

        try {
          const token = await response.json();
          sendNotification("Successfully logged in to your account", "success");
          localStorage.setItem("loggedInUser", JSON.stringify(token));
          setTimeout(() => {
            router.push("/");
          }, 1000);
        } catch (error) {
          sendNotification("Login failed, please try again later", "error");
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        sendNotification("Login failed, please try again later", "error");
      }
    }
  };

  return (
    <div className="fixed flex flex-row shadow-md border border-white text-white bg-white bg-opacity-15 p-5 h-max w-max rounded-md mt-[10vh]">
      <div>
        <img src="/rootz3.png" className="w-[10rem]" alt="" />
      </div>
      <div className="w-[0.5px] bg-white bg-opacity-80 ml-5 mr-8 rounded-md"></div>
      <div className="mr-3">
        <form onSubmit={onLogin} className="">
          <h1 className="font-semibold text-center text-lg mb-3">Login</h1>
          <div className="flex flex-col">
            <input
              placeholder="Username"
              type="username"
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent rounded-md border border-white placeholder:text-white p-0.5 mb-3 pl-2"
            />
          </div>
          <div className="flex flex-col">
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent rounded-md border border-white placeholder:text-white pl-2 p-0.5"
            />
          </div>
          <button className="bg-white w-full hover:bg-slate-200 text-gray-900 font-semibold mt-4 rounded-md p-1 text-sm">
            Login
          </button>
        </form>
        <p className="font-light text-sm mt-3 text-center">
          Don't have an account yet?{" "}
          <button className="font-semibold"> Register here</button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
