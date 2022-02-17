import NextAuth, { User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  debug: false,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({session, user}) => {
      const { name, email, image, id } = user as User & { id: string };
      return { ...session, user: { name, email, image, id } };
    },
  },
});
