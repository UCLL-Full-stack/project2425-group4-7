import { Water } from "../model/Water";
import { WaterRepository } from "../repository/WaterRepository";

export class WaterService {
    private waterRepository: WaterRepository;
    plantService: any;

    constructor() {
        this.waterRepository = new WaterRepository();
    }

    async addWater(water: Water): Promise<Water> {
        const plantExists = await this.plantService.getPlant(water.plantId);
        if (!plantExists) {
            throw new Error("Plant does not exist for the given plantId.");
        }
        return await this.waterRepository.add(water);
    }

    async getWater(waterId: number): Promise<Water | undefined> {
        return await this.waterRepository.getById(waterId);
    }

    async getAllWaterRecords(): Promise<Water[]> {
        return await this.waterRepository.getAll();
    }

    async updateWater(waterId: number, data: any): Promise<Water | undefined> {
        const existingWater = await this.getWater(waterId);
        if (existingWater) {
            if (data.quantity !== undefined && data.quantity <= 0) {
                throw new Error("Quantity must be a positive number.");
            }
            if (data.when && !(data.when instanceof Date) && isNaN(new Date(data.when).getTime())) {
                throw new Error("Invalid date format for 'when'.");
            }
            existingWater.quantity = data.quantity || existingWater.quantity;
            existingWater.when = new Date(data.when) || existingWater.when;
            return await this.waterRepository.update(existingWater);
        }
        return undefined;
    }

    async deleteWater(waterId: number): Promise<void> {
        return await this.waterRepository.delete(waterId);
    }
}