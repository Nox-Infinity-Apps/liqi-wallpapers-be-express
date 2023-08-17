import { Request, Response, NextFunction } from "express";
import { initModels } from "../database/models/init-models";
import mysqlDatabase from "../database/mysql";
import zod from "zod";

enum SortBy {
  name = "name",
  createdAt = "createdAt",
}

enum Order {
  asc = "asc",
  desc = "desc",
}

enum WallpaperType {
  image = "image",
  id = "wallpapers_id",
  name = "name",
  permission = "canDownload"
}

class wallpaperController {
  construct() {}

  static async getHotWallpapers(req: Request, res: Response) {
    const models = initModels(
        mysqlDatabase.mysqlInstance.sequelize,
        );

    try {
      const schema = zod.object({
        limit: zod.number(),
      });
        const {limit} = schema.parse({
            limit: Number(req.query.limit),
        })

      const hotWallpapers = await models.wallpapers.findAll({
        attributes: ['id', 'name', 'image'],
        include: [
          {
            model: models.wallpapers_info,
            as: 'wallpapers_infos',
            attributes: ['like_times'],
            order: [['like_times', 'DESC']],
            limit: 1
          }
        ],
        order: [[models.wallpapers_info, 'like_times', 'DESC']],
        limit: 10
      });

        res.json({
            message: "success",
            description: "Wallpapers fetched successfully",
            wallpapers: hotWallpapers
        }).status(200);
    }catch(err) {
        res.json({
            message: "error",
            description: "Error while parsing query parameters",
            error: err
        })
    }
  }


  static async likeWallpaper(req: Request, res: Response) {
    const wallpaperModel = initModels(
      mysqlDatabase.mysqlInstance.sequelize,
    ).wallpapers_info;
    try {
      const schema = zod.object({
        wallpaper_id: zod.number(),
      });
      const {wallpaper_id} = schema.parse({
        wallpaper_id: Number(req.params.wallpaper_id),
      });
      const wallpaper = await wallpaperModel.findOne({
            where: {
                wallpapers_id: wallpaper_id
            }
        });

      if(wallpaper) {
        await wallpaper.increment('like_times', {by: 1});
        res.json({
          message: "success",
          description: "Wallpaper liked successfully",
        })
      }else throw new Error("Wallpaper not found "+wallpaper_id);
    }catch(err) {
      res.json({
        message: "error",
        description: "Error while parsing query parameters or wallpaper not found"+ err,
      })
    }
  }

  static async getWallpapers(req: Request, res: Response) {
    const wallpaperModel = initModels(
      mysqlDatabase.mysqlInstance.sequelize,
    ).wallpapers;
    try {
      const schema = zod.object({
        next: zod.number(),
        limit: zod.number(),
        sort_by: zod
          .union([zod.literal(SortBy.name), zod.literal(SortBy.createdAt)])
          .optional(),
        order: zod
          .union([zod.literal(Order.asc), zod.literal(Order.desc)])
          .optional(),
      });
      const {
        next: nextValue,
        limit: limitValue,
        sort_by,
        order,
      } = schema.parse({
        next: Number(req.query.next),
        limit: Number(req.query.limit),
        sort_by: req.query.sort_by,
        order: req.query.order,
      });
      const wallpapers = await wallpaperModel.findAll({
        limit: limitValue,
        offset: nextValue,
        attributes: [WallpaperType.id, WallpaperType.image, WallpaperType.name, WallpaperType.permission],
        order: [[sort_by || WallpaperType.id, order || Order.asc]],
      });
      res
        .json({
          message: "success",
          description: "Wallpapers fetched successfully",
          wallpapers,
        })
        .status(200);
    } catch (err) {
      res
        .json({
          message: "error",
          description: "Error while parsing query parameters",
        })
        .status(400);
    }
  }
}

export default wallpaperController;
