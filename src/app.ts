import express from 'express';
import cons, {ProgressBar} from './console';
import dotenv from "dotenv";
import morgan from 'morgan';
import env from './utils/env/envVars';

dotenv.config();

class app {
    public express;

    constructor() {
        cons.clear();
        this.express = express();
        this.mountRoutes();
        this.applyMiddleware();
    }

    private mountRoutes(): void {
        this.express.use(env.CONTEXT_PATH,require('./routes').default);
    }

    private applyMiddleware(): void{
        //!morgan
        if(Boolean(env.DEBUG_MODE)){
            this.express.use(morgan('dev'));
        }
    }

    public run(): void{
        const port = env.PORT
        this.express.listen(port, () => {
            cons.red("Nox Infinity - Liqi Wallpapers")
            cons.yellow(`- Server running on port ${port}`);
            cons.green(`- Debug mode: ${env.DEBUG_MODE}`);
            cons.green(`- Context path: ${env.CONTEXT_PATH}`);
        });
    }
}

export default new app()
