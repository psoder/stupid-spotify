import Track from "@/components/Track";
import { formatTime } from "@/util";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
    useErrorState,
    usePlaybackState,
    usePlayerDevice,
    useSpotifyPlayer,
    useWebPlaybackSDKReady
} from "react-spotify-web-playback-sdk";
import PlayerControls from "./PlayerControls";
import PlayerVolumeControl from "./PlayerVolumeControl";

const PlayerContent = () => {
    const playbackState = usePlaybackState(true, 500);
    const playerDevice = usePlayerDevice();
    const errorState = useErrorState();
    const webPlaybackSDKReady = useWebPlaybackSDKReady();

    useEffect(() => {
        if (playerDevice?.device_id === undefined) return;

        const transferPlayback = async () => {
            const accessToken = (await getSession())?.accessToken;

            // https://developer.spotify.com/documentation/web-api/reference/#endpoint-transfer-a-users-playback
            await fetch(`https://api.spotify.com/v1/me/player`, {
                method: "PUT",
                body: JSON.stringify({ device_ids: [playerDevice.device_id], play: false }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });

            console.log("Transfared playback");
        };

        transferPlayback();
    }, [playerDevice?.device_id]);

    useEffect(() => {
        console.log("webPlaybackSDKReady", webPlaybackSDKReady);
    }, [webPlaybackSDKReady]);

    useEffect(() => {
        console.error("errorState", errorState);
    }, [errorState]);

    return (
        <div className="flex gap-10">
            {playbackState?.track_window.current_track && (
                <Track
                    name={playbackState?.track_window.current_track.name}
                    artists={playbackState?.track_window.current_track.artists.map(
                        (artist) => artist.name
                    )}
                    imageUrl={playbackState?.track_window.current_track.album?.images[0].url}
                />
            )}
            <div className="flex flex-grow flex-col gap-1">
                <PlayerControls disabled={playbackState ? false : true} />
                <TrackProgessBar />
                <PlayerVolumeControl />
            </div>
        </div>
    );
};

const TrackProgessBar = () => {
    const playbackState = usePlaybackState(true, 500);
    const player = useSpotifyPlayer();

    const [sliderPosition, setSliderPosition] = useState(0);

    useEffect(() => {
        if (!playbackState) {
            return;
        }

        setSliderPosition(playbackState?.position);
    }, [playbackState]);

    return (
        <div className="flex items-center gap-2 text-sm font-light">
            {playbackState && <>{formatTime(playbackState?.position, true)}</>}
            <input
                type="range"
                min={0}
                max={playbackState?.duration}
                value={sliderPosition}
                onChange={(evt) => {
                    setSliderPosition(+evt.target.value);
                    player?.seek(+evt.target.value);
                }}
                onMouseDown={() => player?.pause()}
                onMouseUp={() => player?.resume()}
                className="h-1 w-full cursor-pointer appearance-none rounded-full outline-none"
                style={{
                    background: `linear-gradient(to right, #1DB954 ${
                        (100 * (playbackState?.position ?? 0)) / (playbackState?.duration ?? 1)
                    }%, #555555 ${
                        (100 * (playbackState?.position ?? 1)) / (playbackState?.duration ?? 1)
                    }%)`
                }}
            />
            {playbackState && <>{formatTime(playbackState?.duration, true)}</>}
        </div>
    );
};

export default PlayerContent;
