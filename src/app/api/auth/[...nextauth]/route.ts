import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import Google from 'next-auth/providers/google';
import { Adapter } from 'next-auth/adapters';
import { mergeAnonUserCarts } from '@/lib/db/cart';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      // await mergeAnonUserCarts(user.id);
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
