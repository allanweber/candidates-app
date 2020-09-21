import { AuthUser } from './auth-user.model';

export class LoginResponse {
  type: string;

  token: string;

  roles: string[];

  expirationIn: number;

  issuedAt: Date;

  user: AuthUser;
}
