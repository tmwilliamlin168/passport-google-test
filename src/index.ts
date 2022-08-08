import cookieSession from 'cookie-session';
import express from 'express';
import passport from 'passport';

import { COOKIE_KEYS, PORT } from './env';
import './passport';

const app = express();

app.use(cookieSession({ keys: COOKIE_KEYS }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) =>
  res.send('<a href="/login/google">Login with Google</a>'),
);

app.get('/login/google', passport.authenticate('google', { scope: ['email'] }));

app.get('/profile', (req, res) => {
  if (!req.user) {
    res.redirect('/login');
    return;
  }
  res.send('Logged in as ' + JSON.stringify(req.user));
});

app.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/login',
  }),
);

app.get('/', (req, res) => res.send('Hello, world!'));
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
