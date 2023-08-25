import {Sequelize} from "sequelize";
import {gql} from "apollo-server";
import {Models} from "@models/init-models";

export const typeDefs = gql`
    type Wallpapers {
        wallpapers_id: Int!
        name: String!
        image: String!
        createdAt: String!
        updatedAt: String!
        category_id: Int!
        canDownload: Boolean!
    }
    
    type Category {
        category_id: Int!
        category_name: String!
        thumbnail: String!
        avatar: String!
        isHeroCategory: Int!
        heroCategoryId: Int!
        createdAt: String!
        updatedAt: String!
    }
    
    type Wallpaper_Info{
        wallpaper_id: Int!
        wallpapers_id: Int!
        author: String!
        downloaded_times: Int!
        like_times: Int!
        views: Int!
    }

    type Hero {
        id: Int!
        hero_id: Int!
        hero_name: String!
        hero_avatar: String!
    }

    type Query {
        Wallpapers: [Wallpapers]!
        Category: [Category]!
        WallpapersInfo(id: Int!): Wallpaper_Info!
    }
    
    
    type Mutation {
        likeWallpaper(id: Int!): Int!
        addWallpaper(name: String!, image: String!, category_id: Int!, canDownload: Boolean!, author: String!): Boolean!
    }
`;


export const resolvers = (models: Models) => {
   return  {
        Query: {
            Wallpapers: async () => {
                const res = await models.wallpapers.findAll();
                return res.map((item) => item.dataValues)
            },
            Category: async () => {
                const res = await models.categories.findAll();
                return res.map((item) => item.dataValues)
            },
            WallpapersInfo: async(parent, args, contextValue, info) => {
                const id = args.id;
                const res = await models.wallpapers_info.findOne({
                    where: {
                        wallpapers_id: id
                    }
                })
                console.log(res?.dataValues)
                return res?.dataValues
            }
        },
        Mutation: {
            likeWallpaper: async (parent, args, contextValue, info) => {
                const id = args.id;
                const res = await models.wallpapers_info.update({
                    like_times: Sequelize.literal('like_times + 1')
                }, {
                    where: {
                        wallpapers_id: id
                    }
                })
                return res[0]
            },
            addWallpaper: async (parent, args, contextValue, info) => {
                const {authorization}= contextValue.req.headers;
                if(authorization !== 'admin') throw new Error('You are not admin');
                const {name, image, category_id, canDownload, author} = args;
                const res = await models.wallpapers.create({
                    name,
                    image,
                    category_id,
                    canDownload
                })
                await models.wallpapers_info.create({
                    wallpapers_id: res.wallpapers_id,
                    author,
                })
                return true
            }
        }
    }
}

