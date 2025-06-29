import {
  Controller,
  Post,
  Body,
  ParseIntPipe,
  Get,
  Param,
} from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { ActivatePolicyDto } from './dto/activate-policy.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Policies')
@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Post('activate')
  @ApiOperation({
    summary: 'Activate a pending policy under a plan',
    description:
      'Activates one unused policy for the given plan.\n\n⚠️ Only one policy may be activated per user per plan. Attempting to activate more than one will return an error.\n\n On success, the pending policy is soft-deleted and becomes an official policy.',
  })
  @ApiBody({ type: ActivatePolicyDto })
  activate(@Body() dto: ActivatePolicyDto) {
    return this.policiesService.activatePolicy(dto.planId);
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get all activated policies for a user',
    description:
      'Returns all policies that a specific user has activated across all plans. Useful for viewing a user’s active insurance coverage.',
  })
  getUserPolicies(@Param('userId', ParseIntPipe) userId: number) {
    return this.policiesService.findByUser(userId);
  }
  

  @Get('plan/:planId')
  @ApiOperation({
    summary: 'Get all activated policies under a specific plan',
    description:
      'Returns all activated policies linked to a specific plan. This is helpful to see who has activated coverage under that plan and when.',
  })
  getByPlan(@Param('planId', ParseIntPipe) planId: number) {
    return this.policiesService.findByPlanId(planId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a single policy by ID',
    description:
      'Fetches detailed information for a specific activated policy by its unique ID. This is useful for viewing individual policy data, such as user, product, and activation time.',
  })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.policiesService.findById(id);
  }
}
