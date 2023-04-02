/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
    try {
        const response = await fetch(`https://accounts.spotify.com/api/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: token.refreshToken ?? "",
                client_id: process.env.SPOTIFY_CLIENT_ID ?? "",
                client_secret: process.env.SPOTIFY_CLIENT_SECRET ?? ""
            })
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken // Fall back to old refresh token
        };
    } catch (error) {
        console.error("error: ", error);

        return {
            ...token,
            error: `RefreshAccessTokenError`
        };
    }
}

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
        jwt({ token, user, account }) {
            if (account && user) {
                if (account.access_token! || account.expires_at! || account.refresh_token) {
                    console.error("No access token provided.");
                    throw account;
                }

                return {
                    accessToken: account.access_token!,
                    accessTokenExpires: account.expires_at!,
                    refreshToken: account.refresh_token!,
                    id: user.id,
                    user
                };
            }

            if (Date.now() < token.accessTokenExpires!) {
                return token;
            }

            return refreshAccessToken(token);
        },
        async session({ session, token }) {
            session.user = token.user;
            session.accessToken = token.accessToken;
            session.error = token.error;

            return session;
        }
    }
};

export default NextAuth(authOptions);
