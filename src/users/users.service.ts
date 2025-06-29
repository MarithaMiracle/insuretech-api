
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  findAll() {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async getWalletBalance(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('User not found');
    return {
      userId: user.id,
      name: user.name,
      walletBalance: user.walletBalance,
    };
  }

  async findAllUsers() {
    return await this.userModel.findAll();
  }
}
