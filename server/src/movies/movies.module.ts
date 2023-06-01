import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './models/movie.model';
import { MoviesController } from './movies.controller';
import { MoviesProvider } from './movies.provider';
import { MoviesService } from './movies.service';
import { MoviesEmitter } from './emitters/movie.emitter';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, MoviesEmitter, ...MoviesProvider],
  imports: [SequelizeModule.forFeature([Movie])],
  exports: [SequelizeModule],
})
export class MoviesModule {}
