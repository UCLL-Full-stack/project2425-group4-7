import plantService from '../../service/PlantService';
import plantDB from '../../repository/plant.db';
import userDB from '../../repository/user.db';
import { Plant } from "../../model/Plant";
import { PlantInput, UserInput, PlantUserInput } from "../../types";
import { User } from '../../model/User';

const user = new User({
    id: 1,
    username: 'John Doe',
    email: 'john@example.com',
    password: 'john123',
    role: 'user',
});

const plant = new Plant({
    id: 1,
    name: 'Aloe Vera',
    type: 'Succulent',
    family: 'Asphodelaceae',
    wateringFreq: 'Weekly',
    sunlight: 'Indirect',
    reminderEmail: true,
    reminderSms: false,
    user,
    created: new Date(),
});

// Transformation function for user
function transformUserToPlantUserInput(user: User): PlantUserInput {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
    };
}

let mockPlantDbAddPlant: jest.SpyInstance<Promise<Plant>, [plant: PlantInput], any>;
let mockPlantDbGetPlantById: jest.SpyInstance<Promise<Plant | null>, [{ id: number }], any>;
let mockUserDbGetUserByUsername: jest.SpyInstance<Promise<User | null>, [{ username: string }], any>;
let mockPlantDbGetPlantsByUserId: jest.SpyInstance<Promise<Plant[]>, [number], any>;

beforeEach(() => {
    mockPlantDbAddPlant = jest.spyOn(plantDB, 'addPlant').mockResolvedValue(plant);
    mockPlantDbGetPlantById = jest.spyOn(plantDB, 'getPlantById').mockResolvedValue(plant);
    mockUserDbGetUserByUsername = jest.spyOn(userDB, 'getUserByUsername').mockResolvedValue(user);
    mockPlantDbGetPlantsByUserId = jest.spyOn(plantDB, 'getPlantsByUserId').mockResolvedValue([plant]);
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Plant Service', () => {
    describe('addPlant', () => {
        it('should add a plant successfully', async () => {
            const plantInput: PlantInput = {
                name: 'Aloe Vera',
                type: 'Succulent',
                family: 'Asphodelaceae',
                wateringFreq: 'Weekly',
                sunlight: 'Indirect',
                email: true,
                sms: false,
                user: transformUserToPlantUserInput(user), // Updated here
                created: new Date(),
            };

            const result = await plantService.addPlant(plantInput);
            expect(mockPlantDbAddPlant).toHaveBeenCalledWith(plantInput);
            expect(result).toEqual(plant);
        });

        it('should throw an error if user is null', async () => {
            const plantInput: PlantInput = {
                name: 'Aloe Vera',
                type: 'Succulent',
                family: 'Asphodelaceae',
                wateringFreq: 'Weekly',
                sunlight: 'Indirect',
                email: true,
                sms: false,
                user: null as unknown as PlantUserInput,
                created: new Date(),
            };

            await expect(plantService.addPlant(plantInput)).rejects.toThrow('User may not be null');
            expect(mockPlantDbAddPlant).not.toHaveBeenCalled();
        });
    });

    describe('getPlantById', () => {
        it('should return a plant by ID', async () => {
            const result = await plantService.getPlantById(1);
            expect(mockPlantDbGetPlantById).toHaveBeenCalledWith({ id: 1 });
            expect(result).toEqual(plant);
        });

        it('should throw an error if plant does not exist', async () => {
            mockPlantDbGetPlantById.mockResolvedValue(null);

            await expect(plantService.getPlantById(999)).rejects.toThrow('Plant with ID: 999 does not exist.');
        });
    });

    describe('getUserPlants', () => {
        it('should return plants for a given username', async () => {
            const result = await plantService.getUserPlants('John Doe');
            expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith({ username: 'John Doe' });
            expect(mockPlantDbGetPlantsByUserId).toHaveBeenCalledWith(1);
            expect(result).toEqual([plant]);
        });

        it('should throw an error if user is not found', async () => {
            mockUserDbGetUserByUsername.mockResolvedValue(null);

            await expect(plantService.getUserPlants('Unknown User')).rejects.toThrow('User: Unknown User not found');
            expect(mockPlantDbGetPlantsByUserId).not.toHaveBeenCalled();
        });

        it('should throw an error if user ID is undefined', async () => {
            const invalidUser = new User({
                username: 'Invalid User',
                email: 'invalid@example.com',
                password: 'invalid123',
                role: 'user',
            });

            mockUserDbGetUserByUsername.mockResolvedValue(invalidUser);

            await expect(plantService.getUserPlants('Invalid User')).rejects.toThrow('User ID required');
        });
    });

    describe('deletePlantById', () => {
        it('should delete a plant by ID', async () => {
            const mockDeletePlant = jest.spyOn(plantDB, 'deleteById').mockResolvedValue(true);

            const result = await plantService.deletePlantById(1);
            expect(mockDeletePlant).toHaveBeenCalledWith(1);
            expect(result).toBe(true);
        });

        it('should throw an error if deletion fails', async () => {
            const mockDeletePlant = jest.spyOn(plantDB, 'deleteById').mockRejectedValue(new Error('Deletion error'));

            await expect(plantService.deletePlantById(1)).rejects.toThrow('Failed to delete plant: 1');
        });
    });
});
