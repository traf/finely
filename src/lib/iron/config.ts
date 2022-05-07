import { IronSessionOptions } from 'iron-session';

export const config: IronSessionOptions = {
  cookieName: 'finely:session',
  password: process.env.IRON_SESSION_PASSWORD,
  // 1 day.
  ttl: 24 * 60 * 60,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
};
