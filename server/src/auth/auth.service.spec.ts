import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { Test } from '@nestjs/testing';
import { UsersService } from '../users/users.service';

import * as _ from 'lodash';

const mockedResponseSignIn = {
  user: {
    id: 30,
    username: 'tenny',
    password: '$2b$10$4JWH8xVhS.6cbPkEVAcvw.e9kWxrGs3h0Rf6ArXvFxuNHiqYJhls6',
    isActive: true,
    createdAt: '2023-06-01T04:29:21.000Z',
    updatedAt: '2023-06-01T04:29:21.000Z',
  },
  token: {
    tokenInfo:
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwLCJpYXQiOjE2ODU2OTg3NjIsImV4cCI6MTY4NTcwMjM2Mn0.YAYbPHcn-rDFiBqmH6FdQb8dZOqMcXf5gwajE4wlJQlTrSnRIqt1xV0xpqOClxleNsGcky_dQntewnHByvpJ7So1KIViF53MHY3Is4DD2cdM3BXHsuMPPFqQJtmqw4ITtt2nxvtrbTzSRrRLh9mZdaxa5WaKTiWCKGYYEtgdOBI_JvaHceDIyHYl1H5BZAEgitSp_GSCGYZ6-F41p3_FsVypkrcENoj0MbK6Nufq_3qsZDGLZerRfP5rvsB0e5rTlq-EkpF8g1v02kzfiqYdg_KpdHjHGVBeWyxjkbrc99MwYDSmggNItuKGR839cokfDkZySDolkZTA_QAbnwrUaQ',
    expiredIn: '2023-06-02T10:39:22.423Z',
  },
};

describe('AuthController', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockImplementation(() => {
              return mockedResponseSignIn.token.tokenInfo;
            }),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn().mockImplementation((condition) => {
              if (condition['where']['username'] === 'tenny') {
                return mockedResponseSignIn.user;
              }
              return null;
            }),
            create: jest.fn().mockImplementation((condition) => {
              return {
                dataValues: {
                  isActive: true,
                  id: 33,
                  username: 'tenny2',
                  password:
                    '$2b$10$Ny3YFEhui7dLQnaaB/TUjeOfhOF86J1nsEWTY9o.21.PhNFOL0Xiu',
                  updatedAt: '2023-06-02T09:53:41.669Z',
                  createdAt: '2023-06-02T09:53:41.669Z',
                },
              };
            }),
          },
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('SignIn', () => {
    it('should sign in', async () => {
      const result = {
        id: 30,
        username: 'tenny',
        password:
          '$2b$10$4JWH8xVhS.6cbPkEVAcvw.e9kWxrGs3h0Rf6ArXvFxuNHiqYJhls6',
        isActive: true,
        createdAt: '2023-06-01T04:29:21.000Z',
        updatedAt: '2023-06-01T04:29:21.000Z',
      };

      const response = _.omit(
        await authService.signIn({
          username: 'tenny',
          password: 'Abc@4321',
        }),
        ['token'],
      );
      expect(response.user).toMatchObject(result);
    });
  });

  describe('SignUp', () => {
    it('should sign up', async () => {
      const result = {
        username: 'tenny2',
      };

      const response = await authService.signUp({
        username: 'tenny2',
        password: 'Abc@4321',
      });

      expect(response).toMatchObject(result);
    });
  });
});
