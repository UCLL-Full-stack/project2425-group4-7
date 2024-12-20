import { Profile } from '../model/Profile';
import { User } from '../model/User';
import { Role } from '../types';
import database from './database';
import bcrypt from 'bcrypt';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: {
                profile: true,
            }
        });
        return usersPrisma.map((userPrisma) => {
            const profile = userPrisma.profile ? new Profile(
                userPrisma.profile.id,
                userPrisma.profile.firstName,
                userPrisma.profile.lastName,
                userPrisma.profile.userId,
                userPrisma.profile.phoneNumber ?? ""
            ) : undefined;
            const role: Role = userPrisma.role as Role;
            return new User({
                id: userPrisma.id,
                username: userPrisma.username,
                email: userPrisma.email,
                password: userPrisma.password,
                role: role,
                profile: profile,
            });
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error');
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error');
    }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { username },
            include: {
                profile: true,
            }
        });

        if (!userPrisma) return null;
        const profile = userPrisma.profile ? new Profile(userPrisma.profile.id, userPrisma.profile.firstName, userPrisma.profile.lastName, userPrisma.profile.userId, userPrisma.profile.phoneNumber ?? "") : undefined;
        const role: Role = userPrisma.role as Role;
        return new User({
            id: userPrisma.id,
            username: userPrisma.username,
            email: userPrisma.email,
            password: userPrisma.password,
            role: role,
            profile: profile
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error');
    }
};

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                username: user.getUsername(),
                password: user.getPassword(),
                email: user.getEmail(),
                role: user.getRole(),
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error');
    }
};

const getProfileByUserId = async ({ userId }: { userId: number }): Promise<Profile | null> => {
    try {
        const profilePrisma = await database.profile.findUnique({
            where: { userId },
            include: {
                user: true,
            },
        });
        const phoneNumber = profilePrisma?.phoneNumber ?? "";
        return profilePrisma
            ? new Profile(profilePrisma.id, profilePrisma.firstName, profilePrisma.lastName, profilePrisma.userId, phoneNumber)
            : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error while fetching profile');
    }
};

const editUser = async (id: number, { username, password, email, role }: { username: string, password?: string, email: string, role: string }): Promise<User> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
        });
        if (!userPrisma) {
            throw new Error(`User: ${id} not found`);
        }
        if (username) userPrisma.username = username;
        if (email) userPrisma.email = email;
        if (role) userPrisma.role = role;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 12);
            userPrisma.password = hashedPassword;
        }
        const updatedUserPrisma = await database.user.update({
            where: { id },
            data: userPrisma,
        });
        return User.from(updatedUserPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database Error');
    }
};

export default {
    getAllUsers,
    createUser,
    getUserById,
    getUserByUsername,
    getProfileByUserId,
    editUser,
};
