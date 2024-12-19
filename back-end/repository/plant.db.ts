import { Plant } from '../model/Plant';
import { PlantInput } from '../types';
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

const addPlant = async (plant: PlantInput): Promise<Plant> => {
    try {
        const userId = plant.user.id;
        if (userId === undefined) {
            throw new Error('User ID is required');
        }
        const reminderSms = plant.sms ?? false;
        const reminderEmail = plant.email ?? false;
        console.log('User ID for new plant:', userId);
        const plantPrisma = await database.plant.create({
            data: {
                name: plant.name,
                type: plant.type,
                family: plant.family,
                wateringFreq: plant.wateringFreq,
                sunlight: plant.sunlight,
                userId: userId,
                reminderSms: reminderSms,
                reminderEmail: reminderEmail,
            },
            include: {
                user: true,
            },
        });

        return Plant.from(plantPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error');
    }
};

const deleteById = async (id: number): Promise<Boolean> => {
    try {
        const deletePlant = await database.plant.delete({
            where: { id },
        });
        return !!deletePlant;
    } catch (error) {
        console.error(error);
        throw new Error('Database error');
    }
}

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
    deleteById,
}