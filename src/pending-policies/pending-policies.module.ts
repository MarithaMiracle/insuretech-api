
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PendingPolicy } from '../models/pending-policy.model';
import { Plan } from '../models/plan.model';
import { User } from '../models/user.model';
import { Product } from '../models/product.model';
import { PendingPoliciesService } from './pending-policies.service';
import { PendingPoliciesController } from './pending-policies.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([
      PendingPolicy,
      Plan,
      User,
      Product
    ])
  ],
  providers: [PendingPoliciesService],
  controllers: [PendingPoliciesController],
})
export class PendingPoliciesModule {}
