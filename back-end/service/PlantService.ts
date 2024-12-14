import { Plant } from "../model/plant";
import { PlantRepository } from "../repository/PlantRepository";

export class PlantService {
    private plantRepository: PlantRepository;

    constructor() {
        this.plantRepository = new PlantRepository();
    }

    async addPlant(plant: Plant): Promise<Plant> {
        if (!plant.plantType || !plant.family) {
            throw new Error("Invalid plant data. Please provide a valid plant type and family.");
        }
        return await this.plantRepository.add(plant);
    }

    async getPlant(plantId: number): Promise<Plant | undefined> {
        return await this.plantRepository.getById(plantId);
    }

    async getAllPlants(): Promise<Plant[]> {
        return await this.plantRepository.getAll();
    }

    async updatePlant(plantId: number, data: Partial<Plant>): Promise<Plant | undefined> {
        const existingPlant = await this.getPlant(plantId);
        if (existingPlant) {
            if (data.plantType !== undefined) {
                existingPlant.plantType = data.plantType;
            }
            if (data.family !== undefined) {
                existingPlant.family = data.family;
            }
            return await this.plantRepository.update(existingPlant);
        }
        return undefined;
    }

    async deletePlant(plantId: number): Promise<void> {
        await this.plantRepository.delete(plantId);
    }
}