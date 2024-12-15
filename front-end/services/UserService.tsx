import { User } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const login = async (user: User) => {
  const token = localStorage.getItem("loggedInUser");

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(user),
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const logout = (): void => {
  localStorage.removeItem("token");
};

const UserService = {
  login,
  logout,
};

export default UserService;
