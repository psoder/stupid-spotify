import { ReactElement } from "react";
import {
    TbPlayerPauseFilled,
    TbPlayerPlayFilled,
    TbPlayerSkipBackFilled,
    TbPlayerSkipForwardFilled
} from "react-icons/tb";
import { usePlaybackState, useSpotifyPlayer } from "react-spotify-web-playback-sdk";

const PlayerControls = ({ disabled }: { disabled: boolean }) => {
    const player = useSpotifyPlayer();
    const playbackState = usePlaybackState();

    const PlayerButton = ({
        children,
        handleClick,
        disabled = false
    }: {
        children: ReactElement;
        handleClick: (arg: unknown) => unknown;
        disabled?: boolean;
    }) => {
        return (
            <button
                onClick={handleClick}
                disabled={disabled}
                className="hover:text-white-active disabled:text-gray-600"
            >
                {children}
            </button>
        );
    };

    return (
        <div className="flex justify-center gap-3">
            <PlayerButton disabled={disabled} handleClick={() => player?.previousTrack()}>
                <TbPlayerSkipBackFilled className="player-controller-icon" size={24} />
            </PlayerButton>
            <PlayerButton disabled={disabled} handleClick={() => player?.togglePlay()}>
                {playbackState?.paused ? (
                    <TbPlayerPlayFilled className="player-controller-icon" size={24} />
                ) : (
                    <TbPlayerPauseFilled className="player-controller-icon" size={24} />
                )}
            </PlayerButton>
            <PlayerButton disabled={disabled} handleClick={() => player?.nextTrack()}>
                <TbPlayerSkipForwardFilled className="player-controller-icon" size={24} />
            </PlayerButton>
        </div>
    );
};

export default PlayerControls;
