import { Plant } from "./Plant";
import { Profile } from "./profile";
import { Role } from '../types';
import { User as UserPrisma } from '@prisma/client';

export class User {
    private id?: number;
    private username: string;
    private email: string;
    private password: string;
    private role: Role;
    private profile?: Profile;
    private plants?: Plant[];

    constructor(user: {
        id?: number;
        username: string;
        email: string;
        password: string;
        role: Role;
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
        this.role = user.role;
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

    getRole(): Role {
        return this.role;
    }

    addPlant(plant: Plant) {
        this.plants?.push(plant);
    }

    setUsername(value: string) {
        if (!value) {
            throw new Error("Username is required");
        }
        this.username = value;
    }

    setEmail(value: string) {
        if (!value) {
            throw new Error("Email is required");
        }
        this.email = value;
    }

    setPassword(value: string) {
        if (!value) {
            throw new Error("Password is required");
        }
        this.password = value;
    }

    static from(userPrisma: UserPrisma & { plants?: Plant[]; profile?: Profile } | null): User {
        if (!userPrisma) {
            throw new Error('User may not be null');
        }
    
        if (!userPrisma.username) {
            throw new Error('Username is missing');
        }
    
        return new User({
            id: userPrisma.id,
            username: userPrisma.username || "",
            email: userPrisma.email || "",
            password: userPrisma.password || "",
            role: userPrisma.role as Role,
            plants: userPrisma.plants?.map(Plant.from),
            profile: userPrisma.profile,
        });
    }
}

