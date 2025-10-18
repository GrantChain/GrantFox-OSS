import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = {
        address: '0x123',
        worldCoinAddress: '0x456',
        totalCoins: 100,
        totalGems: 50,
      };

      const expectedUser = {
        ...createUserDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUsersService.create.mockResolvedValue(expectedUser);

      const result = await controller.create(createUserDto);

      expect(service.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(expectedUser);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const expectedUsers = [
        {
          address: '0x123',
          worldCoinAddress: '0x456',
          totalCoins: 100,
          totalGems: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockUsersService.findAll.mockResolvedValue(expectedUsers);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user by address', async () => {
      const address = '0x123';
      const expectedUser = {
        address,
        worldCoinAddress: '0x456',
        totalCoins: 100,
        totalGems: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUsersService.findOne.mockResolvedValue(expectedUser);

      const result = await controller.findOne(address);

      expect(service.findOne).toHaveBeenCalledWith(address);
      expect(result).toEqual(expectedUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const address = '0x123';
      const updateUserDto = { totalCoins: 200 };
      const expectedUser = {
        address,
        worldCoinAddress: '0x456',
        totalCoins: 200,
        totalGems: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUsersService.update.mockResolvedValue(expectedUser);

      const result = await controller.update(address, updateUserDto);

      expect(service.update).toHaveBeenCalledWith(address, updateUserDto);
      expect(result).toEqual(expectedUser);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const address = '0x123';
      const expectedResult = { deleted: true };

      mockUsersService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(address);

      expect(service.remove).toHaveBeenCalledWith(address);
      expect(result).toEqual(expectedResult);
    });
  });
});
