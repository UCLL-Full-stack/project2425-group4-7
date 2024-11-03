import { Profile } from "../model/Profile";

export class ProfileRepository {
    private profiles: Profile[] = [];

    async add(profile: Profile): Promise<Profile> {
        this.profiles.push(profile);
        return profile;
    }

    async getById(profileId: number): Promise<Profile | undefined> {
        return this.profiles.find(p => p.profileId === profileId);
    }

    async getAll(): Promise<Profile[]> {
        return this.profiles;
    }

    async update(profile: Profile): Promise<Profile> {
        return profile;
    }

    async delete(profileId: number): Promise<void> {
        this.profiles = this.profiles.filter(p => p.profileId !== profileId);
    }
    
}