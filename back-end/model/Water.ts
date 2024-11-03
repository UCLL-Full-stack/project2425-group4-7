import { Plant } from "./Plant";

export class Water {
    private _waterId: number;
    private _quantity: number;
    private _when: Date;
    private _plantId: number;
    private _plant?: Plant;

    constructor(waterId: number, quantity: number, when: Date, plantId: number) {
        if (quantity <= 0) {
            throw new Error("Quantity must be a positive number.");
        }
        if (!(when instanceof Date) || isNaN(when.getTime())) {
            throw new Error("Invalid date for 'when'.");
        }

        this._waterId = waterId;
        this._quantity = quantity;
        this._when = when;
        this._plantId = plantId
        
    }

    get waterId(): number {
        return this._waterId;
    }

    get quantity(): number {
        return this._quantity;
    }

    get when(): Date {
        return this._when;
    }

    get plantId(): number {
        return this._plantId
    }

    get plant(): Plant | undefined {
        return this._plant;
    }

    set quantity(value: number) {
        if (value <= 0) {
            throw new Error("Quantity must be a positive number.");
        }
        this._quantity = value;
    }

    set when(value: Date) {
        if (!(value instanceof Date) || isNaN(value.getTime())) {
            throw new Error("Invalid date for 'when'.");
        }
        this._when = value;
    }

    set plant(value: Plant | undefined) {
        this._plant = value;
    }
}