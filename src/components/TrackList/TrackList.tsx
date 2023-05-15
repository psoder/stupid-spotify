import { useSpotifyPlayback } from "@/hooks/useSpotifyPlayback";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { TbClockPlay } from "react-icons/tb";
import { toast } from "react-toastify";
import type { Track } from "spotify-api.js";
import { TrackListContextMenu } from "./TrackListContextMenu/TrackListContextMenu";
import { useTrackListContextMenu } from "./TrackListContextMenu/useTrackListContextMenu";
import { TrackListRow } from "./TrackListRow";

export const TrackList = ({ tracks }: { tracks: Track[] }) => {
    const { data: session } = useSession();

    const { addToQueue } = useSpotifyPlayback(session?.accessToken ?? "");

    const Rows = () => {
        const { setMenuItems, selectedTracksURI } = useTrackListContextMenu();

        const addTracksToQueue = (uris: string[]) =>
            uris.forEach(async (uri) => {
                const title = tracks.find((track) => track.uri === uri)?.name;

                const success = await addToQueue(uri);

                if (success) {
                    toast.success(`Added "${title}" to the queue.`);
                } else {
                    toast.error(`Could not added "${title}" to the queue.`);
                }
            });

        useEffect(() => {
            setMenuItems([
                {
                    id: "addToQueue",
                    name: "Add to queue",
                    action: (uris) => {
                        addTracksToQueue(uris);
                    }
                }
            ]);
        }, [selectedTracksURI, setMenuItems]);

        return (
            <>
                {tracks?.map((track) => (
                    <TrackListRow key={track.uri} track={track} />
                ))}
            </>
        );
    };

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

                <TrackListContextMenu className="overflow-scroll">
                    <Rows />
                </TrackListContextMenu>
            </div>
        </div>
    );
};
