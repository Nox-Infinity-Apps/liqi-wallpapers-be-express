import { Router, Request, Response } from "express";
import fs from "fs";
import cons from "../console";
import path from "path";
import {config} from "../config";

const router: Router = Router();

router.get('/', require('./global').default);

fs.readdirSync(__dirname).forEach((file) => {
  if (file.toLowerCase().indexOf(".routes.ts") != -1) {
    const prefix = file.toLowerCase().replace(".routes.ts", "");
    const route = require(path.join(__dirname,`${file}`)).default;
    router.use(`/${prefix}`, route);
    cons.yellow(`=> Route ${prefix} loaded at ${config.CONTEXT_PATH}/${prefix}`);
  }
});

console.log(`---------------------------------------------------------`)

export default router;

