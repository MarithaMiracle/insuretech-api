import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Product } from './product.model';
import { Plan } from './plan.model';

// I added this for strict .create() type safety
interface PolicyCreationAttrs {
  userId: number;
  productId: number;
  planId: number;
  policyNumber: string;
}

@Table
export class Policy extends Model<Policy, PolicyCreationAttrs> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  declare productId: number;

  @BelongsTo(() => Product)
  declare product: Product;

  @ForeignKey(() => Plan)
  @Column({ type: DataType.INTEGER })
  declare planId: number;

  @BelongsTo(() => Plan)
  declare plan: Plan;

  @Column({ type: DataType.STRING })
  declare policyNumber: string;
}
