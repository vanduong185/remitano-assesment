import { USERS_REPOSITORY } from '../constants/repositories';
import { User } from '../users/models/user.model';

export const authProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
];
