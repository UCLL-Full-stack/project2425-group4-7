import { User } from '../../model/User';
import { Profile } from '../../model/Profile';
import { Plant } from '../../model/Plant';
import { Role } from '../../types';

describe('User Domain Model', () => {
    let profile: Profile;
    let plant: Plant;
    let user: User;

    beforeEach(() => {
        profile = new Profile(1, "John", "Doe", 1, "1234567890");
        
        user = new User({
            id: 1,
            username: "John Doe",
            email: "john@example.com",
            password: "password123",
            role: "user",
            profile,
            plants: [],
        });

        
        plant = new Plant({
            id: 1,
            name: "Aloe Vera",
            type: "Succulent",
            family: "Asphodelaceae",
            wateringFreq: "Weekly",
            sunlight: "Indirect",
            reminderEmail: true,
            reminderSms: false,
            user,
            created: new Date(),
        });
    });

    test('should create a User object with valid input', () => {
        const user = new User({
            id: 1,
            username: "John Doe",
            email: "john@example.com",
            password: "john123",
            role: "user",
            profile,
            plants: [plant],
        });

        expect(user.getUsername()).toBe("John Doe");
        expect(user.getEmail()).toBe("john@example.com");
        expect(user.getProfile()).toBe(profile);
        expect(user.getPlants()).toHaveLength(1);
        expect(user.getPlants()[0].getName()).toBe("Aloe Vera");
    });

    test('should throw an error if username is missing', () => {
        expect(() => {
            new User({
                username: "",
                email: "john@example.com",
                password: "password123",
                role: "user",
            });
        }).toThrow("Username is required");
    });

    test('should throw an error if username is too short', () => {
        expect(() => {
            new User({
                username: "Jo",
                email: "john@example.com",
                password: "password123",
                role: "user",
            });
        }).toThrow("Username must be at least 3 characters long.");
    });

    test('should throw an error if email is missing', () => {
        expect(() => {
            new User({
                username: "John Doe",
                email: "",
                password: "password123",
                role: "user",
            });
        }).toThrow("Email is required");
    });

    test('should throw an error if email format is incorrect', () => {
        expect(() => {
            new User({
                username: "John Doe",
                email: "not-an-email",
                password: "password123",
                role: "user",
            });
        }).toThrow("Email must have the correct format");
    });

    test('should throw an error if password is missing', () => {
        expect(() => {
            new User({
                username: "John Doe",
                email: "john@example.com",
                password: "",
                role: "user",
            });
        }).toThrow("Password must be at least 6 characters long.");
    });

    test('should throw an error if password is too short', () => {
        expect(() => {
            new User({
                username: "John Doe",
                email: "john@example.com",
                password: "12345",
                role: "user",
            });
        }).toThrow("Password must be at least 6 characters long.");
    });

    test('should add a plant to the User object', () => {
        user.addPlant(plant);

        expect(user.getPlants()).toContain(plant);
    });

    test('should create a User object from Prisma User object', () => {
        const prismaUser = {
            id: 1,
            username: "John Doe",
            email: "john@example.com",
            password: "password123",
            role: "user",
            plants: [plant],
            profile,
        };

        const userFromPrisma = User.from(prismaUser);

        expect(userFromPrisma.getId()).toBe(prismaUser.id);
        expect(userFromPrisma.getUsername()).toBe(prismaUser.username);
        expect(userFromPrisma.getEmail()).toBe(prismaUser.email);
        expect(userFromPrisma.getPassword()).toBe(prismaUser.password);
        expect(userFromPrisma.getRole()).toBe(prismaUser.role);
        expect(userFromPrisma.getPlants()).toEqual(prismaUser.plants);
        expect(userFromPrisma.getProfile()).toBe(prismaUser.profile);
        
    });

    test('should handle missing plants and profile in Prisma User object', () => {
        const prismaUser = {
            id: 1,
            username: "John Doe",
            email: "john@example.com",
            password: "password123",
            role: "user",
        };

        const userFromPrisma = User.from(prismaUser as any);

        expect(userFromPrisma.getPlants()).toEqual([]);
        expect(userFromPrisma.getProfile()).toBeUndefined();
    });
});
