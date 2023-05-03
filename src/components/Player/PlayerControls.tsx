import { IconType } from "react-icons/lib";
import {
    TbPlayerPauseFilled,
    TbPlayerPlayFilled,
    TbPlayerSkipBackFilled,
    TbPlayerSkipForwardFilled
} from "react-icons/tb";
import { usePlaybackState, useSpotifyPlayer } from "react-spotify-web-playback-sdk";

export const PlayerControls = ({ disabled }: { disabled: boolean }) => {
    const player = useSpotifyPlayer();
    const playbackState = usePlaybackState();

    const PlayerButton = ({
        icon,
        handleClick,
        disabled = false
    }: {
        icon: IconType;
        handleClick: (arg: unknown) => unknown;
        disabled?: boolean;
    }) => {
        return (
            <button
                onClick={handleClick}
                disabled={disabled}
                className="hover:text-white-bright disabled:text-gray-medium"
            >
                {icon({ size: 24, className: "icon" })}
            </button>
        );
    };

    return (
        <div className="flex justify-center gap-3">
            <PlayerButton
                disabled={disabled}
                handleClick={() => player?.previousTrack()}
                icon={TbPlayerSkipBackFilled}
            />

            <PlayerButton
                disabled={disabled}
                handleClick={() => player?.togglePlay()}
                icon={playbackState?.paused ? TbPlayerPlayFilled : TbPlayerPauseFilled}
            />

            <PlayerButton
                disabled={disabled}
                handleClick={() => player?.nextTrack()}
                icon={TbPlayerSkipForwardFilled}
            />
        </div>
    );
};
