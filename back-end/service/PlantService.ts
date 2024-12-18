import { Plant } from "../model/Plant";
import { User } from "../model/User";
import { PlantInput } from '../types/index'
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

const addPlant = async (name: string, type: string, family: string, wateringFreq: string, sunlight: string, email: boolean, sms: boolean, user: User, created: Date): Promise<Plant> => {

    if (user == null) {
      throw new Error('User may not be null')
    }
    
    const plant = new Plant({name, type, family, wateringFreq, sunlight, email, sms, user, created});

    return await plantDB.addPlant(plant);
};

export default { getAllPlants, getPlantById, addPlant, getUserPlants };