import { Plant } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllPlants = async (): Promise<any> => {
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
    const response = await fetch(`${API_URL}/plants/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch plants");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getUserPlants = async (username: string): Promise<any> => {
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
    const response = await fetch(`${API_URL}/plants/user/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch plants for ${username}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const addPlant = async (plant: any): Promise<any> => {
  try {
    const token = localStorage.getItem("loggedInUser");
    const response = await fetch(`${API_URL}/plants/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(plant),
    });

    if (!response.ok) {
      throw new Error("Failed to add plant");
    }

    return await response.json();
    // console.log(plant);
  } catch (error) {
    // console.log(plant);
    throw error;
  }
};

const deletePlant = async (plantId: number): Promise<any> => {
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
    const response = await fetch(`${API_URL}/plants/delete/${plantId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete plant: ${plantId}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const PlantService = {
  getAllPlants,
  getUserPlants,
  addPlant,
  deletePlant,
};

export default PlantService;
