export type RegisterUserPayload = {
  username: string;
  password: string;
};

export type User = {
  isActive: boolean;
  id: number;
  username: string;
  password: string;
};

export type Token = {
  tokenInfo: string;
  expiredIn: string;
};

export type SignInResponse = {
  user: User;
  token: Token;
};
