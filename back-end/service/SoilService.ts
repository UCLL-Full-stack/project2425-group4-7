import { Soil } from "../model/Soil";
import { SoilRepository } from "../repository/SoilRepository";

export class SoilService {
    private soilRepository: SoilRepository;

    constructor() {
        this.soilRepository = new SoilRepository;
    }

    async addSoil(soil: Soil): Promise<Soil> {
        if (!soil.type || soil.plantId <= 0) {
            throw new Error("Invalid soil type or plant ID.");
        }
        return await this.soilRepository.add(soil);
    }

    async getSoil(soilId: number): Promise<Soil | undefined> {
        return await this.soilRepository.getById(soilId);
    }

    async getAllSoils(): Promise<Soil[]>{
        return await this.soilRepository.getAll();
    }

    async updateSoil(soilId: number, data: any): Promise<Soil | undefined> {
        const existingSoil = await this.getSoil(soilId);
        if (existingSoil) {
            if (data.type && (typeof data.type !== 'string' || data.type.trim() === '')) {
                throw new Error("Soil type must not be empty.");
            }
            if (data.plantId && data.plantId <= 0) {
                throw new Error("Plant ID must be a positive number.");
            }

            existingSoil.type = data.type || existingSoil.type;
            existingSoil.refreshing = data.refreshing ? new Date(data.refreshing) : existingSoil.refreshing;
            existingSoil.fertilizing = data.fertilizing ? new Date(data.fertilizing) : existingSoil.fertilizing;
            existingSoil.plantId = data.plantId || existingSoil.plantId;

            return await this.soilRepository.update(existingSoil);
        }
        return undefined;
    }

    async deleteSoil(soilId: number): Promise<void> {
        return await this.soilRepository.delete(soilId);
    }
}