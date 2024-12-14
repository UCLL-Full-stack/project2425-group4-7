export class Plant {
    private id: number;
    private name: string;
    private type: string;
    private family: string;
    private wateringFreq: string;
    private sunlight: string;
    private reminders: { email: boolean; sms: boolean };

    constructor(id: number, name: string, type: string, family: string, wateringFreq: string, sunlight: string, reminders: { email: boolean; sms: boolean }) {
        this.validate(name, type, family);
        this.id = id;
        this.name = name;
        this.type = type;
        this.family = family;
        this.wateringFreq = wateringFreq;
        this.sunlight = sunlight;
        this.reminders = reminders;
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

    getId(): number {
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

    getReminders(): { email: boolean; sms: boolean } {
        return this.reminders;
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

    setReminders(value: { email: boolean; sms: boolean }) {
        this.reminders = value;
    }
}