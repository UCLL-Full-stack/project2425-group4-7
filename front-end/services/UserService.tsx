import { User } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllUsers = async (): Promise<any> => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  let token = "";
  if (loggedInUser) {
    try {
      const parsedUser = JSON.parse(loggedInUser);
      token = parsedUser.token || "";
    } catch (error) {
      throw error;
    }
  }
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

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

const editUser = async (userId: string, editedUser: User): Promise<any> => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  let token = "";
  if (loggedInUser) {
    try {
      const parsedUser = JSON.parse(loggedInUser);
      token = parsedUser.token || "";
    } catch (error) {
      throw error;
    }
  }
  try {
    const response = await fetch(`${API_URL}/users/edit/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(editedUser),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const editPassword = async (
  userId: string,
  newPassword: string
): Promise<any> => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  let token = "";
  if (loggedInUser) {
    try {
      const parsedUser = JSON.parse(loggedInUser);
      token = parsedUser.token || "";
    } catch (error) {
      throw error;
    }
  }
  try {
    const response = await fetch(`${API_URL}/users/edit/password/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        password: newPassword,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to change pasword");
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
  getAllUsers,
  editUser,
  editPassword,
};

export default UserService;
