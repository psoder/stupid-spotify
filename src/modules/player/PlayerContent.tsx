import Track from "@/components/Track";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { useErrorState, usePlaybackState, usePlayerDevice } from "react-spotify-web-playback-sdk";
import { toast } from "react-toastify";
import PlayerControls from "./PlayerControls";
import PlayerProgessBar from "./PlayerProgressBar";
import PlayerVolumeControl from "./PlayerVolumeControl";

const PlayerContent = () => {
    const playbackState = usePlaybackState(true, 500);
    const playerDevice = usePlayerDevice();
    const errorState = useErrorState();

    useEffect(() => {
        if (playerDevice?.status !== "ready") {
            return;
        }

        const transferPlayback = async () => {
            const accessToken = (await getSession())?.accessToken;

            // https://developer.spotify.com/documentation/web-api/reference/transfer-a-users-playback
            const p = fetch(`https://api.spotify.com/v1/me/player`, {
                method: "PUT",
                body: JSON.stringify({ device_ids: [playerDevice.device_id], play: true }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });

            toast.promise(p, {
                pending: "Transfering playback.",
                success: "Successfully transfered playback!",
                error: "Something went wrong."
            });
        };

        transferPlayback();
    }, [playerDevice]);

    useEffect(() => {
        if (errorState) {
            toast.error("Something went wrong. See the console for more information.");
            console.error(errorState);
        }
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
