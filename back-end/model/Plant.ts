import { User } from "./User";

export class Plant {
    private id?: number;
    private name: string;
    private type: string;
    private family: string;
    private wateringFreq: string;
    private sunlight: string;
    private reminderEmail: boolean;
    private reminderSms: boolean;
    private user: User;
    private created: Date;

    constructor(plant: {id?: number, name: string, type: string, family: string, wateringFreq: string, sunlight: string, reminderEmail: boolean, reminderSms: boolean, user: User, created: Date}) {
        this.validate(plant.name, plant.type, plant.family);
        this.id = plant.id;
        this.name = plant.name;
        this.type = plant.type;
        this.family = plant.family;
        this.wateringFreq = plant.wateringFreq;
        this.sunlight = plant.sunlight;
        this.reminderEmail = plant.reminderEmail;
        this.reminderSms = plant.reminderSms;
        this.user = plant.user;
        this.created = plant.created || new Date();
    }

    validate(name: string, type: string, family: string) {
        if (!name || name.trim().length === 0) {
            this.setName("Unknown Plant");
        }
        if (!type || type.trim().length === 0) {
            throw new Error("Type of the plant is required");
        }
        if (!family || family.trim().length === 0) {
            throw new Error("Family of the plant is required");
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getType(): string {
        return this.type;
    }

    getFamily(): string {
        return this.family;
    }

    getWateringFreq(): string {
        return this.wateringFreq;
    }

    getSunlight(): string {
        return this.sunlight;
    }

    getreminderEmail(): boolean {
        return this.reminderEmail;
    }

    getreminderSms(): boolean {
        return this.reminderSms;
    }

    getUser(): User {
        return this.user;
    }

    getCreated(): Date {
        return this.created;
    }

    setId(value: number) {
        if (value <= 0) {
            throw new Error("Plant ID must be a positive number.");
        }
        this.id = value;
    }

    setName(value: string) {
        this.name = value;
    }

    setType(value: string) {
        if (!value) {
            throw new Error("Plant type cannot be empty.");
        }
        this.type = value;
    }

    setFamily(value: string) {
        if (!value) {
            throw new Error("Family cannot be empty.");
        }
        this.family = value;
    }

    setWateringFreq(value: string) {
        if (!value) {
            throw new Error("Watering frequency cannot be empty.");
        }
        this.wateringFreq = value;
    }

    setSunlight(value: string) {
        if (!value) {
            throw new Error("Sunlight cannot be empty.");
        }
        this.sunlight = value;
    }

    setreminderEmail(value: boolean) {
        this.reminderEmail = value;
    }

    setreminderSms(value: boolean) {
        this.reminderSms = value;
    }

    setUser(value: User) {
        this.user = value;
    }

    setCreated(value: Date) {
        this.created = value;
    }

    static from({ id, name, type, family, wateringFreq, sunlight, reminderEmail, reminderSms, user, created }: any): Plant {
        return new Plant({
            id,
            name,
            type,
            family,
            wateringFreq,
            sunlight,
            reminderEmail,
            reminderSms,
            user: User.from(user),
            created,
        });
    }
    
}