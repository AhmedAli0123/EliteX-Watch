import NextAuth, { NextAuthOptions, SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "next-auth";

export const authOptions: NextAuthOptions = { // Explicitly define type
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        if (
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", name: "Admin", email: credentials.email };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in .env file
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = token.user as {
        name?: string | null;
        email?: string | null;
        image?: string | null;
      };
      return session;
    }
  },
  pages: {
    signIn: "/admin/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
