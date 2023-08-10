import express from 'express';
import router from './routes';
import cons, {ProgressBar} from './console';
import dotenv from "dotenv";
import morgan from 'morgan';
import env from './utils/env/envVars';

dotenv.config();

class app {
    public express;
    private bar: ProgressBar;

    constructor() {
        this.bar = new ProgressBar();
        this.bar.start(100, 'StartApp');
        this.express = express();
        this.bar.update(100);
        this.mountRoutes();
    }

    private mountRoutes(): void {
        this.express.use('/',router);
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
            cons.yellow(`- Server running on port ${port}`);
            cons.green(`- Debug mode: ${process.env.DEBUG_MODE}`);
        });
    }
}

export default new app()
