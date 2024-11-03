import { Plant } from "./Plant";

export class Soil {
    private _soilId: number;
    private _type: string;
    private _refreshing: Date;
    private _fertilizing: Date;
    private _plantId: number;
    private _plant?: Plant;
    
    constructor(soilId: number, type: string, refreshing: Date, fertilizing: Date, plantId: number) {
        this._soilId = soilId;
        this._type = type;
        this._refreshing = refreshing;
        this._fertilizing = fertilizing;
        this._plantId = plantId;
    }

    get soilId(): number {
        return this._soilId;
    }

    get type(): string {
        return this._type;
    }

    get refreshing(): Date {
        return this._refreshing;
    }

    get fertilizing(): Date {
        return this._fertilizing
    }

    get plantId(): number {
        return this._plantId
    }

    get plant(): Plant | undefined {
        return this._plant;
    }

    set type(value: string) {
        this._type = value
    }

    set refreshing(value: Date) {
        this._refreshing = value;
    }

    set fertilizing(value: Date) {
        this._fertilizing = value
    }

    set plantId(value: number) {
        this._plantId = value;
    }

    set plant(value: Plant | undefined) {
        this._plant = value;
    }

}