import { useContextMenu } from "@/hooks/useContextMenu";
import { TbClockPlay } from "react-icons/tb";
import type { Track } from "spotify-api.js";
import { TrackListRow } from "./TrackListRow";

export const TrackList = ({ tracks }: { tracks: Track[] }) => {
    const { position, setPosition, active, setActive } = useContextMenu();

    if (tracks.length > 0) {
        return (
            <div className="overflow-scroll">
                <table
                    className="relative flex h-full flex-col"
                    onContextMenu={(e) => {
                        // e.preventDefault();
                        setActive(true);
                        setPosition({ x: e.pageX, y: e.pageY });
                        console.log({ x: e.pageX, y: e.pageY });
                    }}
                >
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
                    <tbody className="overflow-scroll">
                        {tracks?.map((track) => (
                            <TrackListRow key={track.id} track={track} selected={false} />
                        ))}
                    </tbody>
                </table>

                {active && (
                    <ul style={{ top: position.y, left: position.x }} className="card fixed p-0">
                        <li>Add to queue</li>
                        <li>Add to playlist</li>
                        <li>Remove from playlist</li>
                    </ul>
                )}
            </div>
        );
    } else {
        return <>No tracks</>;
    }
};
