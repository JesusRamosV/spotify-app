/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,user-read-private,user-library-read,user-library-modify,streaming",
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images?.[0]?.url,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
    async session({ session, token }: any) {
      try {
        session.accessToken = token.accessToken;
        return session;
      } catch (error) {}
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
