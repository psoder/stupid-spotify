import { formatTime } from "@/util";
import { getSession } from "next-auth/react";
import { TbPlaylistAdd } from "react-icons/tb";
import { toast } from "react-toastify";
import type { Track as TrackType } from "spotify-api.js";
import Track from "../Track";

const TrackListRow = ({ track }: { track: TrackType }) => {
    const handleClick = async () => {
        const accessToken = (await getSession())?.accessToken;

        const p = fetch(`https://api.spotify.com/v1/me/player/queue?uri=${track.uri}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });

        toast.promise(p, {
            success: `"${track.name}" was added to the queue.`,
            error: `"${track.name}" could not be added to the queue.`
        });
    };

    return (
        <div className="card group grid w-full grid-cols-track-list items-center gap-8 pr-5 text-sm shadow-none hover:bg-black-lightest hover:text-white-bright">
            <div>
                <Track
                    name={track.name}
                    artists={track.artists.map((artist) => artist.name)}
                    imageUrl={track.album?.images[0].url}
                />
            </div>
            <p className="truncate">{track.album?.name}</p>
            <p className="text-end">{formatTime(track.duration)}</p>
            <div className="min-w-[24px]">
                <button className="hidden group-hover:block" onClick={handleClick}>
                    <TbPlaylistAdd className="icon" size={24} />
                </button>
            </div>
        </div>
    );
};

export default TrackListRow;
