import { Plant } from "../model/Plant";
import { User } from "../model/User";
import { PlantInput, PlantUserInput, Profile } from '../types/index'
import plantDB from '../repository/plant.db';
import userDB from '../repository/user.db';

const getAllPlants = async (): Promise<Plant[]> => {
    return await plantDB.getAllPlants();
};

const getPlantById = async (plantId: number): Promise<Plant | undefined> => {
    const plant = await plantDB.getPlantById({id: plantId});
    if (!plant) {
        throw new Error(`Plant with ID: ${plantId} does not exist.`);
    }
    return plant;
};

const deletePlantById = async (id: number) => {
  try {
    const deletePlant = await plantDB.deleteById(id);
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

      if (!plantInput.user) {
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

export default { getAllPlants, getPlantById, addPlant, getUserPlants, deletePlantById };