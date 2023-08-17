import { IConfig } from "@/@types/config.type";

export const config: IConfig = {
  DEFAULT_PORT: 3000,
  DEBUG_MODE: true,
  NODE_ENV: "development",
  CONTEXT_PATH: "/api",
  DB_NAME: "aov-wallpapers",
  DB_USERNAME: "root",
  DB_PASSWORD: "",
  DB_HOST: "localhost",
};
