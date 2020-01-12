import "reflect-metadata";
//import { createConnection } from "typeorm";
import express from "express";
//import { User } from "./entity/User";
import { ApolloServer } from "apollo-server-express";
import { Resolver, Query, buildSchema } from "type-graphql";

@Resolver()
class Hello {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }
}

(async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [Hello]
    })
  });

  apolloServer.applyMiddleware({ app });
  app.listen(9003, (error) => {
    if(error) {
        throw error;
    }
    console.log("Express server started at localhost:9003");
  });
})()