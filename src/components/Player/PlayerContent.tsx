import { TrackSummary } from "@/components/TrackSummary";
import { useEffect } from "react";
import {
    useErrorState,
    usePlaybackState,
    usePlayerDevice,
    useWebPlaybackSDKReady
} from "react-spotify-web-playback-sdk";
import { toast } from "react-toastify";
import { PlayerControls } from "./PlayerControls";
import { PlayerProgessBar } from "./PlayerProgressBar";
import { PlayerVolumeControl } from "./PlayerVolumeControl";
import { QueueContainer } from "./QueueContainer";

export const PlayerContent = ({ accessToken }: { accessToken: string }) => {
    const playbackState = usePlaybackState(true, 500);
    const playerDevice = usePlayerDevice();
    const errorState = useErrorState();
    const ready = useWebPlaybackSDKReady();

    useEffect(() => {
        if (playerDevice?.status !== "ready") {
            return;
        }

        const transferPlayback = async () => {
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
    }, [playerDevice, accessToken]);

    useEffect(() => {
        if (errorState) {
            toast.error("Something went wrong. See the console for more information.");
            console.error(errorState);
        }
    }, [errorState]);

    if (!ready) {
        return <></>;
    }

    return (
        <div className="card fixed bottom-2 left-0 right-0 mx-auto w-fit">
            <div className="flex items-center gap-x-8 pr-4 text-sm">
                <div className="w-[300px]">
                    <TrackSummary
                        name={playbackState?.track_window.current_track.name}
                        artists={playbackState?.track_window.current_track.artists.map(
                            (artist) => artist.name
                        )}
                        imageUrl={playbackState?.track_window.current_track.album?.images[0].url}
                    />
                </div>

                <div className="col-span-1 flex min-w-[400px] flex-col gap-1">
                    <PlayerControls disabled={playbackState ? false : true} />
                    <PlayerProgessBar />
                </div>

                <div className="w-[300px]">
                    <div className="ml-auto flex w-min gap-2">
                        <QueueContainer />
                        <PlayerVolumeControl />
                    </div>
                </div>
            </div>
        </div>
    );
};
