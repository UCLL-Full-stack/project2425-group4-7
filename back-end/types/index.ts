import { Profile } from "@prisma/client";

export type Role = 'user' | 'premium' | 'admin';

export type PlantInput = {
    id?: number;
    name?: string;
    type: string;
    family: string;
    wateringFreq?: string;
    sunlight?: string;
    email: boolean;
    sms: boolean;
    user: UserInput;
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