
import {
    Column,
    DataType,
    HasMany,
    Model,
    Table,
  } from 'sequelize-typescript';
  import { Product } from './product.model';
  
  interface ProductCategoryCreationAttrs {
    name: string;
  }
  
  @Table
  export class ProductCategory extends Model<ProductCategory, ProductCategoryCreationAttrs> {
    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;
  
    @HasMany(() => Product)
    declare products: Product[];
  }
  