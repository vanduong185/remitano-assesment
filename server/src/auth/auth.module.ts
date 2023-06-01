import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { authProviders } from './auth.provider';
import { PassportModule } from '@nestjs/passport';
import {
  AUTH_JWT_EXPIRED_TIME,
  AUTH_JWT_PRIVATE_KEY,
  AUTH_JWT_PUBLIC_KEY,
} from './constants/auth.const';
import { JwtModule } from '@nestjs/jwt';
import { PublicStrategy } from './strategies/public.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PublicStrategy, ...authProviders],
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        privateKey: AUTH_JWT_PRIVATE_KEY,
        publicKey: AUTH_JWT_PUBLIC_KEY,
        signOptions: {
          algorithm: 'RS256',
          expiresIn: AUTH_JWT_EXPIRED_TIME,
        },
        verifyOptions: {
          algorithms: ['RS256'],
        },
      }),
      inject: [],
    }),
  ],
  exports: [],
})
export class AuthModule {}
