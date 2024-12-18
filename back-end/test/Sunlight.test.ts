import { Plant } from "../model/Plant";
import { Sunlight } from "../model/Sunlight";

describe("Sunlight Class", () => {
    let sunlight: Sunlight;
    let mockPlant: Plant;

    beforeEach(() => {
        mockPlant = new Plant(1, "Aloe Vera", "Succulent", 123);
        sunlight = new Sunlight(1, "Full Sun", mockPlant.plantId);
        sunlight.plant = mockPlant;
    });
    test("should create a Sunlight object with the correct properties", () => {
        expect(sunlight.sunlightId).toBe(1);
        expect(sunlight.quantity).toBe("Full Sun");
        expect(sunlight.plantId).toBe(mockPlant.plantId);
        expect(sunlight.plant).toBe(mockPlant);
    });

    test("should allow updating the sunlight properties", () => {
        sunlight.quantity = "Partial Shade";

        expect(sunlight.quantity).toBe("Partial Shade");
    });
});