import { Water } from "../model/Water";

export class WaterRepository {
    private waters: Water[] = [];

    async add(water: Water): Promise<Water> {
        this.waters.push(water);
        return water
    }

    async getById(waterId: number): Promise<Water | undefined> {
        return this.waters.find(w => w.waterId === waterId);
    }

    async getAll(): Promise<Water[]> {
        return this.waters;
    }

    async update(water: Water): Promise<Water> {
        const index = this.waters.findIndex(w => w.waterId === water.waterId);
        if (index!== -1) {
            this.waters[index] = water
        }
        return water
        }
        async delete(waterId: number): Promise<void> {
            this.waters = this.waters.filter(w => waterId !== waterId);
        }
    }