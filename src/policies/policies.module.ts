import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PoliciesService } from './policies.service';
import { PoliciesController } from './policies.controller';
import { Policy } from '../models/policy.model';
import { PendingPolicy } from '../models/pending-policy.model';
import { Plan } from '../models/plan.model';

@Module({
  imports: [SequelizeModule.forFeature([Policy, PendingPolicy, Plan])],
  providers: [PoliciesService],
  controllers: [PoliciesController],
})
export class PoliciesModule {}
