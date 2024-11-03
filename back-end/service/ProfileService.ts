import { Profile } from "../model/Profile";
import { ProfileRepository } from "../repository/ProfileRepositoy";

export class ProfileService {
    private profileRepository: ProfileRepository;

    constructor() {
        this.profileRepository = new ProfileRepository();
    }

    async addProfile(profile: Profile): Promise<Profile> {
        return await this.profileRepository.add(profile);
    }

    async getProfile(profileId: number): Promise<Profile | undefined> {
        return await this.profileRepository.getById(profileId);
    }

    async getAllProfiles(): Promise<Profile[]> {
        return await this.profileRepository.getAll();
    }

    async updateProfile(profileId: number, data: any): Promise<Profile | undefined> {
        const existingProfile = await this.getProfile(profileId);
        if (existingProfile) {
            existingProfile.firstName = data.firstName || existingProfile.firstName;
            existingProfile.lastName = data.lastName || existingProfile.lastName;
            existingProfile.email = data.email || existingProfile.email;
            existingProfile.phoneNumber = data.phoneNumber || existingProfile.phoneNumber;
            return await this.profileRepository.update(existingProfile);
        }
        return undefined;
    }

    async deleteProfile(profileId: number): Promise<void> {
        return await this.profileRepository.delete(profileId);
    }
}