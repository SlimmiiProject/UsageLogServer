import session from 'express-session';
import { UserAccount } from '../../data/entities/UserAccount';

declare module 'express-session' {
  export interface SessionData {
    data: UserSession;
  }
}

export interface UserSession {
  isLoggedIn: boolean;
  user?: User;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}