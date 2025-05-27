import dotenv from "dotenv";
dotenv.config();

export const config = {
   db: {
    URI: process.env.DB_URI,
  },
  server: {
    port: process.env.PORT,
  },
  JWT: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES,
  },
};