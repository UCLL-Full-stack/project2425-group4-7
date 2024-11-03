import { User } from "../model/User";

export class UserRepository {
    private users: User[] = [];

    async add(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }

    async getById(userId: number): Promise<User | undefined> {
        return this.users.find(u => u.userId === userId);
    }

    async getAll(): Promise<User[]> {
        return this.users
    }

    async update(user: User): Promise<User>{
        return user
    }

    async delete(userId: number): Promise<void> {
        this.users = this.users.filter(u => u.userId !== userId);
    }
    async findByUsername(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}