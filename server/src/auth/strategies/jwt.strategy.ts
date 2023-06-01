import { AUTH_JWT_PRIVATE_KEY } from './../constants/auth.const';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../users/models/user.model';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: AUTH_JWT_PRIVATE_KEY,
    });
  }

  async validate(args: { userId: number }): Promise<User> {
    const user = await this.userService.findOne({
      where: { id: args.userId },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user['dataValues'];
  }
}
