import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { createConnection } from "typeorm";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as cors from "cors";

import { redis } from "./redis";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [__dirname + "/modules/**/*.ts"],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  const app = Express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: `http://localhost:3000`,
    })
  );

  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: redis,
    }),
    name: "qid",
    secret: "btssucks",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    },
  };

  app.use(session(sessionOption));

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}/graphql`)
  );
};

main().catch((e) => console.error(e));
