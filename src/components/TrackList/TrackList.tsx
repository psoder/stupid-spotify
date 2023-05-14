import { TbClockPlay } from "react-icons/tb";
import type { Track } from "spotify-api.js";
import { TrackListRow } from "./TrackListRow";

export const TrackList = ({ tracks }: { tracks: Track[] }) => {
    if (tracks.length > 0) {
        return (
            <div className="relative flex h-full flex-col overflow-hidden">
                <div className="track-list-grid-columns card border-b border-b-black-lightest p-3">
                    <div className="col-span-6">Title</div>
                    <div className="col-span-4">Album</div>
                    <div className="col-span-1 ml-auto">
                        <TbClockPlay className="text-gray-lightest" size={24} />
                    </div>
                    <div />
                </div>
                <div className="overflow-scroll">
                    {tracks?.map((track) => (
                        <TrackListRow key={track.id} track={track} />
                    ))}
                </div>
            </div>
        );
    } else {
        return <>No tracks</>;
    }
};
