import { TrackListRow } from "./TrackListRow";
import type { Track } from "spotify-api.js";
import { TbClockPlay } from "react-icons/tb";

export const TrackList = ({ tracks }: { tracks: Track[] }) => {
    if (tracks.length > 0) {
        return (
            <table className="grid gap-2">
                <thead className="track-list-grid-columns card">
                    <td className="col-span-6">Title</td>
                    <td className="col-span-4">Album</td>
                    <td className="col-span-1 ml-auto">
                        <TbClockPlay className="text-gray-lightest" size={24} />
                    </td>
                    <td />
                </thead>
                <tbody className="grid gap-2">
                    {tracks.map((track) => (
                        <TrackListRow key={track.id} track={track} />
                    ))}
                </tbody>
            </table>
        );
    } else {
        return <>No tracks</>;
    }
};
