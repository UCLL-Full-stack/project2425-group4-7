import { Plant } from "../model/Plant";
import { User } from "../model/User";
import { PlantInput, PlantUserInput, Profile, Role } from '../types/index'
import plantDB from '../repository/plant.db';
import userDB from '../repository/user.db';

const getAllPlants = async (): Promise<Plant[]> => {
    return await plantDB.getAllPlants();
};

const getPlantById = async (plantId: number): Promise<Plant | undefined> => {
    const plant = await plantDB.getPlantById(plantId);
    if (!plant) {
        throw new Error(`Plant: ${plantId} doesnt exist`);
    }
    return plant;
};

const deletePlantById = async (id: number) => {
  try {
    const deletePlant = await plantDB.deleteById(id);
    if (!deletePlant) {
      throw new Error(`Plant with ID ${id} not found.`);
    }
    return deletePlant;
  } catch (error) {
    throw new Error(`Failed to delete plant: ${id}`)
  }
}

const getUserPlants = async (username: string): Promise<Plant[]> => {
    try {
      const user = await userDB.getUserByUsername({ username });
      if (!user) {
        throw new Error(`User: ${username} not found`);
      }
      const userId = user.getId();
      if (userId === undefined) {
        throw new Error('User ID required');
      }
      const plants = await plantDB.getPlantsByUserId(userId);
      return plants;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching user plants');
    }
  };

const addPlant = async (plantInput: PlantInput): Promise<Plant> => {
  if (!plantInput.user || plantInput.user.id == 0 || plantInput.user.username == "") {
    throw new Error('User may not be null');
  }
  const plant: PlantInput = {
    name: plantInput.name ?? 'Unknown Plant',
    type: plantInput.type,
    family: plantInput.family,
    wateringFreq: plantInput.wateringFreq ?? 'never',
    sunlight: plantInput.sunlight ?? 'low',
    email: plantInput.email,
    sms: plantInput.sms,
    user: plantInput.user,
    created: new Date(),
  };
    return await plantDB.addPlant(plant);
};

const editPlant = async (id: number, plantInput: PlantInput) => {
  try {
    const plant = await plantDB.getPlantById(id);
    if (!plant) {
        return null;
    }
    const updatedPlant = await plantDB.editPlantById(id, plantInput);
    return updatedPlant;
} catch (error) {
    console.error('Error in editPlant service:', error);
    throw new Error('Failed to edit plant');
}
};


export default { getAllPlants, getPlantById, addPlant, getUserPlants, deletePlantById, editPlant };