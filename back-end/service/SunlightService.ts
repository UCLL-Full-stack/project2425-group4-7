import { Sunlight } from "../model/Sunlight";
import { SunlightRepository } from "../repository/SunlightRepository";

export class SunlightService {
    private sunlightRepository: SunlightRepository;

    constructor() {
        this.sunlightRepository = new SunlightRepository();
    }

    async addSunlight(sunlight: Sunlight): Promise<Sunlight> {
        return await this.sunlightRepository.add(sunlight);
    }

    async getSunlight(sunlightId: number): Promise<Sunlight | undefined> {
        return await this.sunlightRepository.getById(sunlightId);
    }

    async getAllSunlights(): Promise<Sunlight[]>{
        return await this.sunlightRepository.getAll();
    }

    async updateSunlight(sunlightId: number, data: any): Promise<Sunlight | undefined> {
        const existingSunlight = await this.getSunlight(sunlightId);
        if (existingSunlight) {
            if (data.quantity && !["low", "medium", "high"].includes(data.quantity)) {
                throw new Error("Quantity must be one of 'low', 'medium', or 'high'.");
            }
            if (data.plantId && data.plantId <= 0) {
                throw new Error("Plant ID must be a positive number.");
            }

            existingSunlight.quantity = data.quantity || existingSunlight.quantity;
            existingSunlight.plantId = data.plantId || existingSunlight.plantId;

            return await this.sunlightRepository.update(existingSunlight);
        }
        return undefined;
    }

    async deleteSunlight(sunlightId: number): Promise<void> {
        return await this.sunlightRepository.delete(sunlightId);
    }
}


