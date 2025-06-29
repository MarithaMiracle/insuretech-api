
import {
    Injectable,
    BadRequestException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/sequelize';
  import { Plan } from '../models/plan.model';
  import { User } from '../models/user.model';
  import { Product } from '../models/product.model';
  import { PendingPolicy } from '../models/pending-policy.model';
  
  @Injectable()
  export class PlansService {
    constructor(
      @InjectModel(User) private userModel: typeof User,
      @InjectModel(Product) private productModel: typeof Product,
      @InjectModel(Plan) private planModel: typeof Plan,
      @InjectModel(PendingPolicy) private pendingPolicyModel: typeof PendingPolicy,
    ) {}
  
    async create(userId: number, productId: number, quantity: number) {
      quantity = Number(quantity);
  
      // console.log('🟡 Incoming data:', { userId, productId, quantity });
  
      const user = await this.userModel.findByPk(userId);
      const product = await this.productModel.findByPk(productId);
  
      // console.log('👤 User:', user?.name, '💰 Wallet:', user?.walletBalance);
      // console.log('📦 Product:', product?.name, '💵 Price:', product?.price);
  
      if (!user || !product) {
        throw new BadRequestException('Invalid user or product');
      }
  
      if (!product.price || isNaN(quantity) || quantity <= 0) {
        throw new BadRequestException('Invalid product price or quantity');
      }
  
      const totalPrice = product.price * quantity;
  
      if (user.walletBalance < totalPrice) {
        throw new BadRequestException('Insufficient wallet balance');
      }
  
      user.walletBalance -= totalPrice;
      await user.save();
  
      const plan = await this.planModel.create({
        userId,
        productId,
        quantity,
        totalPrice,
      });
  
      for (let i = 0; i < quantity; i++) {
        await this.pendingPolicyModel.create({
          planId: plan.id,
          state: 'unused',
        });
      }
  
      console.log('✅ Plan and pending policies created successfully.');
  
      return { message: 'Plan purchased successfully', planId: plan.id };
    }
  
    async findOne(planId: number) {
      const plan = await this.planModel.findByPk(planId, {
        include: [
          { model: Product, attributes: ['name', 'price'] },
          { model: PendingPolicy, attributes: ['id', 'state'] },
        ],
      });
  
      if (!plan) {
        throw new NotFoundException('Plan not found');
      }
  
      return {
        id: plan.id,
        userId: plan.userId,
        product: plan.product,
        quantity: plan.quantity,
        totalPrice: plan.totalPrice,
        policies: plan.pendingPolicies,
      };
    }
  }
  