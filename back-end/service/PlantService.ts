import { Plant } from "../model/Plant";
import { PlantRepository } from "../repository/PlantRepository";

export class PlantService {
    private plantRepository: PlantRepository;

    constructor() {
        this.plantRepository = new PlantRepository();
    }

    async addPlant(plant: Plant): Promise<Plant> {
        if (!plant.soort || !plant.familie || plant.userId <= 0) {
            throw new Error("Invalid plant data. Please provide a valid soort, familie, and user ID.");
        }
        return await this.plantRepository.add(plant);
    }

    async getPlant(plantId: number): Promise<Plant | undefined> {
        return await this.plantRepository.getById(plantId);
    }

    async getAllPlants(): Promise<Plant[]> {
        return await this.plantRepository.getAll();
    }

    async updatePlant(plantId: number, data:any): Promise<Plant | undefined> {
        const existingPlant = await this.getPlant(plantId);
        if (existingPlant) {
            if (data.soort) {
                existingPlant.soort = data.soort; // Validatie gebeurt in de setter
            }
            if (data.familie) {
                existingPlant.familie = data.familie; // Validatie gebeurt in de setter
            }
            return await this.plantRepository.update(existingPlant);
        }
        return undefined;
    }

    async deletePlant(plantId: number): Promise<void> {
        return await this.plantRepository.delete(plantId);
    }
}
