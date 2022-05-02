import { buildSchema } from "type-graphql";
import { ChangePasswordResolver } from "../modules/user/ChangePassword";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser";
import {
  CreateProductResolver,
  CreateUserResolver,
} from "../modules/user/CreateUser";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";
import { LoginResolver } from "../modules/user/Login";
import { LogoutResolver } from "../modules/user/Logout";
import { MeResolver } from "../modules/user/Me";
import { ProfilePictureResolver } from "../modules/user/ProfilePicture";
import { RegisterResolver } from "../modules/user/Register";

export const createSchema = () => {
  return buildSchema({
    resolvers: [
      RegisterResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      ForgotPasswordResolver,
      ChangePasswordResolver,
      ConfirmUserResolver,
      CreateUserResolver,
      CreateProductResolver,
      ProfilePictureResolver,
    ],
    authChecker: ({ context: { req } }) => {
      //@ts-ignore
      return !!req.session.userId;
    },
  });
};
