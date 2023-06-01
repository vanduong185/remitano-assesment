import { MOVIES_REPOSITORY } from './../constants/repositories';
import { Movie } from './models/movie.model';

export const MoviesProvider = [
  {
    provide: MOVIES_REPOSITORY,
    useValue: Movie,
  },
];
