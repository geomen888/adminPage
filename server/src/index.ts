import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { Resolver, Query, buildSchema } from "type-graphql";
import { UserResolver } from "./userResolver";
import { typeOrmConfig } from "./config";

@Resolver()
class Hello {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }
}

(async () => {
  const app = express();

 await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });
  // const apolloServer = new ApolloServer({
  //   schema: await buildSchema({
  //     resolvers: [Hello]
  //   })
  // });

  apolloServer.applyMiddleware({ app });
  app.listen(9003, (error) => {
    if (error) {
        throw error;
    }
    console.log("Express server started at localhost:9003");
  });
})();
