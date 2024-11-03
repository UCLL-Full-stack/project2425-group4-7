import { Profile } from "../model/Profile";
import { ProfileService } from "../service/ProfileService";

export class ProfileController {
    private profileService: ProfileService;

    constructor() {
        this.profileService = new ProfileService();
    }

    async addProfile(data: any): Promise<Profile> {
        const { profileId, firstName, lastName, email, phoneNumber, userId} = data;
        const newProfile = new Profile(profileId, firstName, lastName, email,phoneNumber, userId);
        return await this.profileService.addProfile(newProfile);
    }

    async getProfile(profileId: number): Promise<Profile | undefined > {
        return await this.profileService.getProfile(profileId);
    }

    async getAllProfiles(): Promise<Profile[]> {
        return await this.profileService.getAllProfiles();
    }

    async updateProfile(profileId: number, data:any): Promise<Profile | undefined> {
        return await this.profileService.updateProfile(profileId, data);
    }

    async deleteProfile(profileId: number): Promise<void> {
        return await this.profileService.deleteProfile(profileId);
    }
}