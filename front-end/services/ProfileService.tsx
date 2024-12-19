import { Profile } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getProfileByUserId = async (userId: number): Promise<any> => {
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
    const response = await fetch(`${API_URL}/profiles/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to get profile (userId): ${userId}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const ProfileService = {
  getProfileByUserId,
};

export default ProfileService;
