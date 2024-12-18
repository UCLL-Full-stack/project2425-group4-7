import { Plant } from "../model/Plant";
import { Reminder } from "../model/old/Reminders";

describe("Reminder Class", () => {
    let reminder: Reminder;
    let mockPlant: Plant;

    beforeEach(() => {
        mockPlant = new Plant(1, "Aloe Vera", "Succulent", 123)
        reminder = new Reminder(1, "Max.boom@example.com", 1234567890, mockPlant.plantId)
        reminder.plant = mockPlant;
    });

    test("should create a Reminder object with the correct properties", () => {
        expect(reminder.reminderId).toBe(1);
        expect(reminder.email).toBe("Max.boom@example.com");
        expect(reminder.gsmNumber).toBe(1234567890);
        expect(reminder.plantId).toBe(mockPlant.plantId);
        expect(reminder.plant).toBe(mockPlant);
    });

    test("should allow updating the reminder properties", () => {
        reminder.email = "Mats.stam@example.com";
        reminder.gsmNumber = 9876543210;
        expect(reminder.email).toBe("Mats.stam@example.com")
        expect(reminder.gsmNumber).toBe(9876543210)
    })
})