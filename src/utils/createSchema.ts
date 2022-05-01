import { buildSchema } from "type-graphql";

export const createSchema = () => {
  return buildSchema({
    resolvers: [__dirname + "/../modules/*/*.ts"],
    authChecker: ({ context: { req } }) => {
      //@ts-ignore
      return !!req.session.userId;
    },
  });
};
