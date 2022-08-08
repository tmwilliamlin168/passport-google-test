import dotenv from 'dotenv';

dotenv.config();

if (
  !process.env.BASE_URL ||
  !process.env.COOKIE_KEYS ||
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET
) {
  console.error('Missing vars in .env');
  process.exit(1);
}

export const { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

export const COOKIE_KEYS = JSON.parse(process.env.COOKIE_KEYS);

export const PORT = +(process.env.PORT || 3000);
