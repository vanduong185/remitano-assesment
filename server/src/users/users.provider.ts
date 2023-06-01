import { USERS_REPOSITORY } from '../constants/repositories';
import { User } from './models/user.model';

export const UsersProvider = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
];
