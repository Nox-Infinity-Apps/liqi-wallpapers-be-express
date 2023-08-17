import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { categories, categoriesId } from './categories';

export interface aov_heroAttributes {
  id: number;
  hero_id: number;
  hero_name: string;
  hero_avatar?: string;
}

export type aov_heroPk = "id";
export type aov_heroId = aov_hero[aov_heroPk];
export type aov_heroOptionalAttributes = "id" | "hero_avatar";
export type aov_heroCreationAttributes = Optional<aov_heroAttributes, aov_heroOptionalAttributes>;

export class aov_hero extends Model<aov_heroAttributes, aov_heroCreationAttributes> implements aov_heroAttributes {
  id!: number;
  hero_id!: number;
  hero_name!: string;
  hero_avatar?: string;

  // aov_hero hasMany categories via heroCategoryId
  categories!: categories[];
  getCategories!: Sequelize.HasManyGetAssociationsMixin<categories>;
  setCategories!: Sequelize.HasManySetAssociationsMixin<categories, categoriesId>;
  addCategory!: Sequelize.HasManyAddAssociationMixin<categories, categoriesId>;
  addCategories!: Sequelize.HasManyAddAssociationsMixin<categories, categoriesId>;
  createCategory!: Sequelize.HasManyCreateAssociationMixin<categories>;
  removeCategory!: Sequelize.HasManyRemoveAssociationMixin<categories, categoriesId>;
  removeCategories!: Sequelize.HasManyRemoveAssociationsMixin<categories, categoriesId>;
  hasCategory!: Sequelize.HasManyHasAssociationMixin<categories, categoriesId>;
  hasCategories!: Sequelize.HasManyHasAssociationsMixin<categories, categoriesId>;
  countCategories!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof aov_hero {
    return aov_hero.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hero_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "hero_id"
    },
    hero_name: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: "hero_name"
    },
    hero_avatar: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'aov_hero',
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
        name: "hero_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "hero_id" },
        ]
      },
      {
        name: "hero_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "hero_name" },
        ]
      },
    ]
  });
  }
}
