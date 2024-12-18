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

const register = async (user: User) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

const getLoggedInUser = async (): Promise<any> => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  let token = "";
  let username = "";
  if (loggedInUser) {
    try {
      const parsedUser = JSON.parse(loggedInUser);
      token = parsedUser.token || "";
      username = parsedUser.username || "";
    } catch (error) {
      throw error;
    }
  }
  try {
    const response = await fetch(`${API_URL}/users/name/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch information for ${username}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const UserService = {
  login,
  logout,
  register,
  getLoggedInUser,
};

export default UserService;
