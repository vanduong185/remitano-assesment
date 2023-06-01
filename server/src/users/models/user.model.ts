import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column
  password: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({ type: 'timestamp' })
  @CreatedAt
  createdAt?: any;

  @Column({ type: 'timestamp' })
  @UpdatedAt
  updatedAt?: any;
}
