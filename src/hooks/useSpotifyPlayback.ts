import { SpotifyPlaybackContext } from "@/SpotifyPlaybackContext";
import { SimpleTrack } from "@/types/spotify";
import { useContext } from "react";

const useSpotifyPlayback = (token: string) => {
    const { currentlyPlaying: playing, queue } = useContext(SpotifyPlaybackContext);

    async function refreshQueue() {
        if (!token) {
            return;
        }

        // Fetch queue
        const queueRes = await fetch(`https://api.spotify.com/v1/me/player/queue`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (queueRes.status === 204) {
            queue.setQueue([]);
        } else {
            const queueData = await queueRes.json();
            queue.setQueue(queueData.queue as SimpleTrack[]);
        }

        // Fetch currently playing
        const currentlyPlayingRes = await fetch(
            `https://api.spotify.com/v1/me/player/currently-playing`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (currentlyPlayingRes.status === 204) {
            playing.setCurrentlyPlaying(undefined);
        } else {
            const currentlyPlayingData = await currentlyPlayingRes.json();
            playing.setCurrentlyPlaying(currentlyPlayingData.item as SimpleTrack);
        }

        return queue;
    }

    async function add(uri: string) {
        if (!token) {
            return;
        }

        const res = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${uri}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        refreshQueue();

        return res.ok;
    }

    return { queue: queue.items, refreshQueue, add, currentlyPlaying: playing.track };
};

export default useSpotifyPlayback;
