import { Plant } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getPlants = async (): Promise<Plant[]> => {
  const response = await fetch(`${API_URL}/plants`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

const addPlant = async (plant: Plant): Promise<void> => {
  const response = await fetch(`${API_URL}/plants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plant),
  });
};

const PlantService = {
  getPlants,
  addPlant,
};

export default PlantService;
