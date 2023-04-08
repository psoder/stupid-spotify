import Track from "@/components/Track";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import {
    useErrorState,
    usePlaybackState,
    usePlayerDevice,
    useWebPlaybackSDKReady
} from "react-spotify-web-playback-sdk";
import PlayerControls from "./PlayerControls";
import PlayerProgessBar from "./PlayerProgressBar";
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
        <div className="flex items-center gap-x-16">
            <div className="mr-auto">
                {playbackState?.track_window.current_track && (
                    <Track
                        name={playbackState?.track_window.current_track.name}
                        artists={playbackState?.track_window.current_track.artists.map(
                            (artist) => artist.name
                        )}
                        imageUrl={playbackState?.track_window.current_track.album?.images[0].url}
                    />
                )}
            </div>

            <div className="flex w-[500px] flex-col gap-1">
                <PlayerControls disabled={playbackState ? false : true} />
                <PlayerProgessBar />
            </div>

            <div className="ml-auto w-min">
                <PlayerVolumeControl />
            </div>
        </div>
    );
};

export default PlayerContent;
