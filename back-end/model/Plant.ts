export class Plant {
    private _plantId: number;
    private _plantType: string;
    private _family: string;
    private _wateringFreq: string;
    private _sunlight: string;
    private _reminders: { email: boolean; sms: boolean };

    constructor(plantId: number, plantType: string, family: string, wateringFreq: string, sunlight: string, reminders: { email: boolean; sms: boolean }) {
        this._plantId = plantId;
        this._plantType = plantType;
        this._family = family;
        this._wateringFreq = wateringFreq;
        this._sunlight = sunlight;
        this._reminders = reminders;
    }

    get plantId(): number {
        return this._plantId;
    }

    get plantType(): string {
        return this._plantType;
    }

    get family(): string {
        return this._family;
    }

    get wateringFreq(): string {
        return this._wateringFreq;
    }

    get sunlight(): string {
        return this._sunlight;
    }

    get reminders(): { email: boolean; sms: boolean } {
        return this._reminders;
    }

    set plantId(value: number) {
        if (value <= 0) {
            throw new Error("Plant ID must be a positive number.");
        }
        this._plantId = value;
    }

    set plantType(value: string) {
        if (!value) {
            throw new Error("Plant type cannot be empty.");
        }
        this._plantType = value;
    }

    set family(value: string) {
        if (!value) {
            throw new Error("Family cannot be empty.");
        }
        this._family = value;
    }

    set wateringFreq(value: string) {
        if (!value) {
            throw new Error("Watering frequency cannot be empty.");
        }
        this._wateringFreq = value;
    }

    set sunlight(value: string) {
        if (!value) {
            throw new Error("Sunlight cannot be empty.");
        }
        this._sunlight = value;
    }

    set reminders(value: { email: boolean; sms: boolean }) {
        this._reminders = value;
    }
}