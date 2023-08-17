import express from 'express';
import cons, {ProgressBar} from './console';
import dotenv from "dotenv";
import morgan from 'morgan';
import env from './utils/env/envVars';
import mysqlDatabase from "./database/mysql";
import bodyParser from 'body-parser';

dotenv.config();

class app {
    public express;
    private database;

    constructor() {
        cons.clear();
        this.express = express();
        this.mountRoutes();
        this.applyMiddleware();
        this.database = mysqlDatabase
    }

    private mountRoutes(): void {
        this.express.use(env.CONTEXT_PATH,require('./routes').default);
    }

    private connectDatabase(): void{
        this.database.connect();
    }

    private applyMiddleware(): void{
        //!morgan
        this.express.use(bodyParser.json());
        if(Boolean(env.DEBUG_MODE)){
            this.express.use(morgan('dev'));
        }
    }

    public run(): void{
        this.connectDatabase();
        const port = env.PORT
        this.express.listen(port, () => {
            cons.red("Nox Infinity - Liqi wallpapers.controllers.ts")
            cons.yellow(`- Server running on port ${port}`);
            cons.green(`- Debug mode: ${env.DEBUG_MODE}`);
            cons.green(`- Context path: ${env.CONTEXT_PATH}`);
        });
    }
}

export default new app()
