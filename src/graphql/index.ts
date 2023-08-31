import {Sequelize, Op} from "sequelize";
import {gql} from "apollo-server";
import {Models, wallpapersAttributes} from "../database/models/init-models";

export const typeDefs = gql`
    type Wallpapers {
        wallpapers_id: ID!
        name: String!
        image: String!
        createdAt: String!
        updatedAt: String!
        category_id: Int!
        canDownload: Boolean!
    }
    
    type Category {
        category_id: ID!
        category_name: String!
        thumbnail: String!
        avatar: String!
        isHeroCategory: Int!
        heroCategoryId: Int!
        createdAt: String!
        updatedAt: String!
    }
    
    type Wallpaper_Info{
        wallpaper_id: ID!
        category_id: Int!
        image: String!
        author: String!
        downloaded_times: Int!
        like_times: Int!
        views: Int!
    }

    type Hero {
        id: ID!
        hero_id: Int!
        hero_name: String!
        hero_avatar: String!
    }

    enum Order {
        ASC
        DESC
    }
    
    enum SortBy {
        name
        createdAt
        updatedAt
        random
        views
    }
    
    type HotWallpaper{
        wallpaper_id: ID!
        name: String!
        image: String!
        createdAt: String!
        like_times: Int!
        views: Int!
        downloaded_times: Int!
    }
    

    type Query {
        Wallpapers(order: Order = "ASC", limit: Int = 5, sort_by: SortBy = "createdAt", offset: Int = 0): [Wallpapers]!
        Category: [Category]!
        WallpapersInfo(id: Int!): Wallpaper_Info!
        HotWallpapers(limit: Int! = 7): [HotWallpaper]!
        RelatedWallpaper(category_id: Int!, limit: Int! = 5): [Wallpapers]!
        Search(keyword: String!): [Wallpapers]!
        SearchCategory(keyword: String!): [Category]!
        GetSearchSuggestions(keyword: String!): [String]!
        GetWallpaperInCategory(category_id: Int!, sort_by: SortBy = "random", limit: Int = 5, offset:Int = 0, order: Order = "ASC"): [Wallpapers]!
    }
    
    
    
    type Mutation {
        likeWallpaper(id: Int!): Int!
        unlikeWallpaper(id: Int!): Int!
        addWallpaper(name: String!, image: String!, category_id: Int!, canDownload: Boolean!, author: String!): Boolean!
        increaseView(wallpaper_id: Int!): Boolean!
        addCategory(category_name: String!, thumbnail: String!, avatar: String!, isHeroCategory: Boolean!, heroCategoryId: Int): Boolean!,
        deleteWallpaper(wallpaper_id: Int!): Boolean!
    }
`;

interface ResolversInterface{
    Query: {
        Wallpapers: (
            parent: any,
            args: {
            order?: 'ASC' | 'DESC'
            limit?: number,
            sort_by?: 'name' | 'createdAt' | 'updatedAt' | 'random' | 'views',
            offset?: number
        }) => Promise<wallpapersAttributes[]>,
        Category: () => Promise<any>,
        WallpapersInfo: (parent: any, args: any, contextValue: any, info: any) => Promise<any>,
        HotWallpapers : (parant: any, args: any) => Promise<HotWallpapersInterface[]>,
        RelatedWallpaper: (parent: any, args: {category_id: number, limit: number}) => Promise<wallpapersAttributes[]>,
        Search: (parent: any, args: {keyword: string}) => Promise<wallpapersAttributes[]>
        GetSearchSuggestions: (parent: any, args: {keyword: string}) => Promise<string[]>,
        GetWallpaperInCategory: (parent: any, args: {category_id: number, sort_by: 'name' | 'createdAt' | 'updatedAt' | 'random', limit: number, offset: number, order: 'ASC' | 'DESC'}) => Promise<wallpapersAttributes[]>
        SearchCategory: (parent: any, args: {keyword: string}) => Promise<any>,
    },
    Mutation: {
        likeWallpaper: (parent: any, args: any, contextValue: any, info: any) => Promise<any>,
        unlikeWallpaper: (parent: any, args: {id: number}, contextValue: any, info: any) => Promise<any>,
        addWallpaper: (parent: any, args: any, contextValue: any, info: any) => Promise<any>,
        increaseView: (parent, args: {wallpaper_id: number}) => Promise<boolean>,
        addCategory: (parent, args: any, contextValue: any, info: any) => Promise<boolean>,
        deleteWallpaper: (parent, args: {wallpaper_id: number}, contextValue) => Promise<boolean>
    }
}

interface HotWallpapersInterface{
    wallpaper_id: number,
    name: string,
    image: string,
    createdAt: Date;
    like_times: number;
    views: number;
    downloaded_times: number;
}

export const resolvers = (models: Models): ResolversInterface => {
   return  {
        Query: {
            Wallpapers: async (parent, args) => {
                console.log(args)
                const order = args.order || 'ASC';
                const limit = args?.limit || 10;
                const sort_by = args?.sort_by || 'name';
                const offset = args?.offset || 0;

                let res;

                if(sort_by === "views"){
                    res = await models.wallpapers_info.findAll({
                        order: [
                            ['views', order]
                        ],
                        limit,
                        offset,
                        include: [
                            {
                                model: models.wallpapers,
                                as: 'wallpaper'
                            }
                        ]
                    })
                    return res.map((item) => item.dataValues.wallpaper.dataValues)
                }else if(sort_by === 'random') {
                    res = await models.wallpapers.findAll({
                        order: Sequelize.literal('rand()'),
                        limit,
                        offset
                    })
                } else {
                     res = await models.wallpapers.findAll({
                        order: [
                            [sort_by, order]
                        ],
                        limit,
                        offset
                    });
                }
                return res.map((item) => item.dataValues)
            },
            Category: async () => {
                const res = await models.categories.findAll();
                return res.map((item) => item.dataValues)
            },
            WallpapersInfo: async(parent, args, contextValue, info) => {
                const id = args.id;
                const res: any = await models.wallpapers_info.findOne({
                    where: {
                        wallpapers_id: id
                    },
                    include: [
                        {
                            model: models.wallpapers,
                            as: 'wallpaper'
                        }]
                })

                return {
                    wallpaper_id: res?.dataValues.wallpapers_id,
                    category_id: res?.dataValues.wallpaper.dataValues.category_id,
                    image: res?.dataValues.wallpaper.dataValues.image,
                    author: res?.dataValues.author,
                    downloaded_times: res?.dataValues.downloaded_times,
                    like_times: res?.dataValues.like_times,
                    views: res?.dataValues.views
                }
            },
            HotWallpapers: async (parent, args): Promise<HotWallpapersInterface[]> => {
               // get in wallpapers but order by like_time in wallpaper info
                console.info('args', args)
                const limit = args?.limit || 10;
                const res: Array<any> = await models.wallpapers_info.findAll({
                    order: [
                        ['like_times', 'DESC']
                    ],
                    limit,
                    include: [
                        {
                            model: models.wallpapers,
                            as: 'wallpaper'
                        }
                    ]
                })

                const result: HotWallpapersInterface[] = res.map((item): HotWallpapersInterface => {
                    const wallpaper = item.dataValues.wallpaper.dataValues;
                    return {
                        wallpaper_id: wallpaper.wallpapers_id,
                        name: wallpaper.name,
                        image: wallpaper.image,
                        createdAt: wallpaper.createdAt,
                        like_times: item.dataValues.like_times,
                        views: item.dataValues.views,
                        downloaded_times: item.dataValues.downloaded_times
                    }
                })
                console.log("ok",result)
                return result
            },
            RelatedWallpaper: async (parent, args) => {
                const category_id = args.category_id;
                const limit = args.limit;
                const res = await models.wallpapers.findAll({
                    where: {
                        category_id
                    },
                    limit,
                    order: Sequelize.literal('rand()')
                })
                return res.map((item) => item.dataValues)
            },
            Search: async (parent, args) => {
                const keyword = args.keyword;
                const res = await models.wallpapers.findAll({
                    where: {
                        name: {
                            [Op.like]: `%${keyword}%`
                        }
                    }
                })
                return res.map((item) => item.dataValues)
            },
            GetSearchSuggestions: async (parent, args) => {
                const keyword = args.keyword;
                const res = await models.wallpapers.findAll({
                    where: {
                        name: {
                            [Op.like]: `%${keyword}%`
                        }
                    }
                })
                return res.map((item) => item.dataValues.name)
            },
            GetWallpaperInCategory: async (parent, args) => {
                const category_id = args.category_id;
                const sort_by = args.sort_by;
                const limit = args.limit;
                const offset = args.offset;
                const order = args.order;
                let res;
                if(sort_by === 'random') {
                    res = await models.wallpapers.findAll({
                        where: {
                            category_id
                        },
                        order: Sequelize.literal('rand()'),
                        limit,
                        offset
                    })
                } else {
                    res = await models.wallpapers.findAll({
                        where: {
                            category_id
                        },
                        order: [
                            [sort_by, order]
                        ],
                        limit,
                        offset
                    })
                }
                return res.map((item) => item.dataValues)
            },
            SearchCategory: async (parent, args) => {
                const keyword = args.keyword;
                const res = await models.categories.findAll({
                    where: {
                        category_name: {
                            [Op.like]: `%${keyword}%`
                        }
                    }
                })
                return res.map((item) => item.dataValues)
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
            unlikeWallpaper: async (parent, args, contextValue, info) => {
                const id = args.id;
                const res = await models.wallpapers_info.update({
                    like_times: Sequelize.literal('like_times - 1')
                }, {
                    where: {
                        wallpapers_id: id
                    }
                })
                return true
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
            },
            addCategory: async (parent, args, contextValue, info) => {
                const {authorization}= contextValue.req.headers;
                if(authorization !== 'admin') throw new Error('You are not admin');
                const {category_name, thumbnail, avatar, isHeroCategory, heroCategoryId} = args;
                const res = await models.categories.create({
                    category_name,
                    thumbnail,
                    avatar,
                    isHeroCategory,
                    heroCategoryId
                })
                return true
            },
            increaseView: async (parent, args) => {
                const {wallpaper_id} = args;
                const res = await models.wallpapers_info.update({
                    views: Sequelize.literal('views + 1')
                }, {
                    where: {
                        wallpapers_id: wallpaper_id
                    }
                })
                return true
            },
            deleteWallpaper: async (parent, args, contextValue) => {
                const {authorization}= contextValue.req.headers;
                if(authorization !== 'admin') throw new Error('You are not admin');
                const {wallpaper_id} = args;
                await models.wallpapers_info.destroy({
                    where: {
                        wallpapers_id: wallpaper_id
                    }
                })
                await models.wallpapers.destroy({
                    where: {
                        wallpapers_id: wallpaper_id
                    }
                })
                return true
            }
        }
    }
}

