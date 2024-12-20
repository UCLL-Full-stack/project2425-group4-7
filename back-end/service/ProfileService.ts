import profileDB from '../repository/profile.db';
import { Profile } from '../model/Profile';

const addProfile = async (userId: number, data: { firstName: string; lastName: string; phoneNumber?: string }): Promise<Profile> => {
    try {
      return await profileDB.addProfile(userId, data);
    } catch (error) {
      throw new Error('Error while adding profile');
    }
  };

const editProfile = async (userId: number, data: { firstName: string; lastName: string; phoneNumber?: string }): Promise<Profile> => {
    try {
      return await profileDB.editProfile(userId, data);
    } catch (error) {
      throw new Error('Error while editing profile');
    }
  };

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

export default { getProfileByUserId, editProfile, addProfile };