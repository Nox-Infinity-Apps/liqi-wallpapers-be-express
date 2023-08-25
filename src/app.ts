import dovenv from "dotenv";
import { ApolloServer } from '@apollo/server';
import env from "./utils/env/envVars";
import {startStandaloneServer} from "@apollo/server/standalone";
import {resolvers, typeDefs} from './graphql'
import mysqlDatabase, {MySQLDatabase} from "./database/mysql";
import {initModels} from ".//database/models/init-models";

dovenv.config();

type ModelInterface = {aov_hero: any, categories: any, wallpapers: any, wallpapers_info: any}

class app{
    private server: ApolloServer;
    private readonly model: ModelInterface;
    constructor(){
        mysqlDatabase.connect();
        this.model = initModels(mysqlDatabase.mysqlInstance.sequelize)
        this.server = new ApolloServer({
            typeDefs,
            resolvers: resolvers(this.model)
        });
    }

    public run(): void{
         startStandaloneServer(this.server, {
             listen: { port: Number(env.PORT) },
             context: async ({ req, res }) => {
                    return {
                        req,
                        res,
                    };
             }
             }).then(({url}) => {
            console.log(`🚀  Server ready at ${url}`);
         })
    }
}

export default new app();
