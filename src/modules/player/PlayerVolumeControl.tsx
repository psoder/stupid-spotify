import { useEffect, useState } from "react";
import { TbVolume, TbVolume2, TbVolumeOff } from "react-icons/tb";
import { useSpotifyPlayer } from "react-spotify-web-playback-sdk";

const PlayerVolumeControl = () => {
    const player = useSpotifyPlayer();

    const [volume, setVolume] = useState(50);
    const [muted, setMuted] = useState(false);
    const [sliderColor, setSliderColor] = useState("var(--white-neutral)");

    useEffect(() => {
        if (muted) {
            player?.setVolume(0);
        } else {
            player?.setVolume(volume / 100);
        }
    }, [muted, volume, player]);

    let volumeIcon;
    if (volume === 0 || muted) {
        volumeIcon = <TbVolumeOff size={20} />;
    } else if (volume < 50) {
        volumeIcon = <TbVolume2 size={20} />;
    } else {
        volumeIcon = <TbVolume size={20} />;
    }

    return (
        <div className="flex items-center gap-2">
            <button className="hover:text-white-active" onClick={() => setMuted(!muted)}>
                {volumeIcon}
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
                className="h-1 w-full cursor-pointer appearance-none rounded-full"
                style={{
                    background: `linear-gradient(to right, ${sliderColor} ${volume}%, var(--grayed-out) ${volume}%)`
                }}
                onMouseOver={() => setSliderColor("var(--primary)")}
                onMouseOut={() => setSliderColor("var(--white-neutral)")}
            />
        </div>
    );
};

export default PlayerVolumeControl;
