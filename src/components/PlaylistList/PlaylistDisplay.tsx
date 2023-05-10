import { TrackList } from "@/components/TrackList";
import { useSpotifyUserClient } from "@/hooks/useSpotifyUserClient";
import { msToHuman } from "@/util";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Playlist, Track } from "spotify-api.js";

export const PlaylistDisplay = ({ playlist }: { playlist: Playlist }) => {
    const { spotifyUserClient } = useSpotifyUserClient();
    const [tracks, setTracks] = useState<Track[]>([]);

    useEffect(() => {
        const getTracks = async () => {
            try {
                const playlistTracks = await spotifyUserClient?.client.playlists.getTracks(
                    playlist.id
                );
                const tracks = playlistTracks
                    ?.map((pt) => pt.track)
                    .filter((track) => track?.type === "track") as Track[];
                setTracks(tracks);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (e: any) {
                if (JSON.parse(e.message).error.status === 401) {
                    toast.error(
                        `${JSON.parse(e.message).error.message}. Please try signing out and in.`
                    );
                } else {
                    toast.error("Something went wrong. See the the console for more information.");
                    console.error(e);
                }
            }
        };

        getTracks();
    }, [playlist.id, spotifyUserClient?.client.playlists]);

    return (
        <div className="flex h-full flex-col gap-10">
            <div className="flex items-center gap-8">
                <Image
                    src={playlist?.images[0]?.url ?? "/placeholder.png"}
                    alt="Playlist cover"
                    height={150}
                    width={150}
                />

                <div className="stack gap-4">
                    <h1 className="text-5xl font-bold text-white-bright">{playlist.name}</h1>

                    <div className="stack gap-1">
                        <p>{playlist.description}</p>
                        <p>
                            {playlist.totalTracks} songs,{" "}
                            {msToHuman(
                                tracks
                                    .map((track) => track.duration)
                                    .reduce((total, curr) => total + curr, 0),
                                { precision: "min" }
                            )}
                        </p>
                    </div>
                </div>
            </div>

            <TrackList tracks={tracks} />
        </div>
    );
};
