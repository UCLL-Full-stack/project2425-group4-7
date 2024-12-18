import { Plant } from "../model/Plant";
import { Reminder } from "../model/old/Reminders";
import { Soil } from "../model/Soil";
import { Sunlight } from "../model/Sunlight";
import { User } from "../model/User";
import { Water } from "../model/old/Water";

describe("Plant Class", () => {
    let plant: Plant;
    let mockUser: User;
    let mockWater: Water;
    let mockSoil: Soil;
    let mockSunlight: Sunlight;
    let mockReminder: Reminder;

    beforeEach(() => {
        mockUser = new User(1, "testUser", "securePassword");
        mockWater = new Water(1, 500, new Date("2024-11-01"), 10);
        mockSoil = new Soil(1, "Loam", new Date("2024-11-01"), new Date("2024-11-01"), 10)
        mockSunlight = new Sunlight(1, "Full Sun", 10);
        mockReminder = new Reminder(1, "test@example.com", 1234567890, 10);

        plant = new Plant(1, "Aloe Vera", "Succulent", 123);
    });

    test("should create a Plant object with the correct properties", () => {
        expect(plant.plantId).toBe(1);
        expect(plant.soort).toBe("Aloe Vera");
        expect(plant.familie).toBe("Succulent")
        expect(plant.userId).toBe(123)
    });

    test("should allow setting and getting user", () => {
        plant.user = mockUser;
        expect(plant.user).toBe(mockUser);
    });

    test("should allow setting and getting water", () => {
        plant.water = mockWater;
        expect(plant.water).toBe(mockWater);
    });

    test("should allow setting and getting soil", () => {
        plant.soil = mockSoil;
        expect(plant.soil).toBe(mockSoil);
    });

    test("should allow setting and getting sunlight", () => {
        plant.sunlight = mockSunlight;
        expect(plant.sunlight).toBe(mockSunlight);
    });

    test("should allow adding reminders", () => {
        plant.addReminder(mockReminder);
        expect(plant.reminders.length).toBe(1);
        expect(plant.reminders[0]).toBe(mockReminder);
    });

    test("should throw an error when setting soort to an empty string", () => {
        expect(() => { plant.soort = ""; }).toThrowError("Soort cannot be empty.");
    });
})