import { Soil } from "../model/Soil";

export class SoilRepository {
    private soils: Soil[] = [];
    
    async add(soil: Soil): Promise<Soil> {
        this.soils.push(soil);
        return soil;
    }

    async getById(soilId: number): Promise<Soil | undefined> {
        return this.soils.find(s => s.soilId === soilId);
    }

    async getAll(): Promise<Soil[]> {
        return this.soils;
    }

    async update(soil: Soil): Promise<Soil>{
        return soil;
    }

    async delete(soilId: number): Promise<void> {
        this.soils = this.soils.filter(s => s.soilId !== soilId);
    }
}