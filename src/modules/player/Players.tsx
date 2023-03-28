import useSpotifyClient from "@/hooks/useSpotifyClient";
import { useEffect, useState } from "react";
import {
    TbPlayerPauseFilled,
    TbPlayerPlayFilled,
    TbPlayerSkipBackFilled,
    TbPlayerSkipForwardFilled
} from "react-icons/tb";
import Script from "next/script";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";

const AUTH_TOKEN = "your token here!";

export const Player = () => {
    const [sliderPosition, setSliderPosition] = useState(0);

    const { spotifyClient } = useSpotifyClient();

    useEffect(() => {
        const search = async () => {
            const a = await spotifyClient?.search("modern girl", { types: ["track"] });
            const b = await spotifyClient?.tracks.search("modern girl");
            console.log(b);
        };

        search();
    }, [spotifyClient]);

    return (
        <div className="fixed left-0 right-0 bottom-5 mx-auto w-1/3">
            <div className="flex flex-col gap-1 rounded-3xl bg-green-300 px-5 py-3 shadow-lg shadow-slate-900">
                <div className="flex justify-center gap-3">
                    <button>
                        <TbPlayerSkipBackFilled size={24} />
                    </button>
                    <button className="flex">
                        <TbPlayerPauseFilled size={24} />
                        <TbPlayerPlayFilled size={24} />
                    </button>
                    <button>
                        <TbPlayerSkipForwardFilled size={24} />
                    </button>
                </div>
                <input
                    type="range"
                    min="1"
                    max="100"
                    value={sliderPosition}
                    onChange={(evt) => {
                        setSliderPosition(+evt.target.value);
                    }}
                    className="range-thumb:rounded-full range-track:h-1 range-track:rounded-full range-active:bg-blue-500 range-disabled:opacity-50 h-2 w-full appearance-none"
                />
            </div>
        </div>
    );
};

export default Player;
