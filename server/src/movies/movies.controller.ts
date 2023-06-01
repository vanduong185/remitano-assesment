import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { Auth } from '../auth/decorators/http.decorators';
import { User } from '../users/models/user.model';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Auth()
  @Post()
  create(@Body() createMovieDto: CreateMovieDto, @AuthUser() user: User) {
    return this.moviesService.create({
      ...createMovieDto,
      userId: user.id,
    });
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
