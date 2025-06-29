
import { Test, TestingModule } from '@nestjs/testing';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';

describe('PlansController', () => {
  let controller: PlansController;
  let service: PlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlansController],
      providers: [
        {
          provide: PlansService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlansController>(PlansController);
    service = module.get<PlansService>(PlansService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new plan', async () => {
    const body = { userId: 1, productId: 1, quantity: 2 };
    const mockResponse = { message: 'Plan purchased successfully', planId: 3 };

    jest.spyOn(service, 'create').mockResolvedValue(mockResponse);

    const result = await controller.create(body);
    expect(result).toEqual(mockResponse);
    expect(service.create).toHaveBeenCalledWith(body.userId, body.productId, body.quantity);
  });

  it('should fetch a plan by ID', async () => {
    const planId = 3;
    const mockPlan = {
      id: planId,
      userId: 1,
      product: { name: 'Optimal care mini', price: 10000 },
      quantity: 2,
      totalPrice: 20000,
      policies: [],
    } as any;

    jest.spyOn(service, 'findOne').mockResolvedValue(mockPlan);

    const result = await controller.findOne(planId);
    expect(result).toEqual(mockPlan);
    expect(service.findOne).toHaveBeenCalledWith(planId);
  });
});
