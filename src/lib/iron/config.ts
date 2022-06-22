import { IronSessionOptions } from 'iron-session';

export const config: IronSessionOptions = {
  cookieName: 'finely:session',
  password: process.env.IRON_SESSION_PASSWORD,
  ttl: 24 * 60 * 60,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
};
