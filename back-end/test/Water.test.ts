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
});
