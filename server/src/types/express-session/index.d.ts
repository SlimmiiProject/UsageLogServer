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
   first_name:string;
   last_name:string;
   email:string;
   phonenumber:string;
}