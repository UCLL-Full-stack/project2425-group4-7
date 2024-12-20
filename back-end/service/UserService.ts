import bcrypt from 'bcrypt';
import userDB from '../repository/user.db';
import profileDB from '../repository/profile.db';
import { AuthenticationResponse, UserInput } from '../types';
import { generateJwtToken } from '../util/jwt';
import { User } from '../model/User';
import { Profile } from '../model/Profile';

const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    console.log("Received username in service:", username);
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const getUserById = async ({ id }: {id: number}): Promise<User> => {
    const user = await userDB.getUserById({ id });
    if (!user) {
        throw new Error(`User with id: ${id} does not exist.`);
    }
    return user;
}

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username: username,
        role: user.getRole(),
    };
};


const createUser = async ({
    username,
    password,
    email,
    role,
}: UserInput): Promise<User> => {
    const existingUser = await userDB.getUserByUsername({ username });

    if (existingUser) {
        throw new Error(`User with username ${username} is already registered.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword, email, role });

    return await userDB.createUser(user);
};

const editUser = async (id: number, { username, password, email, profile }: UserInput): Promise<User> => {
    const user = await userDB.getUserById({ id });
    if (!user) {
        throw new Error(`User with id: ${id} does not exist.`);
    }
    user.setUsername(username);
    user.setEmail(email);
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 12);
        user.setPassword(hashedPassword);
    }
    if (profile) {
        let existingProfile = await userDB.getProfileByUserId({ userId: id });

        if (!existingProfile) {
            existingProfile = new Profile(id, profile.firstName ?? "", profile.lastName ?? "", id, profile.phoneNumber ?? "");
            const createdProfileData = {
                firstName: existingProfile.getFirstName(),
                lastName: existingProfile.getLastName(),
                phoneNumber: existingProfile.getPhoneNumber()
            };
            await profileDB.addProfile(id, createdProfileData);
        } else {
            existingProfile.setFirstName(profile.firstName ?? "");
            existingProfile.setLastName(profile.lastName ?? "");
            existingProfile.setPhoneNumber(profile.phoneNumber ?? "");

            const updatedProfileData = {
                firstName: existingProfile.getFirstName(),
                lastName: existingProfile.getLastName(),
                phoneNumber: existingProfile.getPhoneNumber()
            };

            await profileDB.editProfile(id, updatedProfileData);
        }
    }

    const updatedUser = await userDB.editUser(id, {
        username: user.getUsername(),
        password: user.getPassword(),
        email: user.getEmail(),
        role: user.getRole(),
    });

    return updatedUser;
};

const editPassword = async (userId: number, newPassword: string): Promise<User> => {
    const user = await userDB.getUserById({ id: userId });
    if (!user) {
        throw new Error();
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.setPassword(hashedPassword);
    const updatedUser = await userDB.editUser(userId, {
        username: user.getUsername(),
        password: user.getPassword(),
        email: user.getEmail(),
        role: user.getRole(),
    });
    return updatedUser;
};

export default { getUserByUsername, authenticate, createUser, getAllUsers, getUserById, editUser, editPassword };
