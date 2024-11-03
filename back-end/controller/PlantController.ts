import { Plant } from "../model/Plant";
import { PlantService } from "../service/PlantService";

export class PlantController {
    private plantService: PlantService;

    constructor() {
        this.plantService = new PlantService();
    }

    async addPlant(data: any): Promise<Plant> {
        const { plantId, soort, familie, userId } = data;
        const newPlant = new Plant(plantId, soort, familie, userId)
        return await this.plantService.addPlant(newPlant);
    }

    async getPlant(plantId: number): Promise<Plant | undefined> {
        return await this.plantService.getPlant(plantId);
    }

    async getAllPlants(): Promise<Plant[]> {
        return await this.plantService.getAllPlants();
    }

    async updatePlant(plantId: number, data: any): Promise<Plant | undefined> {
        return await this.plantService.updatePlant(plantId, data);
    }

    async deletePlant(plantId: number): Promise<void> {
        return await this.plantService.deletePlant(plantId);
    }
}