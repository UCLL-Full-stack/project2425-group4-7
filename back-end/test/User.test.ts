import { Plant } from "../model/Plant";
import { User } from "../model/User";

describe("User Class", () => {
    let user: User;

    beforeEach(() => {
        user = new User(1, "testuser", "securepassword");
    });

    test("should create a User object with the correct properties", () => {
        expect(user.userId).toBe(1);
        expect(user.username).toBe("testuser")
        expect(user.password).toBe("securepassword");
        expect(user.profile).toBeUndefined();
        expect(user.plants).toEqual([])
    });

    test("should allow updating the usernome with valid value", () => {
        user.username = "newuser";
        expect(user)
    });

    test("should allow updating the username with valid values", () => {
        user.username = "newuser";
        expect(user.username).toBe("newuser");
    });

    test("should not allow setting username to be less than 3 characters", () => {
        expect(() => {
            user.username = "ab";
        }).toThrow("Username must be at least 3 characters long.")        
    });

    test("should allow updating the password with valid value", () => {
        user.password = "newsecurepassword";
        expect(user.password).toBe("newsecurepassword");
    });

    test("should not allow setting password to less than 6 characters", () => {
        expect(() => {
            user.password = "12345"
        }).toThrow("Password must be at least 6 characters long.");
    });

    test("should allow adding a plant", () => {
        const plant = new Plant(1, "Aloe Vera", "Succulent", user.userId);
        user.addPlant(plant);

        expect(user.plants.length).toBe(1);
        expect(user.plants[0]).toBe(plant);
    });
});