// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProductCategory } from './models/product-category.model';
import { Product } from './models/product.model';
import { User } from './models/user.model';
import { Plan } from './models/plan.model';
import { PendingPolicy } from './models/pending-policy.model';
import { Policy } from './models/policy.model';

import { SeederModule } from './seeder/seeder.module';
import { ProductsModule } from './products/products.module';
import { PlansModule } from './plans/plans.module';
import { PoliciesModule } from './policies/policies.module';
import { PendingPoliciesModule } from './pending-policies/pending-policies.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') || '5432', 10),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadModels: true,
        synchronize: true,
        models: [ProductCategory, Product, User, Plan, PendingPolicy, Policy],
      }),
    }),
    SeederModule,
    ProductsModule,
    PlansModule,
    PoliciesModule,
    PendingPoliciesModule,
    UsersModule,
  ],
  // providers: [AppService],
})
export class AppModule {}
