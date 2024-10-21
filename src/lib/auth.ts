import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";
import { Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";
import { mergeAnonUserCarts } from "./db/cart";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
            await mergeAnonUserCarts(user.id);
        },
    },
};
