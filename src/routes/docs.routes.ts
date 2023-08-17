import {Router, Request, Response} from 'express';
import swaggerUi from "swagger-ui-express";
import specs from "../config/swagger";

const router: Router = Router();

router.use(
    "/",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

export default router;
