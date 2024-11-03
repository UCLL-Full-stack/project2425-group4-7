import { User } from "../model/User";
import { UserRepository } from "../repository/UserRepository";

export class UserService {
    private userRepository : UserRepository

    constructor() {
        this.userRepository = new UserRepository();
    }

    async addUser(user: User): Promise<User> {
        const existingUser = await this.userRepository.findByUsername(user.username);
        if (existingUser) {
            throw new Error("A user with this username already exists.");
        }
        return await this.userRepository.add(user);
    }

    async getUser(userId: number): Promise< User | undefined> {
        return await this.userRepository.getById(userId);
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.getAll()
    }

    async updateUser(userId: number, data: any): Promise<User | undefined> {
        const existingUser = await this.getUser(userId);
        if (existingUser) {
            if (data.username && data.username.length < 3) {
                throw new Error("Username must be at least 3 characters long.");
            }
            if (data.password && data.password.length < 6) {
                throw new Error("Password must be at least 6 characters long.");
            }
            existingUser.username = data.username || existingUser.username;
            existingUser.password = data.password || existingUser.password;
            return await this.userRepository.update(existingUser);
        }
        return undefined;
    }

    async deleteUser(userId: number): Promise<void> {
        return await this.userRepository.delete(userId);
    }
}