import { User } from "./User";

export class Profile{
    private id: number;
    private firstName: string;
    private lastName: string;
    private phoneNumber?: string;
    private userId: number;
    private user?: User;

    constructor(id: number, firstName: string, lastName: string, userId: number, phoneNumber?: string) {
        this.validate(firstName, lastName);
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.userId = userId;
    }

    validate(firstName: string, lastName: string) {
        if (!firstName || firstName.trim().length === 0) {
            throw new Error("First name is required");
        }
        if (!lastName || lastName.trim().length === 0) {
            throw new Error("Last name is required");
        }
    }

    getId(): number {
        return this.id;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getPhoneNumber(): string | undefined {
        return this.phoneNumber;
    }

    getUserId(): number {
        return this.userId;
    }

    getUser(): User | undefined {
        return this.user;
    }

    setFirstName(value: string) {
        if (!value.trim()) {
            throw new Error("Firstname is required");
        }
        this.firstName = value;
    }

    setLastName(value: string) {
        if (!value.trim()) {
            throw new Error("Lastname is required");
        }
        this.lastName = value;
    }

    setPhoneNumber(value: string | undefined) {
        this.phoneNumber = value;
    }
}