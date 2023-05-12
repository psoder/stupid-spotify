import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Client, UserClient } from "spotify-api.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SpotifyUserClientContext = createContext<[UserClient | undefined, (arg: any) => any]>([
    undefined,
    () => {}
]);

const SpotifyUserClientProvider = ({ children }: { children: ReactNode }) => {
    const [userClient, setUserClient] = useState<UserClient>();
    const { data: session } = useSession();

    useEffect(() => {
        async function createClient() {
            if (!session?.accessToken) {
                return;
            }
            const c = new Client({ token: session?.accessToken });
            const uc = new UserClient(c);
            setUserClient(uc);
        }

        if (!userClient) {
            createClient();
        }
    }, [session?.accessToken, userClient]);

    return (
        <SpotifyUserClientContext.Provider value={[userClient, setUserClient]}>
            {children}
        </SpotifyUserClientContext.Provider>
    );
};

export { SpotifyUserClientContext, SpotifyUserClientProvider };
