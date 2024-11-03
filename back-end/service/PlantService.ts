import { Plant } from "../model/Plant";
import { PlantRepository } from "../repository/PlantRepository";

export class PlantService {
    private plantRepository: PlantRepository;

    constructor() {
        this.plantRepository = new PlantRepository();
    }

    async addPlant(plant: Plant): Promise<Plant> {
        return await this.plantRepository.add(plant);
    }

    async getPlant(plantId: number): Promise<Plant | undefined> {
        return await this.plantRepository.getById(plantId);
    }

    async getAllPlants(): Promise<Plant[]> {
        return await this.plantRepository.getAll();
    }

    async updatePlant(plantId: number, date:any): Promise<Plant | undefined> {
        const existingPlant = await this.getPlant(plantId);
        if (existingPlant) {
            existingPlant.soort = date.soort || existingPlant.soort;
            existingPlant.familie = date.familie || existingPlant.familie;
            return await this.plantRepository.update(existingPlant)
        }
        return undefined;
    }

    async deletePlant(plantId: number): Promise<void> {
        return await this.plantRepository.delete(plantId);
    }
}
