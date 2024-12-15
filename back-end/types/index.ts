import { Profile } from "@prisma/client";

export type Role = 'user' | 'staff' | 'admin';

export interface PlantDTO {
    plantType: string;
    family: string;
    wateringFreq: number;
    sunlight: string;
    reminders: string[];
    userId: number;
}

export type UserInput = {
    id?: number;
    username: string;
    password: string;
    email: string;
    profile?: Profile;
    role: Role;
};

export type AuthenticationResponse = {
    token: string;
    username: string;
    role: string;
  };