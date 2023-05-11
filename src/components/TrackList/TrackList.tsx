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
            <table className="relative flex h-full flex-col">
                <thead>
                    <tr className="track-list-grid-columns card border-b border-b-black-lightest p-3">
                        <td className="col-span-6">Title</td>
                        <td className="col-span-4">Album</td>
                        <td className="col-span-1 ml-auto">
                            <TbClockPlay className="text-gray-lightest" size={24} />
                        </td>
                        <td />
                    </tr>
                </thead>

                <TrackListContextMenu renderAs="tbody" className="overflow-scroll">
                    {tracks?.map((track) => (
                        <TrackListRow key={track.id} track={track} selected={false} />
                    ))}
                </TrackListContextMenu>
            </table>
        </div>
    );
};
