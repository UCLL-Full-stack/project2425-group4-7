import { Profile } from "../model/Profile";
import { ProfileRepository } from "../repository/ProfileRepositoy";

export class ProfileService {
    private profileRepository: ProfileRepository;

    constructor() {
        this.profileRepository = new ProfileRepository();
    }

    async addProfile(profile: Profile): Promise<Profile> {
        if (!profile.firstName || !profile.lastName || !profile.email || profile.phoneNumber <= 0 || profile.userId <= 0) {
            throw new Error("Invalid profile data. Please provide a valid first name, last name, email, phone number, and user ID.");
        }
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
            if (data.firstName) {
                existingProfile.firstName = data.firstName;}
            if (data.lastName) {
                existingProfile.lastName = data.lastName;}
            if (data.email) {
                existingProfile.email = data.email;}
            if (data.phoneNumber) {
                existingProfile.phoneNumber = data.phoneNumber;}
            if (data.userId) {
                existingProfile.userId = data.userId;}
            return await this.profileRepository.update(existingProfile);
        }
        return undefined;
    }

    async deleteProfile(profileId: number): Promise<void> {
        return await this.profileRepository.delete(profileId);
    }
}