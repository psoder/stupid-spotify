import TrackListRow from "./TrackListRow";
import type { Track } from "spotify-api.js";
import { TbClockPlay } from "react-icons/tb";

const TrackList = ({ tracks }: { tracks: Track[] }) => {
    if (tracks.length > 0) {
        return (
            <table className="grid gap-2">
                <thead className="  grid grid-cols-12 items-center gap-10 bg-black-light p-2 text-sm font-bold text-gray-lightest shadow-md shadow-black-heavy">
                    <td className=" col-span-1 ">#</td>
                    <td className=" col-span-5 ">Title</td>
                    <td className="col-span-4">Album</td>
                    <td className=" col-span-1  ml-auto">
                        <TbClockPlay className=" text-gray-lightest" size={24} />
                    </td>
                    <td className="col-span-1">Add</td>
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

export default TrackList;
