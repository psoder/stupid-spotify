import { formatTime } from "@/util";
import { useEffect, useState } from "react";
import { usePlaybackState, useSpotifyPlayer } from "react-spotify-web-playback-sdk";

const PlayerProgessBar = () => {
    const playbackState = usePlaybackState(true, 500);
    const player = useSpotifyPlayer();

    const [sliderPosition, setSliderPosition] = useState(0);
    const [sliderColor, setSliderColor] = useState("var(--white-neutral)");

    useEffect(() => {
        if (!playbackState) {
            return;
        }

        setSliderPosition(playbackState?.position);
    }, [playbackState]);

    return (
        <div className="flex min-w-[200px] items-center gap-2 text-sm font-light">
            {playbackState && <p>{formatTime(playbackState?.position, true)}</p>}
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
                onMouseOver={() => setSliderColor("var(--primary)")}
                onMouseOut={() => setSliderColor("var(--white-neutral)")}
                className="range-slider"
                style={{
                    background: `linear-gradient(to right, ${sliderColor} ${
                        (100 * (playbackState?.position ?? 0)) / (playbackState?.duration ?? 1)
                    }%, var(--grayed-out) ${
                        (100 * (playbackState?.position ?? 1)) / (playbackState?.duration ?? 1)
                    }%)`
                }}
            />
            {playbackState && <p>{formatTime(playbackState?.duration, true)}</p>}
        </div>
    );
};

export default PlayerProgessBar;
