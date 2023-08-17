import { Sequelize } from "sequelize";
import env from "../utils/env/envVars";

interface Database {
  sequelize: Sequelize;
}

class MySQLDatabase {
  private db: Database = {} as Database;

  connect() {
    const sequelize = new Sequelize(
      env.DB_NAME,
      env.DB_USERNAME,
      env.DB_PASSWORD,
      {
        host: env.DB_HOST,
        dialect: "mysql",
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        logging: false,
      },
    );
    console.log("Mysql database connected");
    Object.assign(this.db, { sequelize });
  }

  get mysqlInstance() {
    return this.db;
  }
}

const mysqlDatabase = new MySQLDatabase();

export default mysqlDatabase;
