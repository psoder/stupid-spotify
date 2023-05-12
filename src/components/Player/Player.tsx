import { useSpotifyPlayback } from "@/hooks/useSpotifyPlayback";
import { getSession, useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import { PlayerContent } from "./PlayerContent";

export const Player = () => {
    const { data: session, status } = useSession();

    const { refreshQueue } = useSpotifyPlayback(session?.accessToken ?? "");

    useEffect(() => {
        refreshQueue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getOAuthToken = useCallback(async (cb: (token: string) => void) => {
        const token = (await getSession())?.accessToken;
        cb(token ?? "");
    }, []);

    if (status !== "authenticated") {
        return <></>;
    }

    return (
        // @ts-expect-error: Something strange is wrong.
        <WebPlaybackSDK
            initialDeviceName="Stupid Spotify"
            getOAuthToken={getOAuthToken}
            connectOnInitialized={true}
            initialVolume={0.5}
        >
            <PlayerContent accessToken={session?.accessToken ?? ""} />
        </WebPlaybackSDK>
    );
};
