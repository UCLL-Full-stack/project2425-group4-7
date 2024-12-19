import profileDB from '../repository/profile.db';
import { Profile } from '../model/profile';

const getProfileByUserId = async (userId: number): Promise<Profile | null> => {
    try {
        const profile = await profileDB.getProfileByUserId({ userId });
        if (!profile) {
            return null;
        }
        return profile;
    } catch (error) {
        throw new Error('Error getting profile');
    }
};

export default { getProfileByUserId };