// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const handler = NextAuth({
//   adapter: PrismaAdapter(prisma) as any,
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user?.id) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       let sessionWithId = session as any;
//       if (sessionWithId.user) {
//         sessionWithId.user.id = token.id;
//       }
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_URLSECRET as string,
//   debug: true,
// });

// export { handler as GET, handler as POST };

import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any, // Use type casting as a temporary measure
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      let sessionWithId = session as any;
      if (sessionWithId.user) {
        sessionWithId.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_URLSECRET as string,
  debug: true,
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
