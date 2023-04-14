import { createContext, ReactNode, useEffect, useState } from "react";
import { Client } from "spotify-api.js";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
const SpotifyClientContext = createContext<[Client | undefined, (arg: any) => any]>([
    undefined,
    () => {}
]);

const SpotifyClientProvider = ({
    children,
    accessToken
}: {
    children: ReactNode;
    accessToken: string;
}) => {
    const [spotifyClient, setSpotifyClient] = useState<Client>();

    useEffect(() => {
        async function createClient() {
            const c = new Client({ token: accessToken });
            setSpotifyClient(c);
        }

        if (!spotifyClient) {
            createClient();
        }
    }, [accessToken, spotifyClient]);

    return (
        <SpotifyClientContext.Provider value={[spotifyClient, setSpotifyClient]}>
            {children}
        </SpotifyClientContext.Provider>
    );
};

export { SpotifyClientContext, SpotifyClientProvider };
