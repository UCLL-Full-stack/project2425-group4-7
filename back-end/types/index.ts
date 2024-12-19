export type Role = 'user' | 'premium' | 'admin';

export type PlantInput = {
    id?: number;
    name: string;
    type: string;
    family: string;
    wateringFreq: string;
    sunlight: string;
    email: boolean;
    sms: boolean;
    user: PlantUserInput;
    created: Date;
  };

export type PlantUserInput = {
    id: number;
    username?: string;
    password?: string;
    email?: string;
    profile?: Profile;
    role?: Role;
};

export interface Profile {
    id?: number;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string | null;
    userId?: number;
};

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