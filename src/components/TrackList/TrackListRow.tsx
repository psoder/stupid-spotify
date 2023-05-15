import { formatTime } from "@/util";
import { useEffect, useState } from "react";
import { TbDots } from "react-icons/tb";
import type { Track as TrackType } from "spotify-api.js";
import { TrackSummary } from "../TrackSummary";
import { useTrackListContextMenu } from "./TrackListContextMenu/useTrackListContextMenu";

export const TrackListRow = ({ track }: { track: TrackType }) => {
    const [selected, setSelected] = useState(false);

    const { open, selectTrack, unselectTrack, active } = useTrackListContextMenu();

    useEffect(() => {
        if (selected) {
            selectTrack(track.uri);
        } else if (!active) {
            unselectTrack(track.uri);
        }
    }, [active, selectTrack, selected, track.uri, unselectTrack]);

    return (
        <div
            className={`track-list-grid-columns card card-hover group text-sm ${
                selected && "bg-black-lightest text-white-bright"
            }`}
            onClick={() => setSelected(!selected)}
        >
            <div className="col-span-6">
                <TrackSummary
                    imageUrl={track.album?.images[0].url ?? ""}
                    name={track.name}
                    artists={track.artists.map((artist) => artist.name)}
                />
            </div>

            <div className="col-span-4 truncate">{track.album?.name}</div>

            <div className="col-span-1 text-end">{formatTime(track.duration)}</div>

            <div className="col-span-1 min-w-[24px]">
                <button
                    className="hidden group-hover:block"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected(true);
                        open({ x: e.pageX, y: e.pageY });
                    }}
                >
                    <TbDots className="icon" size={24} />
                </button>
            </div>
        </div>
    );
};
