import { SpotifyClientContext } from "@/context/SpotifyClientContext";
import { useContext } from "react";

export const useSpotifyClient = () => {
    const [spotifyClient, setSpotifyClient] = useContext(SpotifyClientContext);

    return { spotifyClient, setSpotifyClient };
};
