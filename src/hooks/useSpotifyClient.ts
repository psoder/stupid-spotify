import { SpotifyClientContext } from "@/SpotifyClientContext";
import { useContext } from "react";

const useSpotifyClient = () => {
    const [spotifyClient, setSpotifyClient] = useContext(SpotifyClientContext);

    return { spotifyClient, setSpotifyClient };
};

export default useSpotifyClient;
