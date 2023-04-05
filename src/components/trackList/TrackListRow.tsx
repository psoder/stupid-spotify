import { formatTime } from "@/util";
import Image from "next/image";
import type { Track } from "spotify-api.js";

const TrackListRow = ({ track }: { track: Track }) => {
    return (
        <div
            className="grid grid-cols-track-list items-center gap-4 rounded bg-black p-2
        text-white shadow-sm shadow-black hover:bg-white hover:text-black"
        >
            <Image
                src={track.album?.images[0].url ?? "/placeholder.png"}
                alt="album image"
                height={48}
                width={48}
            />
            <div>
                <p className="font-semibold">{track.name}</p>
                <p className="font-light">
                    {track.artists.map((artist) => artist.name).join(", ")}
                </p>
            </div>
            <p>{track.album?.name}</p>
            <p>{formatTime(track.duration)}</p>
        </div>
    );
};

export default TrackListRow;
