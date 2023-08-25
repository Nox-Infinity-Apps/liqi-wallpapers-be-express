import { Router, Request, Response } from "express";
import wallpaperController from "..///controllers/wallpapers.controllers";

const router = Router();

/**
 * @swagger
 * /api/wallpapers:
 * get:
 * description: Get all wallpapers
 * responses:
 * 200:
 * description: Success
 * 500:
 * description: Internal Server Error
 */

router.get("/", wallpaperController.getWallpapers);
router.get("/like/:wallpaper_id", wallpaperController.likeWallpaper);
router.get("/hot", wallpaperController.getHotWallpapers);

router.get("/wallpapers", (req: Request, res: Response): void => {
  res.json({
    message: "Hello World!",
  });
});

export default router;
