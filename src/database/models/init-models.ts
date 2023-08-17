import type { Sequelize } from "sequelize";
import { aov_hero as _aov_hero } from "./aov_hero";
import type { aov_heroAttributes, aov_heroCreationAttributes } from "./aov_hero";
import { categories as _categories } from "./categories";
import type { categoriesAttributes, categoriesCreationAttributes } from "./categories";
import { wallpapers as _wallpapers } from "./wallpapers";
import type { wallpapersAttributes, wallpapersCreationAttributes } from "./wallpapers";
import { wallpapers_info as _wallpapers_info } from "./wallpapers_info";
import type { wallpapers_infoAttributes, wallpapers_infoCreationAttributes } from "./wallpapers_info";

export {
  _aov_hero as aov_hero,
  _categories as categories,
  _wallpapers as wallpapers,
  _wallpapers_info as wallpapers_info,
};

export type {
  aov_heroAttributes,
  aov_heroCreationAttributes,
  categoriesAttributes,
  categoriesCreationAttributes,
  wallpapersAttributes,
  wallpapersCreationAttributes,
  wallpapers_infoAttributes,
  wallpapers_infoCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const aov_hero = _aov_hero.initModel(sequelize);
  const categories = _categories.initModel(sequelize);
  const wallpapers = _wallpapers.initModel(sequelize);
  const wallpapers_info = _wallpapers_info.initModel(sequelize);

  categories.belongsTo(aov_hero, { as: "heroCategory", foreignKey: "heroCategoryId"});
  aov_hero.hasMany(categories, { as: "categories", foreignKey: "heroCategoryId"});
  wallpapers.belongsTo(categories, { as: "category", foreignKey: "category_id"});
  categories.hasMany(wallpapers, { as: "wallpapers", foreignKey: "category_id"});
  wallpapers_info.belongsTo(wallpapers, { as: "wallpaper", foreignKey: "wallpapers_id"});
  wallpapers.hasMany(wallpapers_info, { as: "wallpapers_infos", foreignKey: "wallpapers_id"});

  return {
    aov_hero: aov_hero,
    categories: categories,
    wallpapers: wallpapers,
    wallpapers_info: wallpapers_info,
  };
}
