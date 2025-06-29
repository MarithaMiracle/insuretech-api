import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../models/product.model';
import { ProductCategory } from '../models/product-category.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
  ) {}

  async findAll() {
    return this.productModel.findAll({
      include: [{ model: ProductCategory }],
    });
  }
}
