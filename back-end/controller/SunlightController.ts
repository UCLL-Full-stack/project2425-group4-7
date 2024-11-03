import { Sunlight } from "../model/Sunlight";
import { SunlightService } from "../service/SunlightService";

export class SunlightController {
    private sunlightService: SunlightService;

    constructor() {
        this.sunlightService = new SunlightService();
    }

    async addSunlight(data: any): Promise<Sunlight> {
        const { sunlightId, quantity, plantId } = data;
        const newSunlight = new Sunlight(sunlightId, quantity, plantId);
        return await this.sunlightService.addSunlight(newSunlight);
    }

    async getSunlight(sunlightId: number): Promise<Sunlight | undefined> {
        return await this.sunlightService.getSunlight(sunlightId);
    }

    async getAllSunlights(): Promise<Sunlight[]> {
        return await this.sunlightService.getAllSunlights();
    }

    async updateSunlight(sunlightId: number, data: any): Promise<Sunlight | undefined> {
        return await this.sunlightService.updateSunlight(sunlightId, data);
    }

    async deleteSunlight(sunlightId: number): Promise<void> {
        return await this.sunlightService.deleteSunlight(sunlightId);
    }

}