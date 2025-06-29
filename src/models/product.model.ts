
import {
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    Model,
    Table,
  } from 'sequelize-typescript';
  import { ProductCategory } from './product-category.model';
  
  interface ProductCreationAttrs {
    name: string;
    price: number;
    categoryId: number;
  }
  
  @Table
  export class Product extends Model<Product, ProductCreationAttrs> {
    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;
  
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare price: number;
  
    @ForeignKey(() => ProductCategory)
    @Column({ type: DataType.INTEGER })
    declare categoryId: number;
  
    @BelongsTo(() => ProductCategory)
    declare category: ProductCategory;
  }
  