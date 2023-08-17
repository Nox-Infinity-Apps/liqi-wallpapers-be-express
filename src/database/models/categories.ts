import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { aov_hero, aov_heroId } from './aov_hero';
import type { wallpapers, wallpapersId } from './wallpapers';

export interface categoriesAttributes {
  category_id: number;
  category_name?: string;
  thumbnail?: string;
  avatar?: string;
  isHeroCategory: number;
  heroCategoryId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type categoriesPk = "category_id";
export type categoriesId = categories[categoriesPk];
export type categoriesOptionalAttributes = "category_id" | "category_name" | "thumbnail" | "avatar" | "isHeroCategory" | "heroCategoryId" | "createdAt" | "updatedAt";
export type categoriesCreationAttributes = Optional<categoriesAttributes, categoriesOptionalAttributes>;

export class categories extends Model<categoriesAttributes, categoriesCreationAttributes> implements categoriesAttributes {
  category_id!: number;
  category_name?: string;
  thumbnail?: string;
  avatar?: string;
  isHeroCategory!: number;
  heroCategoryId?: number;
  createdAt!: Date;
  updatedAt!: Date;

  // categories belongsTo aov_hero via heroCategoryId
  heroCategory!: aov_hero;
  getHeroCategory!: Sequelize.BelongsToGetAssociationMixin<aov_hero>;
  setHeroCategory!: Sequelize.BelongsToSetAssociationMixin<aov_hero, aov_heroId>;
  createHeroCategory!: Sequelize.BelongsToCreateAssociationMixin<aov_hero>;
  // categories hasMany wallpapers via category_id
  wallpapers!: wallpapers[];
  getWallpapers!: Sequelize.HasManyGetAssociationsMixin<wallpapers>;
  setWallpapers!: Sequelize.HasManySetAssociationsMixin<wallpapers, wallpapersId>;
  addWallpaper!: Sequelize.HasManyAddAssociationMixin<wallpapers, wallpapersId>;
  addWallpapers!: Sequelize.HasManyAddAssociationsMixin<wallpapers, wallpapersId>;
  createWallpaper!: Sequelize.HasManyCreateAssociationMixin<wallpapers>;
  removeWallpaper!: Sequelize.HasManyRemoveAssociationMixin<wallpapers, wallpapersId>;
  removeWallpapers!: Sequelize.HasManyRemoveAssociationsMixin<wallpapers, wallpapersId>;
  hasWallpaper!: Sequelize.HasManyHasAssociationMixin<wallpapers, wallpapersId>;
  hasWallpapers!: Sequelize.HasManyHasAssociationsMixin<wallpapers, wallpapersId>;
  countWallpapers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof categories {
    return categories.init({
    category_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category_name: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    thumbnail: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    isHeroCategory: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    heroCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'aov_hero',
        key: 'id'
      }
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
    tableName: 'categories',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
      {
        name: "heroCategoryId",
        using: "BTREE",
        fields: [
          { name: "heroCategoryId" },
        ]
      },
    ]
  });
  }
}
