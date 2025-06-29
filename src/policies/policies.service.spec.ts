import { Test, TestingModule } from '@nestjs/testing';
import { PoliciesService } from './policies.service';
import { getModelToken } from '@nestjs/sequelize';
import { Policy } from '../models/policy.model';
import { PendingPolicy } from '../models/pending-policy.model';
import { Plan } from '../models/plan.model';
import { BadRequestException } from '@nestjs/common';

describe('PoliciesService', () => {
  let service: PoliciesService;

  const mockPending = { id: 1, destroy: jest.fn() };
  const mockPlan = { id: 1, userId: 1, productId: 1 };
  const mockPolicy = { id: 1 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PoliciesService,
        { provide: getModelToken(Policy), useValue: { findOne: jest.fn(), create: jest.fn(() => mockPolicy), findAll: jest.fn() } },
        { provide: getModelToken(PendingPolicy), useValue: { findOne: jest.fn(() => mockPending) } },
        { provide: getModelToken(Plan), useValue: { findByPk: jest.fn(() => mockPlan) } },
      ],
    }).compile();

    service = module.get<PoliciesService>(PoliciesService);
  });

  it('should activate a policy', async () => {
    jest.spyOn(service['policyModel'], 'findOne').mockResolvedValueOnce(null);
    const result = await service.activatePolicy(1);
    expect(result.message).toBe('Policy activated');
    expect(result.policy).toEqual(mockPolicy);
  });

  it('should throw if no pending policy', async () => {
    jest.spyOn(service['pendingModel'], 'findOne').mockResolvedValue(null);
    await expect(service.activatePolicy(1)).rejects.toThrow(BadRequestException);
  });
});
