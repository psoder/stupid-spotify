import { SpotifyUserClientContext } from "@/context/SpotifyUserClientContext";
import { useContext } from "react";

export const useSpotifyUserClient = () => {
    const [spotifyUserClient, setSpotifyUserClient] = useContext(SpotifyUserClientContext);

    return { spotifyUserClient, setSpotifyUserClient };
};
