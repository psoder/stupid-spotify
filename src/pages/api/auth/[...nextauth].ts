/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account, profile }: unknown) {
            if (account) {
                token.accessToken = account.access_token;
                token.id = profile.id;
            }

            return token;
        },
        async session({ session, token }: unknown) {
            session.user.accessToken = token.accessToken;
            session.user.id = token.id;

            return session;
        }
    }
};

export default NextAuth(authOptions);
