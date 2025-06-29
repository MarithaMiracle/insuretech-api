import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { Plan } from '../models/plan.model';
import { User } from '../models/user.model';
import { Product } from '../models/product.model';
import { PendingPolicy } from '../models/pending-policy.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Plan, User, Product, PendingPolicy]),
  ],
  providers: [PlansService],
  controllers: [PlansController],
})
export class PlansModule {}
