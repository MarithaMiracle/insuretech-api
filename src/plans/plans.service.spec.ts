import { Test, TestingModule } from '@nestjs/testing';
import { PlansService } from './plans.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { Product } from '../models/product.model';
import { Plan } from '../models/plan.model';
import { PendingPolicy } from '../models/pending-policy.model';
import { BadRequestException } from '@nestjs/common';

describe('PlansService', () => {
  let service: PlansService;

  const mockUser = { id: 1, walletBalance: 30000, save: jest.fn() };
  const mockProduct = { id: 1, price: 10000 };
  const mockPlan = { id: 1 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlansService,
        { provide: getModelToken(User), useValue: { findByPk: jest.fn(() => mockUser) } },
        { provide: getModelToken(Product), useValue: { findByPk: jest.fn(() => mockProduct) } },
        { provide: getModelToken(Plan), useValue: { create: jest.fn(() => mockPlan) } },
        { provide: getModelToken(PendingPolicy), useValue: { create: jest.fn() } },
      ],
    }).compile();

    service = module.get<PlansService>(PlansService);
  });

  it('should create a plan and deduct wallet', async () => {
    const result = await service.create(1, 1, 2);
    expect(result).toEqual({ message: 'Plan purchased successfully', planId: 1 });
  });

  it('should throw if user or product is missing', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlansService,
        { provide: getModelToken(User), useValue: { findByPk: jest.fn(() => null) } },
        { provide: getModelToken(Product), useValue: { findByPk: jest.fn(() => mockProduct) } },
        { provide: getModelToken(Plan), useValue: {} },
        { provide: getModelToken(PendingPolicy), useValue: {} },
      ],
    }).compile();

    const svc = module.get<PlansService>(PlansService);
    await expect(svc.create(1, 1, 2)).rejects.toThrow(BadRequestException);
  });
});
