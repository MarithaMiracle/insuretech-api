import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserModel = {
    findByPk: jest.fn((id) =>
      id === 1 ? { id: 1, name: 'Maritha', walletBalance: 50000 } : null
    ),
    findAll: jest.fn(() => [
      { id: 1, name: 'Maritha', walletBalance: 50000 },
      { id: 2, name: 'Greg', walletBalance: 0 },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return wallet balance', async () => {
    const result = await service.getWalletBalance(1);
    expect(result.walletBalance).toBe(50000);
  });

  it('should throw if user not found', async () => {
    await expect(service.getWalletBalance(99)).rejects.toThrow(NotFoundException);
  });

  it('should return all users', async () => {
    const users = await service.findAllUsers();
    expect(users.length).toBeGreaterThan(0);
  });
});
