import { useSpotifyUserClient } from "@/hooks/useSpotifyUserClient";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Playlist } from "spotify-api.js";

export const PlaylistList = () => {
    const { spotifyUserClient } = useSpotifyUserClient();
    const [playlists, setPlaylists] = useState<Playlist[]>();

    useEffect(() => {
        const getPlaylists = async () => {
            const playlists = await spotifyUserClient?.getPlaylists({}, true);
            console.log(playlists);
            setPlaylists(playlists);
        };

        getPlaylists();
    }, [spotifyUserClient]);

    return (
        <div className="card flex h-full flex-col px-0">
            <div className="mb-3 flex flex-col gap-1 px-2">
                <h1 className="text-lg font-bold">Your playlists</h1>
                <hr className="h-[2px] border-0 bg-gray-medium" />
            </div>
            <div className="flex flex-col overflow-scroll">
                {playlists?.map((playlist) => (
                    <PlaylistRow key={playlist.id} playlist={playlist} />
                ))}
            </div>
        </div>
    );
};

const PlaylistRow = ({ playlist }: { playlist: Playlist }) => {
    return (
        <div className="card-hover flex items-center gap-2 p-1">
            <div className="w-fill relative h-12 w-12 object-contain">
                <Image
                    src={playlist?.images[0]?.url ?? "/placeholder.png"}
                    alt="album image"
                    fill
                    className="w-fit"
                />
            </div>
            {playlist.name}
        </div>
    );
};
