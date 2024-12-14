import { Plant } from "./plant";
import { Profile } from "./profile";


export class User {
    private id?: number;
    private username: string;
    private email: string;
    private password: string;
    private profile?: Profile;
    private plants?: Plant[];

    constructor(user: {
        id?: number;
        username: string;
        email: string;
        password: string;
        profile?: Profile;
        plants?: Plant[];
    }) {
        this.validate(user);

        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.profile = user.profile;
        this.plants = user.plants || [];
    }

    validate(user: {
        username: string;
        email: string;
        password: string;
    }) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (user.username.length < 3) {
            throw new Error("Username must be at least 3 characters long.");
        }
        if (user.password.length < 6) {
            throw new Error("Password must be at least 6 characters long.");
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!emailRegex.test(user.email)) {
            throw new Error("Email must have the correct format");
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getProfile(): Profile | undefined {
        return this.profile;
    }

    getPlants(): Plant[] {
        return this.plants ?? [];
    }

    addPlant(plant: Plant) {
        this.plants?.push(plant);
    }

}

