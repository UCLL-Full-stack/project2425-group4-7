import { Profile } from '../model/profile';
import database from './database';

const editProfile = async (userId: number, { firstName, lastName, phoneNumber }: { firstName: string, lastName: string, phoneNumber?: string }): Promise<Profile> => {
    try {
        const profilePrisma = await database.profile.findUnique({
            where: { userId },
        });
        if (!profilePrisma) {
            throw new Error(`Profile: ${userId} not found`);
        }
        if (firstName) profilePrisma.firstName = firstName;
        if (lastName) profilePrisma.lastName = lastName;
        if (phoneNumber) profilePrisma.phoneNumber = phoneNumber;

        const editedProfilePrisma = await database.profile.update({
            where: { userId },
            data: profilePrisma,
        });
        return new Profile(editedProfilePrisma.id, editedProfilePrisma.firstName, editedProfilePrisma.lastName, editedProfilePrisma.userId, editedProfilePrisma.phoneNumber ?? "");
    } catch (error) {
        console.error(error);
        throw new Error('Error while updating profile');
    }
};

const getProfileByUserId = async ({ userId }: { userId: number }): Promise<Profile | null> => {
    try {
        const profilePrisma = await database.profile.findUnique({
            where: { userId },
        });

        return profilePrisma ? new Profile(profilePrisma.id, profilePrisma.firstName, profilePrisma.lastName, profilePrisma.userId, profilePrisma.phoneNumber ?? "") : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error');
    }
};

const addProfile = async (userId: number, { firstName, lastName, phoneNumber }: { firstName: string, lastName: string, phoneNumber?: string }): Promise<Profile> => {
    try {
        const newProfilePrisma = await database.profile.create({
            data: {
                firstName,
                lastName,
                phoneNumber,
                userId,
            },
        });
        return new Profile(newProfilePrisma.id, newProfilePrisma.firstName, newProfilePrisma.lastName, newProfilePrisma.userId, newProfilePrisma.phoneNumber ?? "");
    } catch (error) {
        console.error(error);
        throw new Error('Database error');
    }
};

export default {
    editProfile,
    addProfile,
    getProfileByUserId
};