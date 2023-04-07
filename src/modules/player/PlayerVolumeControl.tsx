import { CSSProperties, useEffect, useState } from "react";
import { useSpotifyPlayer } from "react-spotify-web-playback-sdk";
import { theme } from "tailwindcss";

const PlayerVolumeControl = () => {
    const player = useSpotifyPlayer();

    const [volume, setVolume] = useState(0);
    const [rangeStyle, setRangeStyle] = useState<CSSProperties>({
        background: `linear-gradient(to right, white ${volume}%, #555555 ${volume}%)`
    });

    useEffect(() => {
        const setInitalVolume = async () => {
            const initalVolume = ((await player?.getVolume()) ?? 0) * 100;
            setVolume(initalVolume);
        };
        setInitalVolume();
    }, []);

    useEffect(() => {
        setRangeStyle({
            background: `linear-gradient(to right, white ${volume}%, ${theme(
                "colors.primary"
            )} ${volume}%)`
        });
    }, [volume]);

    return (
        <div>
            <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(evt) => {
                    setVolume(+evt.target.value);
                    player?.setVolume(+evt.target.value / 100);
                }}
                className={`h-1 w-full cursor-pointer appearance-none rounded-full`}
                style={rangeStyle}
                // onMouseOver={() => {
                //     setRangeStyle({
                //         background: `linear-gradient(to right, green ${volume}%, #555555 ${volume}%)`
                //     });
                // }}
                // onMouseOut={() => {
                //     setRangeStyle({
                //         background: `linear-gradient(to right, green ${volume}%, #555555 ${volume}%)`
                //     });
                // }}
            />
        </div>
    );
};

export default PlayerVolumeControl;
