import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { categories, categoriesId } from './categories';
import type { wallpapers_info, wallpapers_infoId } from './wallpapers_info';

export interface wallpapersAttributes {
  wallpapers_id: number;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  category_id?: number;
  canDownload: number;
}

export type wallpapersPk = "wallpapers_id";
export type wallpapersId = wallpapers[wallpapersPk];
export type wallpapersOptionalAttributes = "wallpapers_id" | "createdAt" | "updatedAt" | "category_id" | "canDownload";
export type wallpapersCreationAttributes = Optional<wallpapersAttributes, wallpapersOptionalAttributes>;

export class wallpapers extends Model<wallpapersAttributes, wallpapersCreationAttributes> implements wallpapersAttributes {
  wallpapers_id!: number;
  name!: string;
  image!: string;
  createdAt!: Date;
  updatedAt!: Date;
  category_id?: number;
  canDownload!: number;

  // wallpapers belongsTo categories via category_id
  category!: categories;
  getCategory!: Sequelize.BelongsToGetAssociationMixin<categories>;
  setCategory!: Sequelize.BelongsToSetAssociationMixin<categories, categoriesId>;
  createCategory!: Sequelize.BelongsToCreateAssociationMixin<categories>;
  // wallpapers hasMany wallpapers_info via wallpapers_id
  wallpapers_infos!: wallpapers_info[];
  getWallpapers_infos!: Sequelize.HasManyGetAssociationsMixin<wallpapers_info>;
  setWallpapers_infos!: Sequelize.HasManySetAssociationsMixin<wallpapers_info, wallpapers_infoId>;
  addWallpapers_info!: Sequelize.HasManyAddAssociationMixin<wallpapers_info, wallpapers_infoId>;
  addWallpapers_infos!: Sequelize.HasManyAddAssociationsMixin<wallpapers_info, wallpapers_infoId>;
  createWallpapers_info!: Sequelize.HasManyCreateAssociationMixin<wallpapers_info>;
  removeWallpapers_info!: Sequelize.HasManyRemoveAssociationMixin<wallpapers_info, wallpapers_infoId>;
  removeWallpapers_infos!: Sequelize.HasManyRemoveAssociationsMixin<wallpapers_info, wallpapers_infoId>;
  hasWallpapers_info!: Sequelize.HasManyHasAssociationMixin<wallpapers_info, wallpapers_infoId>;
  hasWallpapers_infos!: Sequelize.HasManyHasAssociationsMixin<wallpapers_info, wallpapers_infoId>;
  countWallpapers_infos!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof wallpapers {
    return wallpapers.init({
    wallpapers_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'category_id'
      }
    },
    canDownload: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      }
  }, {
    sequelize,
    tableName: 'wallpapers',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "wallpapers_id" },
        ]
      },
      {
        name: "category_id",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
  }
}
