import { NuxtAuthHandler } from "#auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "~/server/models/User";

export default NuxtAuthHandler({
  
  secret: useRuntimeConfig().AUTH_SECRET,

  pages: {
    signIn: "/login",
  },

  providers: [
    // @ts-expect-error
    CredentialsProvider.default({
      name: "credentials",
      credentials: {},
      async authorize(credentials: { username: string; password: string }) {
  
       const user = await User.findOne({ username: credentials.username });
        if (!user) {   
          throw createError({
            statusCode: 403,
            statusMessage: 'Invalid Username or password',
            data: {
              username: ['Invalid Username or password'],
            },
          })
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw createError({
            statusCode: 403,
            statusMessage: 'Invalid Username or password',
            data: {
              username: ['Invalid Username or password'],
            },
          })
        }

        return {
          ...user.toObject(),
          password: undefined,
        };
      },
    }),
  ],


  session: {
    strategy: "jwt",
  },


  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...token,
        ...session.user,
      };

      return session;
    },
  },


});
