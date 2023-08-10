import {Router} from 'express';

const router = Router();

router.get('/wallpapers/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
})

export default router;
