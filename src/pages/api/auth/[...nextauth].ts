/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NextAuth, { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-modify-playback-state"
].join(" ");

export const authOptions: AuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
            authorization: `https://accounts.spotify.com/authorize?scope=${scopes}`
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token;
                token.id = profile?.id;
            }

            return token;
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.id = token.id;

            return session;
        }
    }
};

export default NextAuth(authOptions);
