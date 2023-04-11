import useSpotifyClient from "@/hooks/useSpotifyClient";
import useSpotifyPlayback from "@/hooks/useSpotifyPlayback";
import { SimpleTrack } from "@/types/spotify";
import { useSession } from "next-auth/react";
import { ReactElement, useEffect } from "react";
import { TbMusic } from "react-icons/tb";
import { usePlaybackState } from "react-spotify-web-playback-sdk";
import Track from "./Track";
("@/hooks/useSpotifyPlayback");

const Queue = () => {
    const { spotifyClient } = useSpotifyClient();
    const playbackState = usePlaybackState();

    const { data: session } = useSession();

    const { queue, refreshQueue, currentlyPlaying } = useSpotifyPlayback(
        session?.accessToken ?? ""
    );

    useEffect(() => {
        refreshQueue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playbackState?.track_window.current_track, spotifyClient?.token]);

    return (
        <div className="flex h-full flex-col overflow-scroll text-gray-lightest">
            <QueueHeader text="Now playing" />
            {currentlyPlaying ? (
                <QueueItem track={currentlyPlaying} position={0} playing />
            ) : (
                <>No items in queue</>
            )}
            <div className="sticky top-0 z-20 bg-black-medium">
                <QueueHeader text="Next up" />
            </div>
            {queue?.map((track, i) => (
                <QueueItem key={track.id} track={track} position={i + 1} />
            ))}
        </div>
    );
};

const QueueHeader = ({ text }: { text: string }) => {
    return (
        <div className="flex flex-col gap-2 p-2 text-lg font-bold">
            {text}
            <hr />
        </div>
    );
};

// eslint-disable-next-line no-undef
const QueueItem = ({
    track,
    position: pos,
    playing = false
}: {
    track: SimpleTrack;
    position: number;
    playing?: boolean;
}) => {
    let position: ReactElement | number = pos;

    if (playing) {
        position = <TbMusic size={24} className="animate-pulse" />;
    }

    return (
        <div
            className={`flex items-center p-2 pr-4 hover:bg-black-lightest ${
                pos === 0 && "text-primary"
            }`}
        >
            <div className="w-full overflow-hidden">
                <Track
                    name={track.name}
                    artists={track.artists.map((artist) => artist.name)}
                    imageUrl={track.album.images[0].url}
                />
            </div>
            <div className="flex w-12 justify-center">{position}</div>
        </div>
    );
};

export default Queue;
