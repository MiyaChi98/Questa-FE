// nextauth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';
import Role from '../constants/Enum/role.enum';
// Define a role enum

// common interface for JWT and Session
interface IUser extends DefaultUser {
  zone?: Role;
  accessToken: string;
  refreshToken: string;
}
declare module 'next-auth' {
  interface User extends IUser {}
  interface Session {
  user?: User;
  }
}
declare module 'next-auth/jwt' {
  interface JWT extends IUser {}
}
