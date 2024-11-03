import { User } from "./User";

export class Profile{
    private _profileId: number;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _phoneNumber: number;
    private _userId: number;
    private _user?: User;

    constructor(profileId: number, firstName: string, lastName: string, email: string, phoneNumber:number, userId: number) {
        this._profileId = profileId;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._phoneNumber = phoneNumber;
        this._userId = userId;
    }

    get profileId(): number{
        return this._profileId
    }

    get firstName(): string {
        return this._firstName
    }

    get  lastName(): string {
        return this._lastName;
    }

    get email(): string{
        return this._email;
    }

    get phoneNumber(): number {
        return this._phoneNumber;
    }

    get userId(): number {
        return this._userId;
    }

    get user(): User | undefined {
        return this._user;
    }

    set profileId(value: number) {
        if (value <= 0) {
            throw new Error("Profile ID must be a positive number.");
        }
        this._profileId = value;
    }

    set firstName(value: string) {
        if (!value) {
            throw new Error("First name cannot be empty.");
        }
        this._firstName = value;
    }

    set lastName(value: string) {
        if (!value) {
            throw new Error("Last name cannot be empty.");
        }
        this._lastName = value;
    }

    set email(value: string) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            throw new Error("Invalid email format.");
        }
        this._email = value;
    }

    set phoneNumber(value: number) {
        if (value <= 0) {
            throw new Error("Phone number must be a positive number.");
        }
        this._phoneNumber = value;
    }

    set userId(value: number) {
        if (value <= 0) {
            throw new Error("User ID must be a positive number.");
        }
        this._userId = value;
    }

    set user(value: User | undefined) {
        this._user = value;
    }




}

