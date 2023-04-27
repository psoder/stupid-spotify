import { useEffect, useState } from "react";
import { IconType } from "react-icons/lib";
import { TbVolume, TbVolume2, TbVolume3 } from "react-icons/tb";
import { useSpotifyPlayer } from "react-spotify-web-playback-sdk";

export const PlayerVolumeControl = () => {
    const player = useSpotifyPlayer();

    const [volume, setVolume] = useState(50);
    const [muted, setMuted] = useState(false);
    const [sliderColor, setSliderColor] = useState("var(--white-bright)");

    useEffect(() => {
        if (muted) {
            player?.setVolume(0);
        } else {
            player?.setVolume(volume / 100);
        }
    }, [muted, volume, player]);

    let volumeIcon: IconType;
    if (volume === 0 || muted) {
        volumeIcon = TbVolume3;
    } else if (volume < 50) {
        volumeIcon = TbVolume2;
    } else {
        volumeIcon = TbVolume;
    }

    return (
        <div className="flex min-w-[120px] items-center gap-2">
            <button className="hover:text-white-active" onClick={() => setMuted(!muted)}>
                {volumeIcon({ size: 20, className: "icon" })}
            </button>
            <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(evt) => {
                    setMuted(false);
                    setVolume(+evt.target.value);
                }}
                onMouseOver={() => setSliderColor("var(--primary)")}
                onMouseOut={() => setSliderColor("var(--white-bright)")}
                className="range-slider"
                style={{
                    background: `linear-gradient(to right, ${sliderColor} ${volume}%, var(--gray-medium) ${volume}%)`
                }}
            />
        </div>
    );
};
