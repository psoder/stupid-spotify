import type { Track } from "spotify-api.js";
import TrackListRow from "./TrackListRow";

const TrackList = ({ tracks }: { tracks: Track[] }) => {
    return (
        <div className="flex w-[1000px] flex-col items-center gap-1">
            {tracks.length > 0 ? (
                tracks.map((track) => <TrackListRow key={track.id} track={track} />)
            ) : (
                <>No tracks</>
            )}
        </div>
    );
};

export default TrackList;
