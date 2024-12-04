import { config } from "dotenv-safe";
config({
  example: "./.env.example",
  path: "./.env",
});

export default {
  port: process.env.PORT,
  dbUrl: process.env.MY_DB_URL,
  jwt: {
    accessTokenKey: process.env.ACCESS_TOKEN_KEY,
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
  },
  sessionSecret: process.env.SESSION_KEY,
};
