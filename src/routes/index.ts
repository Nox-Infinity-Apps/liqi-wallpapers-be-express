import { Router } from 'express';
import fs from 'fs';
import cons from '../console';

const router: Router = Router();

fs.readdirSync(__dirname).forEach((file) => {
  if(file.toLowerCase().indexOf('.routes.ts')!=-1){
    const prefix = file.toLowerCase().replace('.routes.ts','');
    const route = require(`./${file}`).default;
    router.use(prefix, route);
    cons.green(`- Route ${prefix} loaded`);
  }
})

export default router;
