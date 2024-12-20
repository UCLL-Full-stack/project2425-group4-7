import plantService from '../../service/PlantService';
import plantDB from '../../repository/plant.db';
import userDB from '../../repository/user.db';
import { Plant } from "../../model/Plant";
import { User } from '../../model/User';
import { PlantInput, PlantUserInput } from "../../types";

jest.mock('../../repository/plant.db');
jest.mock('../../repository/user.db');

function transformUserToPlantUserInput(user: User): PlantUserInput {
    return {
      id: user.getId() ?? 0,
      username: user.getUsername(),
      email: user.getEmail(),
      role: user.getRole(),
    };
  }

describe('Plant Service Tests', () => {
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

  let mockPlantDbAddPlant: jest.SpyInstance;
  let mockGetUserByUsername: jest.SpyInstance;

  beforeEach(() => {
    mockPlantDbAddPlant = jest.spyOn(plantDB, 'addPlant').mockResolvedValue(plant);
    mockGetUserByUsername = jest.spyOn(userDB, 'getUserByUsername').mockResolvedValue(user);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllPlants should return a list of plants', async () => {
    const mockGetAllPlants = jest.spyOn(plantDB, 'getAllPlants').mockResolvedValue([plant]);
    
    const plants = await plantService.getAllPlants();
    
    expect(plants).toHaveLength(1);
    expect(plants[0].getName()).toBe('Aloe Vera');
    expect(mockGetAllPlants).toHaveBeenCalledTimes(1);
  });

  test('getPlantById should return a plant by ID', async () => {
    const plantId = 1;
    const mockGetPlantById = jest.spyOn(plantDB, 'getPlantById').mockResolvedValue(plant);
    
    const result = await plantService.getPlantById(plantId);
    
    expect(result).toBeDefined();
    expect(result?.getId()).toBe(1);

  });

  test('getPlantById should throw an error if the plant does not exist', async () => {
    const plantId = 999;
    jest.spyOn(plantDB, 'getPlantById').mockResolvedValue(null);
    
    await expect(plantService.getPlantById(plantId)).rejects.toThrow('Plant: 999 doesnt exist');
  });

  test('addPlant should add a new plant', async () => {
    const plantInput: PlantInput = {
      name: 'Aloe Vera',
      type: 'Succulent',
      family: 'Lamiaceae',
      wateringFreq: 'Weekly',
      sunlight: 'Direct',
      email: true,
      sms: false,
      user: transformUserToPlantUserInput(user),
      created: new Date(),
    };
    
    const result = await plantService.addPlant(plantInput);
    
    expect(result).toBeDefined();
    expect(result.getName()).toBe('Aloe Vera');
    expect(result.getUser()).toBe(user);
    expect(mockPlantDbAddPlant).toHaveBeenCalledWith(plantInput);  
  });

  test('addPlant should throw an error if user is missing', async () => {
    const plantInput: PlantInput = {
      name: 'Basil',
      type: 'Herb',
      family: 'Lamiaceae',
      wateringFreq: 'Weekly',
      sunlight: 'Direct',
      email: true,
      sms: false,
      user: { id: 0, username: '', email: '', role: 'user' },
      created: new Date(),
    };

    await expect(plantService.addPlant(plantInput)).rejects.toThrow('User may not be null');
});


  test('getUserPlants should return plants of a specific user', async () => {
    const mockGetPlantsByUserId = jest.spyOn(plantDB, 'getPlantsByUserId').mockResolvedValue([plant]);
    
    const plants = await plantService.getUserPlants('John Doe');
    
    expect(plants).toHaveLength(1);
    expect(plants[0].getName()).toBe('Aloe Vera');
    expect(mockGetPlantsByUserId).toHaveBeenCalledWith(user.getId());
  });

  test('getUserPlants should throw an error if user does not exist', async () => {
    jest.spyOn(userDB, 'getUserByUsername').mockResolvedValue(null);
    
    await expect(plantService.getUserPlants('Unknown User')).rejects.toThrow('Error fetching user plants');
  });

  test('deletePlantById should delete a plant', async () => {
    const plantId = 1;
    const mockDeleteById = jest.spyOn(plantDB, 'deleteById').mockResolvedValue(true);
    
    const result = await plantService.deletePlantById(plantId);
    
    expect(result).toBe(true);
    expect(mockDeleteById).toHaveBeenCalledWith(plantId);
  });

  test('deletePlantById should throw an error if deletion fails', async () => {
    const plantId = 999;
    jest.spyOn(plantDB, 'deleteById').mockResolvedValue(false);
    
    await expect(plantService.deletePlantById(plantId)).rejects.toThrow(`Failed to delete plant: ${plantId}`);
  });  


test('editPlant should update a plant successfully', async () => {
    const plantId = 1;

    const updatedData: PlantInput = {
      name: 'Updated Aloe Vera',
      type: 'Succulent',
      family: 'Asphodelaceae',
      wateringFreq: 'Biweekly',
      sunlight: 'Direct',
      email: true,
      sms: false,
      user: { id: 1, username: 'John Doe', email: 'john@example.com', role: 'user' },
      created: new Date(),
    };

    const updatedPlant = {
      id: 1,
      name: 'Updated Aloe Vera',
      type: 'Succulent',
      family: 'Asphodelaceae',
      wateringFreq: 'Biweekly',
      sunlight: 'Direct',
      reminderEmail: true,
      reminderSms: false,
      userId: 1,
      created: new Date(),
    };

    jest.spyOn(plantDB, 'getPlantById').mockResolvedValue(plant);
    jest.spyOn(plantDB, 'editPlantById').mockResolvedValue(updatedPlant);

    const result = await plantService.editPlant(plantId, updatedData);

    expect(result).toBeDefined();
    expect(result?.name).toBe('Updated Aloe Vera');
    expect(result?.wateringFreq).toBe('Biweekly');
    expect(result?.sunlight).toBe('Direct');
    expect(plantDB.editPlantById).toHaveBeenCalledWith(plantId, updatedData);
});

  test('editPlant should throw an error if there is an issue with editing', async () => {
    const plantId = 1;
  
    const updatedData: PlantInput = {
      name: 'Updated Plant',
      type: 'Succulent',
      family: 'Lamiaceae',
      wateringFreq: 'Every 2 Weeks',
      sunlight: 'Indirect',
      email: true,
      sms: false,
      user: { id: 1, username: 'user', email: 'user@example.com', role: 'user' },
      created: new Date(),
    };
  
    jest.spyOn(plantDB, 'getPlantById').mockResolvedValue(plant);
    jest.spyOn(plantDB, 'editPlantById').mockRejectedValue(new Error('Database error'));
  
    await expect(plantService.editPlant(plantId, updatedData)).rejects.toThrow('Failed to edit plant');
  });
});
