import { User } from "./user";

export class Plant {
    private id?: number;
    private name: string;
    private type: string;
    private family: string;
    private wateringFreq: string;
    private sunlight: string;
    private email: boolean;
    private sms: boolean;
    private user: User;
    private created: Date;

    constructor(plant: {id?: number, name: string, type: string, family: string, wateringFreq: string, sunlight: string, email: boolean, sms: boolean, user: User, created: Date}) {
        this.validate(plant.name, plant.type, plant.family);
        this.id = plant.id;
        this.name = plant.name;
        this.type = plant.type;
        this.family = plant.family;
        this.wateringFreq = plant.wateringFreq;
        this.sunlight = plant.sunlight;
        this.email = plant.email;
        this.sms = plant.sms;
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

    getEmail(): boolean {
        return this.email;
    }

    getSms(): boolean {
        return this.sms;
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

    setEmail(value: boolean) {
        this.email = value;
    }

    setSms(value: boolean) {
        this.sms = value;
    }

    setUser(value: User) {
        this.user = value;
    }

    setCreated(value: Date) {
        this.created = value;
    }

    static from({ id, name, type, family, wateringFreq, sunlight, email, sms, user, created }: any): Plant {
        if (!user) {
            throw new Error("Plant doesnt have a user");
        }
        return new Plant({
            id,
            name,
            type,
            family,
            wateringFreq,
            sunlight,
            email,
            sms,
            user: User.from(user),
            created,
        });
    }
    
}