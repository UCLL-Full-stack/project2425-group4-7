import { Plant } from "./Plant";
import { Profile } from "./Profile";


export class User {
    private _userId: number;
    private _username: string;
    private _password: string;
    private _profile?: Profile;
    private _plants : Plant[] = [];

    constructor(userId: number, username: string, password:string) {
        this._userId = userId;
        this._username = username;
        this._password = password;
    }

    get userId(): number {
        return this._userId;
    }

    get username(): string {
        return this._username
    }

    get password(): string {
        return this._password;
    }

    get profile(): Profile | undefined {
        return this._profile;
    }

    get plants(): Plant[] {
        return this._plants;
    }

    set username(value: string) {
        if (value.length < 3) {
            throw new Error("Username must be at least 3 characters long.")
        }
        this._username = value;
    }

    set password(value: string) {
        if (value.length < 6) {
            throw new Error("Password must be at least 6 characters long.")
        }
        this._password = value;
    }

    set profile(value: Profile | undefined) {
        this._profile = value;
    }

    addPlant(plant: Plant) {
        this._plants.push(plant);
    }

}

