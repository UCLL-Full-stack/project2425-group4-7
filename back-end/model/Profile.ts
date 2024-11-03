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

    set firstName(value: string) {
        this._firstName = value;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    set email(value: string) {
        this._email = value;
    }

    set phoneNumber(value: number) {
        this._phoneNumber = value;
    }

    set userId(value: number) {
        this._userId = value;
    }

    set user(value: User | undefined) {
        this._user = value;
    }




}

