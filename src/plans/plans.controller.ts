
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';

@ApiTags('Plans')
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  @ApiOperation({ summary: 'Purchase a plan',
                  description: 'Allows a user to purchase a plan by selecting a product and quantity.\n\n Deducts the total price from the user’s wallet and generates pending policies.' })
  @ApiBody({ type: CreatePlanDto })
  @ApiResponse({ status: 201, description: 'Plan purchased successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input or insufficient funds' })
  create(@Body() dto: CreatePlanDto) {
    return this.plansService.create(dto.userId, dto.productId, dto.quantity);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get plan details by ID',
                  description: 'Returns details about a specific plan purchase, including product name, quantity, total price, and any remaining unused policies.' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Plan found' })
  @ApiResponse({ status: 404, description: 'Plan not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.plansService.findOne(id);
  }
}
