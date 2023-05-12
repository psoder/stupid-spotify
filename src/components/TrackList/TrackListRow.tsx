import { formatTime } from "@/util";
import { useSession } from "next-auth/react";
import { TbPlaylistAdd } from "react-icons/tb";
import { toast } from "react-toastify";
import type { Track as TrackType } from "spotify-api.js";
import { TrackSummary } from "../TrackSummary";

export const TrackListRow = ({
    track,
    selected = false,
    setSelected
}: {
    track: TrackType;
    selected?: boolean;
    setSelected?: () => void;
}) => {
    const { data: session } = useSession();

    const handleClick = async () => {
        const p = fetch(`https://api.spotify.com/v1/me/player/queue?uri=${track.uri}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`
            }
        });

        toast.promise(p, {
            success: `"${track.name}" was added to the queue.`,
            error: `"${track.name}" could not be added to the queue.`
        });
    };

    return (
        <div
            className={`track-list-grid-columns card card-hover group text-sm ${
                selected && "bg-black-lightest text-white-bright"
            }`}
        >
            <div className="col-span-6">
                <TrackSummary
                    imageUrl={track.album?.images[0].url ?? ""}
                    name={track.name}
                    artists={track.artists.map((artist) => artist.name)}
                />
            </div>
            <div className="col-span-4 truncate">{track.album?.name}</div>
            <div className="col-span-1 text-end">{formatTime(track.duration)}</div>
            <div className="col-span-1 min-w-[24px]">
                <button className="hidden group-hover:block" onClick={handleClick}>
                    <TbPlaylistAdd className="icon" size={24} />
                </button>
            </div>
        </div>
    );
};
