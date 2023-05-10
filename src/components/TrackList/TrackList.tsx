import { TbClockPlay } from "react-icons/tb";
import type { Track } from "spotify-api.js";
import { TrackListRow } from "./TrackListRow";

export const TrackList = ({ tracks }: { tracks: Track[] }) => {
    if (tracks.length > 0) {
        return (
            <table>
                <thead className="track-list-grid-columns card border-b border-b-black-lightest">
                    <td className="col-span-6">Title</td>
                    <td className="col-span-4">Album</td>
                    <td className="col-span-1 ml-auto">
                        <TbClockPlay className="text-gray-lightest" size={24} />
                    </td>
                    <td />
                </thead>
                <tbody>
                    {tracks?.map((track) => (
                        <TrackListRow key={track.id} track={track} />
                    ))}
                </tbody>
            </table>
        );
    } else {
        return <>No tracks</>;
    }
};
