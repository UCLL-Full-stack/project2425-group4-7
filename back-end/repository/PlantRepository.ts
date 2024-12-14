import { Plant } from "../model/plant";

export class PlantRepository {
    private plants: Plant[] = [];
    private idCounter: number = 1;

    async add(plant: Plant): Promise<Plant> {
        const newPlant = new Plant(
            this.idCounter++,
            plant.plantType,
            plant.family,
            plant.wateringFreq,
            plant.sunlight,
            plant.reminders
        );
        
        this.plants.push(newPlant);
        return newPlant;
    }

    async getById(plantId: number): Promise<Plant | undefined> {
        return this.plants.find(p => p.plantId === plantId);
    }

    async getAll(): Promise<Plant[]> {
        return this.plants;
    }

    async update(updatedPlant: Plant): Promise<Plant | undefined> {
        const index = this.plants.findIndex(p => p.plantId === updatedPlant.plantId);
        if (index !== -1) {
            this.plants[index] = updatedPlant;
            return updatedPlant;
        }
        return undefined;
    }

    async delete(plantId: number): Promise<void> {
        this.plants = this.plants.filter(p => p.plantId !== plantId);
    }
}