import passport from 'passport';
import passportGoogle from 'passport-google-oauth2';

import { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './env';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: Express.User, done) => done(null, user));

passport.use(
  new passportGoogle.Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${BASE_URL}/oauth2/redirect/google`,
      passReqToCallback: true,
    },
    (
      req: Express.Request,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: passportGoogle.VerifyCallback,
    ) => done(null, profile),
  ),
);
