import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        // Chamar a api de login aqui e fazer as verificações
        console.log(credentials);
        return null;
      },
    }),
  ],
};
