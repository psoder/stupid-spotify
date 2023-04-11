import useSpotifyPlayback from "@/hooks/useSpotifyPlayback";
import { getSession, useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import PlayerContent from "./PlayerContent";

export const Player = () => {
    const { data: session, status } = useSession();

    const { refreshQueue } = useSpotifyPlayback(session?.accessToken ?? "");

    useEffect(() => {
        refreshQueue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line no-unused-vars
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
            <div className="fixed bottom-3 left-0 right-0 mx-auto w-fit">
                <div className="card px-2 py-2">
                    <PlayerContent />
                </div>
            </div>
        </WebPlaybackSDK>
    );
};

export default Player;
