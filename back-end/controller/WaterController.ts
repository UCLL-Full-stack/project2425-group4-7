import { Water } from "../model/Water";
import { WaterService } from "../service/WaterService";

export class WaterController {
    private waterService: WaterService;

    constructor() {
        this.waterService = new WaterService();
    }

    async addWater(data: any): Promise<Water> {
        const { waterId, quantity, when, plantId } = data;
        const newWater = new Water(waterId, quantity, new Date(when), plantId);
        return await this.waterService.addWater(newWater);
    }

    async getWater(waterId: number): Promise<Water | undefined> {
        return await this.waterService.getWater(waterId);
    }

    async getAllWaterRecords(): Promise<Water[]>{
        return await this.waterService.getAllWaterRecords();
    }

    async updateWater(waterId: number, data: any): Promise<Water | undefined> {
        return await this.waterService.updateWater(waterId, data);
    }

    async deleteWater(waterId: number): Promise<void> {
        return await this.waterService.deleteWater(waterId);
    }
}