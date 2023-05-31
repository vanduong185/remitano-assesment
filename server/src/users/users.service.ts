import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CrudService } from 'nestjs-crud-sequelize';
import { User } from './models/user.model';

@Injectable()
export class UsersService extends CrudService<User> {
  constructor(
    @InjectModel(User)
    model: typeof User,
  ) {
    super(model);
  }
}
