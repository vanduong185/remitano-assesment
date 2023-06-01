import { MoviesEmitter } from './emitters/movie.emitter';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { Auth } from '../auth/decorators/http.decorators';
import { User } from '../users/models/user.model';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly movieEmitter: MoviesEmitter,
  ) {}

  @Auth()
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto, @AuthUser() user: User) {
    const newMovie = await this.moviesService.create({
      ...createMovieDto,
      userId: user.id,
    });

    const data = await this.moviesService.findOne({
      where: {
        id: newMovie.id,
      },
      include: { model: User, attributes: ['username'] },
    });

    this.movieEmitter.emitNewMovieNotification(data);

    return newMovie;
  }

  @Get()
  async findAll() {
    const data = await this.moviesService.findAll({
      include: { model: User, attributes: ['username'] },
      order: [['createdAt', 'DESC']],
    });
    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne({ where: { id } });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.delete({ where: { id } });
  }
}
