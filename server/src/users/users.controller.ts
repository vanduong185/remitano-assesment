import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ where: { id } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(
      updateUserDto,
      { where: { id } },
      { where: { id } },
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete({ where: { id } });
  }

  @Post('login')
  async login(@Request() _req: any, @Body() body: CreateUserDto) {
    const { username, password } = body;
    const user = await this.usersService.findOne({
      where: {
        username: username,
        password: password,
      },
    });
    if (!user)
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    return user;
  }
}
