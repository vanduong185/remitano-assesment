import { RegisterUserDto } from './dtos/register-user.dto';
import { UsersService } from './../users/users.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../users/models/user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import { LoginUserDto } from './dtos/login-user.dto';
import { AUTH_JWT_EXPIRED_TIME } from './constants/auth.const';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async signUp(dto: RegisterUserDto) {
    const user = await this.userService.findOne({
      where: {
        username: dto.username,
      },
    });

    if (user) {
      throw new NotFoundException('User already existed');
    }

    const pass = await this.hashPassword(dto.password);

    const newUser = await this.userService.create({ ...dto, password: pass });

    const { ...result } = newUser['dataValues'];

    return _.omit(result, ['updatedAt', 'createdAt', 'isActive', 'password']);
  }

  async signIn(dto: LoginUserDto) {
    const user = await this.userService.findOne({
      where: {
        username: dto.username,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await this.comparePassword(
      dto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Password is invalid');
    }

    const token = await this.generateToken(user);

    return {
      user,
      token: {
        tokenInfo: token,
        expiredIn: dayjs().add(AUTH_JWT_EXPIRED_TIME, 'second').toDate(),
      },
    };
  }

  findOne(id: string): Promise<User> {
    return this.userService.findOne({
      where: {
        id,
      },
    });
  }

  private async hashPassword(password: any) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async generateToken(user: User) {
    const token = await this.jwtService.signAsync({
      userId: user.id,
    });
    return token;
  }

  private async comparePassword(enteredPassword: string, dbPassword: string) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
