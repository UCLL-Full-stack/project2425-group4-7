export type Plant = {
    id?: number;
    name: string;
    type: string;
    family: string;
    wateringFreq: string;
    sunlight: string;
    email: boolean;
    sms: boolean;
    user: User;
    created: Date;
}

export type Role = 'user' | 'premium' | 'admin';

export type User = {
    username: string;
    password: string;
    email?: string;
    role?: Role;
    profile?: Profile;
};

export type Profile = {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    user: User;
}