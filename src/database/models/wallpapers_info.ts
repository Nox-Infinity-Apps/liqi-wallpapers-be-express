import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { wallpapers, wallpapersId } from './wallpapers';

export interface wallpapers_infoAttributes {
  id: number;
  wallpapers_id?: number;
  author?: string;
  like_times: number;
  downloaded_times: number;
  views: number;
}

export type wallpapers_infoPk = "id";
export type wallpapers_infoId = wallpapers_info[wallpapers_infoPk];
export type wallpapers_infoOptionalAttributes = "id" | "wallpapers_id" | "author" | "like_times" | "downloaded_times" | "views";
export type wallpapers_infoCreationAttributes = Optional<wallpapers_infoAttributes, wallpapers_infoOptionalAttributes>;

export class wallpapers_info extends Model<wallpapers_infoAttributes, wallpapers_infoCreationAttributes> implements wallpapers_infoAttributes {
  id!: number;
  wallpapers_id?: number;
  author?: string;
  like_times!: number;
  downloaded_times!: number;
  views!: number;

  // wallpapers_info belongsTo wallpapers via wallpapers_id
  wallpaper!: wallpapers;
  getWallpaper!: Sequelize.BelongsToGetAssociationMixin<wallpapers>;
  setWallpaper!: Sequelize.BelongsToSetAssociationMixin<wallpapers, wallpapersId>;
  createWallpaper!: Sequelize.BelongsToCreateAssociationMixin<wallpapers>;

  static initModel(sequelize: Sequelize.Sequelize): typeof wallpapers_info {
    return wallpapers_info.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    wallpapers_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'wallpapers',
        key: 'wallpapers_id'
      }
    },
    author: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    like_times: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    downloaded_times: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'wallpapers_info',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "wallpapers_id",
        using: "BTREE",
        fields: [
          { name: "wallpapers_id" },
        ]
      },
    ]
  });
  }
}
