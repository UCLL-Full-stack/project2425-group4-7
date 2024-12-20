import userService from '../../service/UserService';
import userDB from '../../repository/user.db';
import profileDB from '../../repository/profile.db';
import bcrypt from 'bcrypt';
import { User } from '../../model/User';
import { Profile } from '../../model/Profile';
import { AuthenticationResponse, UserInput } from '../../types';

jest.mock('../../repository/user.db');
jest.mock('../../repository/profile.db');
jest.mock('bcrypt');

describe('User Service Tests', () => {
  const user = new User({
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    password: 'hashed_password',
    role: 'user',
  });

  const profile = new Profile(1, 'John', 'Doe', 1, '1234567890');

  let mockUserDbGetUserByUsername: jest.SpyInstance;
  let mockUserDbGetUserById: jest.SpyInstance;
  let mockUserDbCreateUser: jest.SpyInstance;
  let mockUserDbEditUser: jest.SpyInstance;
  let mockProfileDbAddProfile: jest.SpyInstance;
  let mockProfileDbEditProfile: jest.SpyInstance;

  beforeEach(() => {
    mockUserDbGetUserByUsername = jest.spyOn(userDB, 'getUserByUsername').mockResolvedValue(user);
    mockUserDbGetUserById = jest.spyOn(userDB, 'getUserById').mockResolvedValue(user);
    mockUserDbCreateUser = jest.spyOn(userDB, 'createUser').mockResolvedValue(user);
    mockUserDbEditUser = jest.spyOn(userDB, 'editUser').mockResolvedValue(user);
    mockProfileDbAddProfile = jest.spyOn(profileDB, 'addProfile').mockResolvedValue(new Profile(1, 'John', 'Doe', 1, '1234567890'));
    mockProfileDbEditProfile = jest.spyOn(profileDB, 'editProfile').mockResolvedValue(new Profile(1, 'John', 'Doe', 1, '1234567890'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllUsers should return a list of users', async () => {
    jest.spyOn(userDB, 'getAllUsers').mockResolvedValue([user]);

    const users = await userService.getAllUsers();

    expect(users).toHaveLength(1);
    expect(users[0].getUsername()).toBe('john_doe');
  });

  test('getUserByUsername should return a user by username', async () => {
    const result = await userService.getUserByUsername({ username: 'john_doe' });

    expect(result).toBeDefined();
    expect(result.getUsername()).toBe('john_doe');
  });

  test('getUserByUsername should throw an error if the user does not exist', async () => {
    jest.spyOn(userDB, 'getUserByUsername').mockResolvedValue(null);

    await expect(userService.getUserByUsername({ username: 'unknown_user' })).rejects.toThrow('User with username: unknown_user does not exist.');
  });

  test('getUserById should return a user by ID', async () => {
    const result = await userService.getUserById({ id: 1 });

    expect(result).toBeDefined();
    expect(result.getId()).toBe(1);
  });

  test('getUserById should throw an error if the user does not exist', async () => {
    jest.spyOn(userDB, 'getUserById').mockResolvedValue(null);

    await expect(userService.getUserById({ id: 999 })).rejects.toThrow('User with id: 999 does not exist.');
  });

  test('authenticate should return an authentication response with a token', async () => {
    const userInput: UserInput = { username: 'john_doe', password: 'password', email: 'john@example.com', role: 'user' };
    const authResponse: AuthenticationResponse = { token: 'jwt_token', username: 'john_doe', role: 'user' };

    jest.spyOn(userService, 'authenticate').mockResolvedValue(authResponse);

    const result = await userService.authenticate(userInput);

    expect(result).toEqual(authResponse);
  });

  test('createUser should create a new user', async () => {
    const userInput: UserInput = { username: 'new_user', password: 'new_password', email: 'new@example.com', role: 'user' };

    const result = await userService.createUser(userInput);

    expect(result).toBeDefined();
    expect(result.getUsername()).toBe('new_user');
    expect(mockUserDbCreateUser).toHaveBeenCalledWith(expect.objectContaining(userInput));
  });

  test('createUser should throw an error if the user already exists', async () => {
    jest.spyOn(userDB, 'getUserByUsername').mockResolvedValue(user);

    const userInput: UserInput = { username: 'john_doe', password: 'new_password', email: 'new@example.com', role: 'user' };

    await expect(userService.createUser(userInput)).rejects.toThrow('User with username john_doe is already registered.');
  });

  test('editUser should update user details successfully', async () => {
    const userInput: UserInput = { username: 'updated_user', password: 'updated_password', email: 'updated@example.com', profile: {
      firstName: 'Updated',
      lastName: 'User',
      phoneNumber: '0403929402'
    }, role: 'user' };

    const result = await userService.editUser(1, userInput);

    expect(result).toBeDefined();
    expect(result.getUsername()).toBe('updated_user');
    expect(result.getEmail()).toBe('updated@example.com');
    expect(mockUserDbEditUser).toHaveBeenCalledWith(1, expect.objectContaining(userInput));
  });

  test('editUser should throw an error if the user does not exist', async () => {
    jest.spyOn(userDB, 'getUserById').mockResolvedValue(null);

    const userInput: UserInput = { username: 'updated_user', password: 'updated_password', email: 'updated@example.com', role: 'user' };

    await expect(userService.editUser(999, userInput)).rejects.toThrow('User with id: 999 does not exist.');
  });

  test('editPassword should update the user password', async () => {
    const newPassword = 'new_password';
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const result = await userService.editPassword(1, newPassword);

    expect(result).toBeDefined();
    expect(result.getPassword()).toBe(hashedPassword);
  });

  test('editPassword should throw an error if the user does not exist', async () => {
    jest.spyOn(userDB, 'getUserById').mockResolvedValue(null);

    await expect(userService.editPassword(999, 'new_password')).rejects.toThrow();
  });
});
