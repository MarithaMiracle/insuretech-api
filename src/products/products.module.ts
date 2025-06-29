import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from '../models/product.model';
import { ProductCategory } from '../models/product-category.model';

@Module({
  imports: [SequelizeModule.forFeature([Product, ProductCategory])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
