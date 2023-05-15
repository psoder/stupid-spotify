import { useSpotifyUserClient } from "@/hooks/useSpotifyUserClient";
import { useEffect, useState } from "react";
import { Playlist } from "spotify-api.js";
import { PlaylistRow } from "./PlaylistRow";

export const PlaylistList = () => {
    const { spotifyUserClient } = useSpotifyUserClient();
    const [playlists, setPlaylists] = useState<Playlist[]>();

    useEffect(() => {
        const getPlaylists = async () => {
            const playlists = await spotifyUserClient?.getPlaylists({}, true);
            setPlaylists(playlists);
        };

        getPlaylists();
    }, [spotifyUserClient]);

    return (
        <div className="card flex h-full flex-col px-0">
            <div className="mb-3 flex flex-col gap-1 px-2">
                <h1 className="text-lg font-bold">Your playlists</h1>
                <hr />
            </div>
            <div className="flex flex-col overflow-scroll">
                {playlists?.map((playlist) => (
                    <PlaylistRow key={playlist.id} playlist={playlist} />
                ))}
            </div>
        </div>
    );
};
