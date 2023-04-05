import type { Track } from "spotify-api.js";
import TrackListRow from "./TrackListRow";

const TrackList = ({ tracks }: { tracks: Track[] }) => {
    return (
        <div className="flex min-w-[700px] max-w-screen-lg flex-col items-center">
            <h2 className="self-start text-3xl font-bold">Tracks</h2>
            <div className="flex flex-col gap-1">
                {tracks.length > 0 ? (
                    tracks.map((track) => <TrackListRow key={track.id} track={track} />)
                ) : (
                    <>No tracks</>
                )}
            </div>
        </div>
    );
};

export default TrackList;
