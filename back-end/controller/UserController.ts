import { User } from "../model/User";
import { UserService } from "../service/UserService";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async addUser(data : any): Promise<User> {
        const {userId, username, password } = data;
        const newUser = new User(userId, username, password)
        return await this.userService.addUser(newUser);
    }

    async getUser(userId: number): Promise<User | undefined> {
        return await this.userService.getUser(userId);
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userService.getAllUsers()
    }

    async updateUser(userId: number, data: any): Promise<User | undefined> {
        return await this.userService.updateUser(userId, data);
    }

    async deleteUser(userId: number): Promise<void> {
        return await this.userService.deleteUser(userId);
    }
}
