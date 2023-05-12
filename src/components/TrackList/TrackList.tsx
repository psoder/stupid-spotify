import { TbClockPlay } from "react-icons/tb";
import type { Track } from "spotify-api.js";
import { TrackListContextMenu } from "./TrackListContextMenu";
import { TrackListRow } from "./TrackListRow";

export const TrackList = ({ tracks }: { tracks: Track[] }) => {
    if (tracks.length <= 0) {
        return <>No tracks</>;
    }

    return (
        <div className="overflow-scroll">
            <div className="relative flex h-full flex-col">
                <div>
                    <div className="track-list-grid-columns card border-b border-b-black-lightest p-3">
                        <div className="col-span-6">Title</div>
                        <div className="col-span-4">Album</div>
                        <div className="col-span-1 ml-auto">
                            <TbClockPlay className="text-gray-lightest" size={24} />
                        </div>
                        <div />
                    </div>
                </div>

                <TrackListContextMenu renderAs="div" className="overflow-scroll">
                    {tracks?.map((track) => (
                        <TrackListRow key={track.id} track={track} selected={false} />
                    ))}
                </TrackListContextMenu>
            </div>
        </div>
    );
};
