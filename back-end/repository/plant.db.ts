import { Plant } from '../model/Plant';
import database from './database';

const getAllPlants = async (): Promise<Plant[]> => {
    try {
        const plantsPrisma = await database.plant.findMany({
            include: { user: true }
        });
        return plantsPrisma.map((plantPrisma) => Plant.from(plantPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error');
    }
};

const getPlantById = async ({ id }: { id: number }): Promise<Plant | null> => {
    try {
        const plantPrisma = await database.plant.findUnique({
            where: { id },
        });

        return plantPrisma ? Plant.from(plantPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error');
    }
};

const addPlant = async (plant: Plant): Promise<Plant> => {
    try {
        const userId = plant.getUser().getId();
        if (userId === undefined) {
            throw new Error('User ID is required');
        }
        const plantPrisma = await database.plant.create({
            data: {
                name: plant.getName(),
                type: plant.getType(),
                family: plant.getFamily(),
                wateringFreq: plant.getWateringFreq(),
                sunlight: plant.getSunlight(),
                userId: userId,
                reminderSms: plant.getSms(),
                reminderEmail: plant.getEmail(),
            },
        });

        return Plant.from(plantPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error');
    }
};

const getPlantByNameAndUser = async ({ name, userId }: { name: string, userId: number }): Promise<Plant | null> => {
    try {
        const plantPrisma = await database.plant.findFirst({
            where: { 
                name, 
                userId 
            },
        });
        return plantPrisma ? Plant.from(plantPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error');  
    }
};

const getPlantsByUserId = async (userId: number): Promise<Plant[]> => {
    try {
      const plantsPrisma = await database.plant.findMany({
        where: { userId },
        include: { user: true },
      });
      return plantsPrisma.map((plantPrisma) => Plant.from(plantPrisma));
    } catch (error) {
      console.error(error);
      throw new Error('Database error');
    }
  };

export default {
    addPlant,
    getAllPlants,
    getPlantById,
    getPlantByNameAndUser,
    getPlantsByUserId,
}