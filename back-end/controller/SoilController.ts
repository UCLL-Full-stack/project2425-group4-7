import { Soil } from "../model/Soil";
import { SoilService } from "../service/SoilService";

export class SoilController{
    private soilService: SoilService;

    constructor() {
        this.soilService = new SoilService();
    }

    async addSoil(data: any): Promise<Soil> {
        const { soilId, type, refreshing, fertilizing, plantId }= data
        const newSoil = new Soil(soilId, type, new Date(refreshing), new Date(fertilizing), plantId);
        return await this.soilService.addSoil(newSoil);
    }

    async getSoil(soilId: number): Promise<Soil | undefined> {
        return await this.soilService.getSoil(soilId);
    }

    async getAllSoils(): Promise<Soil[]> {
        return await this.soilService.getAllSoils();
    }

    async updateSoil( soilId: number, data: any): Promise<Soil | undefined> {
        return await this.soilService.updateSoil(soilId, data);
    }

    async deleteSoil(soilId: number): Promise<void> {
        return await this.soilService.deleteSoil(soilId);
    }
}