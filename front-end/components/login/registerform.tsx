import React, { useState } from "react";
import { useNotifications } from "../utils/notifications";
import UserService from "@/services/UserService";
import { User } from "@/types/types";
import { useRouter } from "next/router";

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

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.length === 0) {
      sendNotification("Username is required", "error");
    } else if (email.length === 0) {
      sendNotification("Email is required", "error");
    } else if (password.length === 0) {
      sendNotification("Password is required", "error");
    } else if (verifyPassword != password) {
      sendNotification("Passwords does not match", "error");
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
            sendNotification("Registration failed, please try again", "error");
          }
          return;
        }
        sendNotification("Successfully created your account", "success");
        if (response.ok) {
          try {
            const loggedinUser: User = {
              username: username,
              password: password,
            };
            const response = await UserService.login(loggedinUser);
            if (!response.ok) {
              try {
                const error = await response.json();
                sendNotification(error.message, "error");
              } catch {
                sendNotification("Failed to login to your account", "error");
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
              sendNotification("Login failed, please try again later", "error");
            }
          } catch (error) {
            sendNotification(`"Error:" ${error}`, "error");
          }
        }
      } catch (error) {
        sendNotification("Registration failed, please try again", "error");
        sendNotification(`"Error:" ${error}`, "error");
      }
    }
  };

  return (
    <div className="fixed flex flex-row shadow-md border border-white text-white bg-white bg-opacity-15 p-5 h-max w-max rounded-md mt-8">
      <div className="h-auto flex">
        <img src="/rootz3.png" className="w-[10rem] my-auto" alt="" />
      </div>
      <div className="w-[0.5px] bg-white bg-opacity-80 ml-5 mr-8 rounded-md"></div>
      <div className="mr-3">
        <form className="">
          <h1 className="font-semibold text-center text-lg mb-3">Register</h1>
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
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent rounded-md border border-white placeholder:text-white p-0.5 mb-3 pl-2"
            />
          </div>
          <div className="flex flex-col">
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent rounded-md border border-white placeholder:text-white p-0.5 mb-3 pl-2"
            />
          </div>
          <div className="flex flex-col">
            <input
              placeholder="Repeat Password"
              type="password"
              onChange={(e) => setVerifyPassword(e.target.value)}
              className="bg-transparent rounded-md border border-white placeholder:text-white pl-2 p-0.5"
            />
          </div>
          <button
            onClick={onRegister}
            className="bg-white w-full hover:bg-slate-200 text-gray-900 font-semibold mt-4 rounded-md p-1 text-sm"
          >
            Register
          </button>
        </form>
        <p className="font-light text-sm mt-3 text-center">
          Already have an account?{" "}
          <button className="font-semibold" onClick={toggleForm}>
            {" "}
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
