import { USERS_REPOSITORY } from 'src/constants/repositories';
import { User } from '../users/models/user.model';

export const authProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
];
