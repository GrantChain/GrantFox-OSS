import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../../database/prisma.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

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

      mockPrismaService.user.create.mockResolvedValue(expectedUser);

      const result = await service.create(createUserDto);

      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          address: createUserDto.address,
          worldCoinAddress: createUserDto.worldCoinAddress,
          totalCoins: createUserDto.totalCoins,
          totalGems: createUserDto.totalGems,
        },
      });
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

      mockPrismaService.user.findMany.mockResolvedValue(expectedUsers);

      const result = await service.findAll();

      expect(mockPrismaService.user.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
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

      mockPrismaService.user.findUnique.mockResolvedValue(expectedUser);

      const result = await service.findOne(address);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { address },
      });
      expect(result).toEqual(expectedUser);
    });

    it('should throw NotFoundException when user not found', async () => {
      const address = '0x123';
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne(address)).rejects.toThrow(NotFoundException);
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

      mockPrismaService.user.update.mockResolvedValue(expectedUser);

      const result = await service.update(address, updateUserDto);

      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { address },
        data: updateUserDto,
      });
      expect(result).toEqual(expectedUser);
    });

    it('should throw NotFoundException when user not found', async () => {
      const address = '0x123';
      const updateUserDto = { totalCoins: 200 };
      mockPrismaService.user.update.mockRejectedValue(new Error());

      await expect(service.update(address, updateUserDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const address = '0x123';
      mockPrismaService.user.delete.mockResolvedValue({});

      const result = await service.remove(address);

      expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
        where: { address },
      });
      expect(result).toEqual({ deleted: true });
    });

    it('should throw NotFoundException when user not found', async () => {
      const address = '0x123';
      mockPrismaService.user.delete.mockRejectedValue(new Error());

      await expect(service.remove(address)).rejects.toThrow(NotFoundException);
    });
  });
});
