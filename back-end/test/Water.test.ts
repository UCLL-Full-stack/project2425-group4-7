import { Water } from "../model/Water";
import { Plant } from "../model/Plant";

describe("Water Class", () => {
    let water: Water;
    let mockPlant: Plant;

    beforeEach(() => {
        mockPlant = new Plant(1, "Aloe Vera", "Succulent", 123);
        water = new Water(1, 500, new Date("2024-11-01"), 10);
    });

    test("should create a Water object with the correct properties", () => {
        expect(water.waterId).toBe(1);
        expect(water.quantity).toBe(500);
        expect(water.when).toEqual(new Date("2024-11-01"));
        expect(water.plantId).toBe(10);
    });

    test("should not allow modification of readonly properties", () => {
        expect(water.waterId).toBe(1); 
        expect(water.plantId).toBe(10); 
        water.plant = mockPlant; 
        expect(water.plant).toEqual(mockPlant); 
    });

    test("should throw an error if quantity is zero or negative", () => {
        expect(() => new Water(1, 0, new Date("2024-11-01"), 10)).toThrow("Quantity must be a positive number.");
        expect(() => new Water(1, -10, new Date("2024-11-01"), 10)).toThrow("Quantity must be a positive number.");
    });
    
    test("should throw an error if 'when' is not a valid date", () => {
        expect(() => new Water(1, 500, new Date("invalid date"), 10)).toThrow("Invalid date for 'when'.");
    });

    test("should throw an error when setting quantity to a non-positive number", () => {
        expect(() => {
            water.quantity = -1;
        }).toThrow("Quantity must be a positive number.");
    });
    
    test("should throw an error when setting 'when' to an invalid date", () => {
        expect(() => {
            water.when = new Date("invalid date");
        }).toThrow("Invalid date for 'when'.");
    });
    
    
});
