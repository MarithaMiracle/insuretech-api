import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductCategory } from '../models/product-category.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectModel(ProductCategory) private categoryModel: typeof ProductCategory,
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async onModuleInit() {
    const existing = await this.categoryModel.findOne();
    if (existing) return; // prevent re-seeding

    const health = await this.categoryModel.create({ name: 'Health' });
    const auto = await this.categoryModel.create({ name: 'Auto' });

    await this.productModel.bulkCreate([
      { name: 'Optimal care mini', price: 10000, categoryId: health.id },
      { name: 'Optimal care standard', price: 20000, categoryId: health.id },
      { name: 'Third-party', price: 5000, categoryId: auto.id },
      { name: 'Comprehensive', price: 15000, categoryId: auto.id },
    ]);

    await this.userModel.bulkCreate([
      { name: 'Maritha', walletBalance: 50000 },
      { name: 'Emeka', walletBalance: 30000 },
      { name: 'Zainab', walletBalance: 15000 },
      { name: 'Greg', walletBalance: 0 },
    ]);
    

    console.log('✅ Seed data inserted');
  }
}
