import { Profile } from '../../model/Profile';
import { User } from '../../model/User';

describe('Profile Domain Model', () => {
    let user: User;

    beforeEach(() => {
        user = new User({
            id: 1,
            username: "John Doe",
            email: "john@example.com",
            password: "john123",
            role: "user",
        });
    });

    test('should create a Profile object with valid input', () => {
        const profile = new Profile(1, "John", "Doe", Number(user.getId()), "1234567890");

        expect(profile.getId()).toBe(1);
        expect(profile.getFirstName()).toBe("John");
        expect(profile.getLastName()).toBe("Doe");
        expect(profile.getPhoneNumber()).toBe("1234567890");
        expect(profile.getUserId()).toBe(user.getId());
    });

    test('should throw an error if first name is missing', () => {
        expect(() => {
            new Profile(1, "", "Doe", Number(user.getId()), "1234567890");
        }).toThrow("First name is required");
    });

    test('should throw an error if last name is missing', () => {
        expect(() => {
            new Profile(1, "John", "", Number(user.getId()), "1234567890");
        }).toThrow("Last name is required");
    });

    test('should create a Profile without a phone number', () => {
        const profile = new Profile(1, "John", "Doe", Number(user.getId()));

        expect(profile.getPhoneNumber()).toBeUndefined();
    });

    test('should allow setting and getting properties', () => {
        const profile = new Profile(1, "John", "Doe", Number(user.getId()));

        profile.setFirstName("Jane");
        profile.setLastName("Smith");
        profile.setPhoneNumber("9876543210");

        expect(profile.getFirstName()).toBe("Jane");
        expect(profile.getLastName()).toBe("Smith");
        expect(profile.getPhoneNumber()).toBe("9876543210");
    });

    test('should throw an error when setting an invalid first name', () => {
        const profile = new Profile(1, "John", "Doe", Number(user.getId()));

        expect(() => profile.setFirstName("")).toThrow("Firstname is required");
    });

    test('should throw an error when setting an invalid last name', () => {
        const profile = new Profile(1, "John", "Doe",Number(user.getId()));

        expect(() => profile.setLastName("")).toThrow("Lastname is required");
    });
});
