import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { SimpleTrack } from "./types/spotify";

type SpotifyPlaybackContextType = {
    currentlyPlaying: {
        track?: SimpleTrack;
        setCurrentlyPlaying: Dispatch<SetStateAction<SimpleTrack | undefined>>;
    };
    queue: { items?: SimpleTrack[]; setQueue: Dispatch<SetStateAction<SimpleTrack[] | undefined>> };
};

const SpotifyPlaybackContext = createContext<SpotifyPlaybackContextType>({
    currentlyPlaying: { setCurrentlyPlaying: () => {} },
    queue: { setQueue: () => {} }
});

const SpotifyPlaybackProvider = ({
    children,
    accessToken
}: {
    children: ReactNode;
    accessToken: string;
}) => {
    const [spotifyQueue, setSpotifyQueue] = useState<SimpleTrack[]>();
    const [currentlyPlaying, setCurrentlyPlaying] = useState<SimpleTrack>();

    useEffect(() => {
        const fetchData = async () => {
            // Fetch queue
            const queueRes = await fetch(`https://api.spotify.com/v1/me/player/queue`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (queueRes.status === 204) {
                setSpotifyQueue([]);
            } else {
                const queueData = await queueRes.json();
                setSpotifyQueue(queueData.queue as SimpleTrack[]);
            }

            // Fetch currently playing
            const currentlyPlayingRes = await fetch(
                `https://api.spotify.com/v1/me/player/currently-playing`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (currentlyPlayingRes.status === 204) {
                setCurrentlyPlaying(undefined);
            } else {
                const currentlyPlayingData = await currentlyPlayingRes.json();
                setCurrentlyPlaying(currentlyPlayingData.item as SimpleTrack);
            }
        };

        fetchData();
    }, []);

    return (
        <SpotifyPlaybackContext.Provider
            value={{
                currentlyPlaying: { track: currentlyPlaying, setCurrentlyPlaying },
                queue: { items: spotifyQueue, setQueue: setSpotifyQueue }
            }}
        >
            {children}
        </SpotifyPlaybackContext.Provider>
    );
};

export { SpotifyPlaybackContext, SpotifyPlaybackProvider };
