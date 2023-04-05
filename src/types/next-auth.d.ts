import { DefaultSession, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        accessToken: string;
        error?: string;
        user: {
            /** The user's id. */
            id: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        accessToken: string;
        accessTokenExpires: number;
        refreshToken: string;
        user: User | AdapterUser;
        error?: string;
        id: string;
    }
}
