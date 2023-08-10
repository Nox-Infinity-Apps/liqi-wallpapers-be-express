import { Router, Request, Response } from "express";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send("Hello World2!")
})

router.get("/wallpapers", (req: Request, res: Response): void => {
  res.json({
    message: "Hello World!",
  });
});

export default router;
