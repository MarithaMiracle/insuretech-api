
import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Fetch all available insurance products',
    description:
      'Returns a list of products users can buy, including product names, prices, and their associated categories (e.g., Health, Auto).',
  })
  findAll() {
    return this.productsService.findAll();
  }
}
