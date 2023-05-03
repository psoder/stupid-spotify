import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Client } from "spotify-api.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SpotifyClientContext = createContext<[Client | undefined, (arg: any) => any]>([
    undefined,
    () => {}
]);

const SpotifyClientProvider = ({ children }: { children: ReactNode }) => {
    const [spotifyClient, setSpotifyClient] = useState<Client>();
    const { data: session } = useSession();

    useEffect(() => {
        async function createClient() {
            if (!session?.accessToken) {
                return;
            }
            const c = new Client({ token: session?.accessToken });
            setSpotifyClient(c);
        }

        if (!spotifyClient) {
            createClient();
        }
    }, [session?.accessToken, spotifyClient]);

    return (
        <SpotifyClientContext.Provider value={[spotifyClient, setSpotifyClient]}>
            {children}
        </SpotifyClientContext.Provider>
    );
};

export { SpotifyClientContext, SpotifyClientProvider };
