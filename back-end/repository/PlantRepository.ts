import { Plant } from "../model/Plant";

export class PlantRepository {
    private plants: Plant[] = []

    async add(plant: Plant): Promise<Plant> {
        this.plants.push(plant)
        return plant
    }

    async getById(plantId: number): Promise<Plant | undefined> {
        return this.plants.find(p => p.plantId === plantId);
    }

    async getAll(): Promise<Plant[]> {
        return this.plants;
    }

    async update(plant: Plant): Promise<Plant> {
        return plant;
    }

    async delete(plantId: number): Promise<void>  {
        this.plants = this.plants.filter(p => p.plantId !== plantId);
    }
}