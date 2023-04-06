import Image from "next/image";
import type { Artist } from "spotify-api.js";

const TrackListRow = ({ artist }: { artist: Artist }) => {
    //Note complete yet!
    return (
        <div
            className="grid grid-cols-track-list items-center gap-4 rounded bg-black p-2
        text-white shadow-sm shadow-black hover:bg-white hover:text-black"
        >
            <Image
                src={artist.images?.[0].url ?? "/placeholder.png"} //Have to update this!
                alt="album image"
                height={48}
                width={48}
            />
            <div>
                <p className="font-semibold">{artist.name}</p>
            </div>
        </div>
    );
};

export default TrackListRow;
