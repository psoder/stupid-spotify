import { getSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Client } from "spotify-api.js";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
const SpotifyClientContext = createContext<[Client | undefined, (arg: any) => any]>([
    undefined,
    () => {}
]);

const SpotifyClientProvider = ({ children }: { children: ReactNode }) => {
    const [spotifyClient, setSpotifyClient] = useState<Client>();

    useEffect(() => {
        async function createClient() {
            const session = await getSession();
            const c = new Client({ token: session?.user.accessToken ?? "" });
            setSpotifyClient(c);
        }

        if (!spotifyClient) {
            createClient();
        }
    }, [spotifyClient]);

    return (
        <SpotifyClientContext.Provider value={[spotifyClient, setSpotifyClient]}>
            {children}
        </SpotifyClientContext.Provider>
    );
};

export { SpotifyClientContext, SpotifyClientProvider };
