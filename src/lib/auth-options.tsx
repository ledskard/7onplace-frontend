import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username;
        const password = credentials?.password;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/users/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          }
        );
        
        if (response.status !== 200) {
          throw new Error("User not found");
        }

        const user = await response.json();

        if (!user) {
          throw new Error("User not found");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {

      if (token) {        
        session = {
          ...session,
          user: {
            ...session.user,
            user: token.user,
            token: token.token,
          },
        };
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.user = user.user;
      }
      return token;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
