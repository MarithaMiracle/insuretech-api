
import { Test, TestingModule } from '@nestjs/testing';
import { PoliciesController } from './policies.controller';
import { PoliciesService } from './policies.service';

describe('PoliciesController', () => {
  let controller: PoliciesController;
  let service: PoliciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliciesController],
      providers: [
        {
          provide: PoliciesService,
          useValue: {
            activatePolicy: jest.fn().mockResolvedValue({ message: 'Policy activated' }),
            findByUser: jest.fn().mockResolvedValue([
              { id: 1, planId: 3, policyNumber: 'POL-12345' },
            ]),
            findByPlanId: jest.fn().mockResolvedValue([
              { id: 2, planId: 3, policyNumber: 'POL-67890' },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<PoliciesController>(PoliciesController);
    service = module.get<PoliciesService>(PoliciesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should activate a policy', async () => {
    const result = await controller.activate({ planId: 3 });
    expect(result).toEqual({ message: 'Policy activated' });
  });

  it('should fetch policies by user', async () => {
    const result = await controller.getUserPolicies(1);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('policyNumber');
  });

  it('should fetch policies by plan', async () => {
    const result = await controller.getByPlan(3);
    expect(result).toHaveLength(1);
    expect(result[0].planId).toBe(3);
  });
});
