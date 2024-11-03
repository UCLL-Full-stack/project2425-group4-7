import { Sunlight } from "../model/Sunlight";

export class SunlightRepository {
    private sunlights: Sunlight[] = [];

    async add(sunlight: Sunlight): Promise<Sunlight> {
        this.sunlights.push(sunlight);
        return sunlight;
    }

    async getById(sunlightId: number): Promise<Sunlight | undefined> {
        return this.sunlights.find(s => s.sunlightId === sunlightId);
    }

    async getAll(): Promise<Sunlight[]> {
        return this.sunlights
    }

    async update(sunlight: Sunlight): Promise<Sunlight> {
        return sunlight;
    }

    async delete(sunlightId: number): Promise<void> {
        this.sunlights = this.sunlights.filter(s => s.sunlightId !== sunlightId);
    }
}