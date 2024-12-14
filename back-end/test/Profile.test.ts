import { Profile } from "../model/profile";
import { User } from "../model/user";

describe("Profile Class", () => {
    let profile: Profile;
    let mockUser: User;

    beforeEach(() => {
        mockUser = new User(1, "testuser", "password123");
        profile = new Profile(1, "Max", "Boom", "max.boom@example", 1234567890, mockUser.userId);
        profile.user = mockUser;
    });

    test("should create a Profile object with the correct properties", () => {
        expect(profile.profileId).toBe(1);
        expect(profile.firstName).toBe("Max")
        expect(profile.lastName).toBe("Boom")
        expect(profile.phoneNumber).toBe(1234567890);
        expect(profile.userId).toBe(mockUser.userId);
        expect(profile.user).toBe(mockUser);
    });

    test("should allow updating the profile properties", () => {
        profile.firstName = "Mats";
        profile.lastName = "Stam";
        expect(profile.firstName).toBe("Mats")
        expect(profile.lastName).toBe("Stam")
    });
});