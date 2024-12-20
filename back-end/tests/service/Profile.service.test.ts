import profileService from '../../service/ProfileService';
import profileDB from '../../repository/profile.db';
import { Profile } from "../../model/Profile";
import { User } from '../../model/User';

jest.mock('../../repository/profile.db');

describe('Profile Service Tests', () => {
  const user = new User({
    id: 1,
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    password: 'john123',
    role: 'user',
  });

  const profile = new Profile(1, 'John', 'Doe', user.getId()!, '1234567890');

  let mockGetProfileByUserId: jest.SpyInstance;
  let mockEditProfile: jest.SpyInstance;
  let mockAddProfile: jest.SpyInstance;

  beforeEach(() => {
    mockGetProfileByUserId = jest.spyOn(profileDB, 'getProfileByUserId').mockResolvedValue(profile);
    mockEditProfile = jest.spyOn(profileDB, 'editProfile').mockResolvedValue(profile);
    mockAddProfile = jest.spyOn(profileDB, 'addProfile').mockResolvedValue(profile);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getProfileByUserId should return a profile for a specific user', async () => {
    const userId = 1;

    const result = await profileService.getProfileByUserId(userId);

    expect(result).toBeDefined();
    expect(result?.getFirstName()).toBe('John');
    expect(result?.getLastName()).toBe('Doe');
    expect(mockGetProfileByUserId).toHaveBeenCalledWith({ userId });
  });

  test('getProfileByUserId should return null if no profile is found', async () => {
    const userId = 999;
    jest.spyOn(profileDB, 'getProfileByUserId').mockResolvedValue(null);

    const result = await profileService.getProfileByUserId(userId);

    expect(result).toBeNull();
    expect(mockGetProfileByUserId).toHaveBeenCalledWith({ userId });
  });

  test('getProfileByUserId should throw an error if there is an issue fetching the profile', async () => {
    const userId = 1;
    jest.spyOn(profileDB, 'getProfileByUserId').mockRejectedValue(new Error('Database error'));

    await expect(profileService.getProfileByUserId(userId)).rejects.toThrow('Error getting profile');
  });

  test('editProfile should successfully update a profile', async () => {
    const updatedData = {
      firstName: 'Johnathan',
      lastName: 'Doe',
      phoneNumber: '0987654321',
    };

    const updatedProfile = new Profile(1, 'Johnathan', 'Doe', user.getId()!, '0987654321');
    jest.spyOn(profileDB, 'editProfile').mockResolvedValue(updatedProfile);

    const result = await profileService.editProfile(user.getId()!, updatedData);

    expect(result).toBeDefined();
    expect(result?.getFirstName()).toBe('Johnathan');
    expect(result?.getPhoneNumber()).toBe('0987654321');
    expect(mockEditProfile).toHaveBeenCalledWith(user.getId(), updatedData);
  });

  test('editProfile should throw an error if there is an issue updating the profile', async () => {
    const updatedData = {
      firstName: 'Johnathan',
      lastName: 'Doe',
      phoneNumber: '0987654321',
    };

    jest.spyOn(profileDB, 'editProfile').mockRejectedValue(new Error('Database error'));

    await expect(profileService.editProfile(user.getId()!, updatedData)).rejects.toThrow('Error while editing profile');
  });

  test('addProfile should add a new profile for the user', async () => {
    const profileInput = {
      firstName: 'Jane',
      lastName: 'Doe',
      phoneNumber: '1234567890',
    };

    const newProfile = new Profile(2, 'Jane', 'Doe', user.getId()!, '1234567890');
    jest.spyOn(profileDB, 'addProfile').mockResolvedValue(newProfile);

    const result = await profileService.addProfile(user.getId()!, profileInput);

    expect(result).toBeDefined();
    expect(result?.getFirstName()).toBe('Jane');
    expect(result?.getLastName()).toBe('Doe');
    expect(mockAddProfile).toHaveBeenCalledWith(user.getId(), profileInput);
  });

  test('addProfile should throw an error if there is an issue adding the profile', async () => {
    const profileInput = {
      firstName: 'Jane',
      lastName: 'Doe',
      phoneNumber: '1234567890',
    };

    jest.spyOn(profileDB, 'addProfile').mockRejectedValue(new Error('Database error'));

    await expect(profileService.addProfile(user.getId()!, profileInput)).rejects.toThrow('Error while adding profile');
  });
});
