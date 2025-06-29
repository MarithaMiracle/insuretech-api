
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Product } from './product.model';
import { PendingPolicy } from './pending-policy.model';

interface PlanCreationAttrs {
  userId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
}

@Table
export class Plan extends Model<Plan, PlanCreationAttrs> {
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

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare quantity: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare totalPrice: number;

  @HasMany(() => PendingPolicy)
  declare pendingPolicies: PendingPolicy[];

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;
}
