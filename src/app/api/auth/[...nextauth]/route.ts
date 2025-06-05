import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextRequest, NextResponse } from "next/server";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is where you would typically validate against your database
        // For now, we'll just check if the email exists
        if (credentials?.email) {
          // Return a user object
          return {
            id: "1",
            email: credentials.email,
            name: credentials.email.split('@')[0],
          }
        }
        return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
    newUser: '/profile', // Redirect new users to profile page
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // After sign in, redirect to profile page if it's a new user
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/profile`;
      }
      return url;
    },
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST }; 