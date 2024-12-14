import { Plant } from "../model/plant";
import { Soil } from "../model/Soil";

describe("Soil Class", () => {
    let soil: Soil;
    let mockPlant: Plant;

    beforeEach(() => {
        mockPlant = new Plant(1, "Aloe Vera", "Succulent", 123);
        soil = new Soil(1, "Loamy", new Date("2024-11-01"),new Date("2024-11-10"), mockPlant.plantId);
        soil.plant = mockPlant;
    });

    test("should create a Soil object with the correct properties", () => {
        expect(soil.soilId).toBe(1);
        expect(soil.type).toBe("Loamy")
        expect(soil.refreshing).toEqual(new Date("2024-11-01"));
        expect(soil.fertilizing).toEqual(new Date("2024-11-10"));
        expect(soil.plantId).toBe(mockPlant.plantId);
        expect(soil.plant).toBe(mockPlant);
    });

    test("should allow updating the soil properties", () => {
        soil.type = 'Sandy';
        soil.refreshing = new Date("2024-12-01");
        soil.fertilizing = new Date("2024-12-10");

        expect(soil.type).toBe("Sandy");
        expect(soil.refreshing).toEqual(new Date("2024-12-01"));
        expect(soil.fertilizing).toEqual(new Date("2024-12-10"));
    });
});