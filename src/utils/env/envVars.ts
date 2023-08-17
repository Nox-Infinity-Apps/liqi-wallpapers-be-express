import dotenv from "dotenv";
import { IEnv } from "@/@types/env.types";
import { config } from "../../config";

dotenv.config();

const env: IEnv = {
  PORT: process.env.PORT || config.DEFAULT_PORT.toString(),
  DEBUG_MODE: process.env.DEBUG_MODE || config.DEBUG_MODE.toString(),
  NODE_ENV: process.env.NODE_ENV || config.NODE_ENV.toString(),
  CONTEXT_PATH: process.env.CONTEXT_PATH || config.CONTEXT_PATH.toString(),
  DB_NAME: process.env.DB_NAME || config.DB_NAME.toString(),
  DB_USERNAME: process.env.DB_USERNAME || config.DB_USERNAME.toString(),
  DB_PASSWORD: process.env.DB_PASSWORD || config.DB_PASSWORD.toString(),
  DB_HOST: process.env.DB_HOST || config.DB_HOST.toString(),
};

export default env;
