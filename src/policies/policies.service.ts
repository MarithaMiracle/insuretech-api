import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Policy } from '../models/policy.model';
import { PendingPolicy } from '../models/pending-policy.model';
import { Plan } from '../models/plan.model';
import { Product } from '../models/product.model';

@Injectable()
export class PoliciesService {
  constructor(
    @InjectModel(Policy) private policyModel: typeof Policy,
    @InjectModel(PendingPolicy) private pendingModel: typeof PendingPolicy,
    @InjectModel(Plan) private planModel: typeof Plan,
  ) {}

  async activatePolicy(planId: number) {
    const pending = await this.pendingModel.findOne({
      where: { planId, state: 'unused' },
    });

    if (!pending) {
      throw new BadRequestException('No unused pending policy available.');
    }

    const plan = await this.planModel.findByPk(planId);

    if (!plan) {
      throw new BadRequestException('Plan not found');
    }

    const existingPolicy = await this.policyModel.findOne({
      where: {
        userId: plan.userId,
        productId: plan.productId,
      },
    });

    if (existingPolicy) {
      throw new BadRequestException('User already has a policy for this product');
    }

    const policy = await this.policyModel.create({
      userId: plan.userId,
      productId: plan.productId,
      planId: plan.id,
      policyNumber: `POL-${Date.now()}`,
    } as any);

    await pending.destroy();

    return { message: 'Policy activated', policy };
  }

  async findByUser(userId: number) {
    return await this.policyModel.findAll({
      where: { userId },
      include: [
        { model: Plan, attributes: ['id', 'totalPrice'] },
        { model: Product, attributes: ['name', 'price'] },
      ],
    });
  }

  async findById(id: number) {
    const policy = await this.policyModel.findByPk(id, {
      include: [
        { model: Plan, attributes: ['id', 'totalPrice'] },
        { model: Product, attributes: ['name', 'price'] },
      ],
    });

    if (!policy) {
      throw new BadRequestException('Policy not found');
    }

    return policy;
  }

  async findByPlanId(planId: number) {
    return await this.policyModel.findAll({
      where: { planId },
      include: [
        { model: Product, attributes: ['name', 'price'] },
        { model: Plan, attributes: ['id', 'totalPrice'] },
      ],
    });
  }
}
