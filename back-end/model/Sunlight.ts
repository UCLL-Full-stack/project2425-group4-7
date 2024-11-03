import { Plant } from "./Plant";

export class Sunlight {
    private _sunlightId: number;
    private _quantity: string;
    private _plantId: number;
    private _plant?: Plant;

    constructor(sunlightId: number, quantity: string, plantId: number) {
        this._sunlightId = sunlightId;
        if (!["low", "medium", "high"].includes(quantity)) {
            throw new Error("Quantity must be one of 'low', 'medium', or 'high'.");
        }
        this._quantity = quantity;
        if (plantId <= 0) {
            throw new Error("Plant ID must be a positive number.");
        }
        this._plantId = plantId;
    }
    

    get sunlightId(): number {
        return this._sunlightId;
    }

    get quantity(): string {
        return this._quantity
    }

    get plantId(): number {
        return this._plantId
    }

    get plant(): Plant | undefined {
        return this._plant;
    }

    set quantity(value: string) {
        if (!["low", "medium", "high"].includes(value)) {
            throw new Error("Quantity must be one of 'low', 'medium', or 'high'.");
        }
        this._quantity = value;
    }

    set plantId(value: number) {
        if (value <= 0) {
            throw new Error("Plant ID must be a positive number.");
        }
        this._plantId = value;
    }
        

    set plant(value: Plant | undefined) {
        this._plant = value;
    }
}