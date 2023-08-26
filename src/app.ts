import dovenv from "dotenv";
import { ApolloServer } from '@apollo/server';
import env from "./utils/env/envVars";
import {resolvers, typeDefs} from './graphql'
import mysqlDatabase, {MySQLDatabase} from "./database/mysql";
import {initModels} from ".//database/models/init-models";
import cors from 'cors';
import { json } from 'body-parser';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import express, {Express} from "express";
import {expressMiddleware} from "@apollo/server/express4";
import {DocumentNode} from "graphql/language";


dovenv.config();

type ModelInterface = {aov_hero: any, categories: any, wallpapers: any, wallpapers_info: any}

class app{
    private readonly server: ApolloServer;
    private readonly express: Express;
    private readonly httpServer: http.Server;
    private readonly model: ModelInterface;
    constructor(){
        mysqlDatabase.connect();
        this.express = express();
        this.httpServer = http.createServer(this.express);
        this.model = initModels(mysqlDatabase.mysqlInstance.sequelize)
        this.server = new ApolloServer({
            typeDefs,
            resolvers: resolvers(this.model),
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer : this.httpServer })],
        })
    }

    public run(): void{
        this.server.start().then(() => {
            this.express.use('/graphql',
                cors<cors.CorsRequest>({ origin: '*' }),
                json(),
                expressMiddleware(this.server,{
                    context: async ({ req }) => ({req}),
                }),
            );

            this.httpServer.listen({ port: env.PORT });
            console.log(`🚀 Server ready at http://localhost:${env.PORT}/graphql`);
        })
    }
}

export default new app();
