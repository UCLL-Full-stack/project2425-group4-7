import { Reminder } from "./Reminders";
import { Soil } from "./Soil";
import { Sunlight } from "./Sunlight";
import { User } from "./User";
import { Water } from "./Water";

export class Plant {
    private _plantId: number;
    private _soort: string;
    private _familie: string;
    private _userId: number;
    private _user?: User;
    private _sunlight?: Sunlight;
    private _soil?: Soil;
    private _water?: Water;
    private _reminders: Reminder[] = [];

    constructor(plantId: number, soort: string, familie: string, userId:number) {
        this._plantId = plantId;
        this._soort = soort;
        this._familie = familie;
        this._userId = userId;
    }

    get plantId(): number {
        return this._plantId;
    }

    get soort(): string {
        return this._soort;
    }   

    get familie(): string {
        return this._familie;
    }   

    get userId(): number {
        return this._userId
    }

    get user(): User | undefined {
        return this._user
    }   

    get sunlight(): Sunlight | undefined {
        return this._sunlight;
    }  

    get soil(): Soil | undefined {
        return this._soil;
    }  

    get water(): Water | undefined {
        return this._water;
    }

    get reminders(): Reminder[] {
        return this._reminders;
    }

    set soort(value: string) {
        if (value === '') {
            throw new Error("Soort cannot be empty.")
        }
        this._soort = value
    }

    set familie(value: string) {
        this._familie = value;
    }

    set userId(value: number) {
        this._userId = value;
    }

    set user(value: User | undefined) {
        this._user = value;
    }

    set sunlight(value: Sunlight | undefined) {
        this._sunlight = value;
    }

    set soil(value: Soil | undefined) {
        this._soil = value
    }

    set water(value:Water | undefined) {
        this._water = value;
    }

    addReminder(reminder: Reminder) {
        this._reminders.push(reminder)
    }
}
