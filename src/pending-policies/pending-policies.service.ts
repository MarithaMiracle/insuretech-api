
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PendingPolicy } from '../models/pending-policy.model';
import { Plan } from '../models/plan.model';
import { User } from '../models/user.model';
import { Product } from '../models/product.model';

@Injectable()
export class PendingPoliciesService {
  constructor(
    @InjectModel(PendingPolicy) private pendingPolicyModel: typeof PendingPolicy,
    @InjectModel(Plan) private planModel: typeof Plan,
  ) {}

  async findUnusedByPlan(planId: number) {
    const policies = await this.pendingPolicyModel.findAll({
      where: {
        planId,
        state: 'unused',
      },
    });

    if (!policies.length) {
      throw new BadRequestException('No unused pending policies found.');
    }

    return policies;
  }

  async findByUser(userId: number) {
    const policies = await this.pendingPolicyModel.findAll({
      where: { state: 'unused' },
      include: [
        {
          model: Plan,
          where: { userId },
          include: [
            { model: User, attributes: ['id', 'name'] },
            { model: Product, attributes: ['name', 'price'] },
          ],
        },
      ],
    });

    if (!policies.length) {
      throw new NotFoundException(`No pending policies found for user ${userId}`);
    }

    return policies.map((p) => ({
      id: p.id,
      state: p.state,
      createdAt: p.createdAt,
      planId: p.plan.id,
      user: p.plan.user,
      product: p.plan.product,
    }));
  }
}
