import { Plant } from "./Plant";

export class Reminder {
    private _reminderId : number;
    private _email: string;
    private _gsmNumber: number;
    private _plantId: number;
    private _plant?: Plant;

    constructor(reminderId: number, email: string, gsmNumber: number, plantId: number) {
        this._reminderId = reminderId;
        this._email = email;
        this._gsmNumber = gsmNumber;
        this._plantId = plantId;
    }

    get reminderId(): number {
        return this._reminderId;
    }

    get email(): string {
        return this._email;
    }

    get gsmNumber(): number {
        return this._gsmNumber;
    }

    get plantId(): number {
        return this._plantId;
    }

    get plant(): Plant | undefined {
        return this._plant;
    }

    set email(value: string) {
        this._email = value;
    }

    set gsmNumber(value: number) {
        this._gsmNumber = value
    }

    set plantId(value: number) {
        this._plantId = value
    }

    set plant(value: Plant | undefined) {
        this._plant = value
    }
}