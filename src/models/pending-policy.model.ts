
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
  DeletedAt,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Plan } from './plan.model';

@Table({ paranoid: true }) // For soft deletes
export class PendingPolicy extends Model {
  @ForeignKey(() => Plan)
  @Column({ type: DataType.INTEGER })
  declare planId: number;

  @BelongsTo(() => Plan)
  declare plan: Plan;

  @Column({ type: DataType.STRING, defaultValue: 'unused' })
  declare state: 'unused' | 'used';

  @DeletedAt
  @Column(DataType.DATE)
  declare deletedAt: Date;

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;
}
