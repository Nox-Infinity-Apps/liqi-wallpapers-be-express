import dotenv from "dotenv";
import { IEnv } from "@/@types/env.types";
import { config } from "../../config";

dotenv.config();

const env: IEnv = {
  PORT: process.env.PORT || config.DEFAULT_PORT.toString(),
  DEBUG_MODE: process.env.DEBUG_MODE || config.DEBUG_MODE.toString(),
  NODE_ENV: process.env.NODE_ENV || config.NODE_ENV.toString(),
  CONTEXT_PATH: process.env.CONTEXT_PATH || config.CONTEXT_PATH.toString(),
};

export default env;
