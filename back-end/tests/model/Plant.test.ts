import { Plant } from '../../model/Plant';
import { User } from '../../model/User';

describe('Plant Domain Model', () => {
    let user: User;

    beforeEach(() => {
        user = new User({
            id: 1,
            username: "John Doe",
            email: "john@example.com",
            password: "john123",
            role: `user`,
        });
    });

    test('should create a Plant object with valid input', () => {
        const plant = new Plant({
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

        expect(plant.getName()).toBe("Aloe Vera");
        expect(plant.getType()).toBe("Succulent");
        expect(plant.getUser()).toBe(user);
    });

    test('should throw an error if type is missing', () => {
        expect(() => {
            new Plant({
                name: "Aloe Vera",
                type: "",
                family: "Asphodelaceae",
                wateringFreq: "Weekly",
                sunlight: "Indirect",
                reminderEmail: true,
                reminderSms: false,
                user,
                created: new Date(),
            });
        }).toThrow("Type of the plant is required");
    });

    test('should throw an error if family is missing', () => {
        expect(() => {
            new Plant({
                name: "Aloe Vera",
                type: "Succulent",
                family: "",
                wateringFreq: "Weekly",
                sunlight: "Indirect",
                reminderEmail: true,
                reminderSms: false,
                user,
                created: new Date(),
            });
        }).toThrow("Family of the plant is required");
    });

    test('should allow setting and getting properties', () => {
        const plant = new Plant({
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

        plant.setName("Snake Plant");
        plant.setType("Evergreen");
        plant.setWateringFreq("Monthly");

        expect(plant.getName()).toBe("Snake Plant");
        expect(plant.getType()).toBe("Evergreen");
        expect(plant.getWateringFreq()).toBe("Monthly");
    });

    test('should throw an error when setting an invalid ID', () => {
        const plant = new Plant({
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

        expect(() => plant.setId(-1)).toThrow("Plant ID must be a positive number.");
    });

    test('should create a Plant object from a plain object', () => {
        const plant = Plant.from({
            id: 1,
            name: "Aloe Vera",
            type: "Succulent",
            family: "Asphodelaceae",
            wateringFreq: "Weekly",
            sunlight: "Indirect",
            email: true,
            sms: false,
            user: {
                id: 1,
                username: "John Doe",
                email: "john@example.com",
                password: "john123",
                role: `user`,
            },
            created: new Date(),
        });

        expect(plant.getName()).toBe("Aloe Vera");
        expect(plant.getUser().getUsername()).toBe("John Doe");
    });

    test('should throw an error if user is missing when using from()', () => {
        expect(() => {
            Plant.from({
                id: 1,
                name: "Aloe Vera",
                type: "Succulent",
                family: "Asphodelaceae",
                wateringFreq: "Weekly",
                sunlight: "Indirect",
                email: true,
                sms: false,
                created: new Date(),
            });
        }).toThrow("Username is required");
    });
});
