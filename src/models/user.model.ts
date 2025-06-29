
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Plan } from './plan.model';

interface UserCreationAttrs {
  name: string;
  walletBalance: number;
}

@Table
export class User extends Model<User, UserCreationAttrs> {
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare walletBalance: number;

  @HasMany(() => Plan)
  declare plans: Plan[];
}
