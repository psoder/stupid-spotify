import { formatTime } from "@/util";
import { getSession } from "next-auth/react";
import type { Track as TrackType } from "spotify-api.js";
import Track from "../Track";

const TrackListRow = ({ track }: { track: TrackType }) => {
    const handleClick = async () => {
        const accessToken = (await getSession())?.user.accessToken;

        fetch(`https://api.spotify.com/v1/me/player/queue?uri=${track.uri}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });
    };

    return (
        <div
            className="grid grid-cols-track-list items-center gap-4 rounded bg-black p-2
        text-white shadow-sm shadow-black hover:bg-white hover:text-black"
        >
            <Track
                name={track.name}
                artists={track.artists.map((artist) => artist.name)}
                imageUrl={track.album?.images[0].url}
            />
            <p>{track.album?.name}</p>
            <p>{formatTime(track.duration)}</p>
            <button className="hover:font-bold" onClick={handleClick}>
                Add to queue
            </button>
        </div>
    );
};

export default TrackListRow;
