import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederService } from './seeder.service';
import { ProductCategory } from '../models/product-category.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductCategory, Product, User])],
  providers: [SeederService],
})
export class SeederModule {}
