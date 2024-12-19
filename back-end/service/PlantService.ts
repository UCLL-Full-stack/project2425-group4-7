import { Plant } from "../model/Plant";
import { User } from "../model/User";
import { PlantInput, PlantUserInput, Profile, Role } from '../types/index'
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

  const editPlant = async (id: number, { name, type, family, wateringFreq, sunlight, user }: { name?: string, type?: string, family?: string, wateringFreq?: string, sunlight?: string, user?: { id: number } }): Promise<Plant | null> => {
    try {
        const plant = await plantDB.getPlantById({ id });
        if (!plant) {
            throw new Error(`Plant: ${id} not found`);
        }
        const updatedData: any = {};
        if (name) updatedData.name = name;
        if (type) updatedData.type = type;
        if (family) updatedData.family = family;
        if (wateringFreq) updatedData.wateringFreq = wateringFreq;
        if (sunlight) updatedData.sunlight = sunlight;
        if (user && user.id) {
            updatedData.userId = user.id;
        }

        const updatedPlant = await plantDB.editPlantById(id, updatedData);
        return updatedPlant;
    } catch (error) {
        console.error(error);
        throw new Error('Error editing plant');
    }
};



export default { getAllPlants, getPlantById, addPlant, getUserPlants, deletePlantById, editPlant };