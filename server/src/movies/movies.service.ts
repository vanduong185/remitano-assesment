import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CrudService } from 'nestjs-crud-sequelize';
import { Movie } from './models/movie.model';

@Injectable()
export class MoviesService extends CrudService<Movie> {
  constructor(
    @InjectModel(Movie)
    model: typeof Movie,
  ) {
    super(model);
  }
}
