import React, { useState } from "react";
import { useNotifications } from "../utils/notifications";
import UserService from "@/services/UserService";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { sendNotification } = useNotifications();

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length == 0) {
      sendNotification("Username cannot be empty.", "error");
    } else if (password.length == 0) {
      sendNotification("Password cannot be empty.", "error");
    } else {
      try {
        const { token } = await UserService.login(username, password);
        localStorage.setItem("token", token);
      } catch (error: any) {
        sendNotification(error.message, "error");
      }
    }
  };

  return (
    <div className="fixed flex flex-row shadow-md border border-white text-white bg-white bg-opacity-15 p-5 h-max w-max rounded-md mt-8">
      <div>
        <img src="rootz3.png" className="w-[10rem]" alt="" />
      </div>
      <div className="w-[0.5px] bg-white bg-opacity-80 ml-5 mr-8 rounded-md"></div>
      <div className="mr-3">
        <form onSubmit={onRegister} className="">
          <h1 className="font-semibold text-center text-lg mb-3">Login</h1>
          <div className="flex flex-col">
            <input
              placeholder="Username"
              type="username"
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent rounded-md border border-white placeholder:text-white placeholder:px-2 p-0.5 mb-3"
            />
          </div>
          <div className="flex flex-col">
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent rounded-md border border-white placeholder:text-white placeholder:px-2 p-0.5"
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

export default RegisterForm;
