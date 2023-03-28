import { useCallback } from "react";
import { WebPlaybackSDK, usePlaybackState } from "react-spotify-web-playback-sdk";

const AUTH_TOKEN = "your token here!";

export const MySpotifyPlayer = () => {
    const getOAuthToken = useCallback((callback) => callback(AUTH_TOKEN), []);

    return (
        <WebPlaybackSDK
            deviceName="My awesome Spotify app"
            getOAuthToken={getOAuthToken}
            volume={0.5}
        >
            {/* `TogglePlay` and `SongTitle` will be defined later. */}
            {/* <TogglePlay /> */}
            <SongTitle />
        </WebPlaybackSDK>
    );
};

const SongTitle = () => {
    const playbackState = usePlaybackState();

    if (playbackState === null) return null;

    return <p>Current song: {playbackState.track_window.current_track.name}</p>;
};
