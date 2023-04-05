import { getSession, useSession } from "next-auth/react";
import { useCallback } from "react";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";
import PlayerContent from "./PlayerContent";

export const Player = () => {
    const { status } = useSession();

    // eslint-disable-next-line no-unused-vars
    const getOAuthToken = useCallback(async (cb: (token: string) => void) => {
        const token = (await getSession())?.accessToken;
        cb(token ?? "");
    }, []);

    if (status !== "authenticated") {
        return;
    }

    return (
        // @ts-expect-error: Something strange is wrong.
        <WebPlaybackSDK
            initialDeviceName="Spotify Player on Next.js"
            getOAuthToken={getOAuthToken}
            connectOnInitialized={true}
            initialVolume={0.5}
        >
            <div className="fixed bottom-3 left-0 right-0 mx-auto max-w-2xl">
                <div className="bg-black px-5 py-3 text-white shadow-lg shadow-slate-900">
                    <PlayerContent />
                </div>
            </div>
        </WebPlaybackSDK>
    );
};

export default Player;
