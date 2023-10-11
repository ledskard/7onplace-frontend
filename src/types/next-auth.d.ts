import NextAuth from "next-auth";
import { ModelLoginProps } from "./login/login-model-props";

declare module "next-auth" {
  interface Session {
    user: ModelLoginProps;
  }
  interface User extends ModelLoginProps {}
}

declare module "next-auth/jwt" {
  interface JWT extends ModelLoginProps {}
}
