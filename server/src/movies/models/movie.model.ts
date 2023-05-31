import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';

@Table
export class Movie extends Model<Movie> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column({ allowNull: false })
  movieUrl: string;

  @Column({ allowNull: true })
  movieDescription?: string;

  @Column({ allowNull: true })
  movieTitle?: string;

  @Column({ type: 'timestamp' })
  createdAt?: any;

  @Column({ type: 'timestamp' })
  updatedAt?: any;
}
