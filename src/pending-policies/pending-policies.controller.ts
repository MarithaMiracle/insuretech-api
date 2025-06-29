
import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { PendingPoliciesService } from './pending-policies.service';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Pending-policies')
@Controller('pending-policies')
export class PendingPoliciesController {
  constructor(private readonly pendingPoliciesService: PendingPoliciesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get unused policies by plan ID',
    description: 'Returns all unactivated (pending) policies created under a specific plan.\n\n Used to check remaining policy slots that can still be activated.',
  })
  @ApiQuery({ name: 'planId', required: true, type: Number })
  getByPlanId(@Query('planId', ParseIntPipe) planId: number) {
    return this.pendingPoliciesService.findUnusedByPlan(planId);
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get all unused (pending) policies for a user',
    description: 'Fetches all pending (unactivated) policies across all plans that belong to the specified user.\n\n Includes user info, product name, and price.',
  })
  @ApiParam({ name: 'userId', required: true, type: Number })
  getByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.pendingPoliciesService.findByUser(userId);
  }
}
