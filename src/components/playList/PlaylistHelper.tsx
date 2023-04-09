import { PlaylistManager } from "spotify-api.js";
import { promises } from "stream";
import type { SpotifyClient} from "spotify-api.js";

interface Props{
    spotifyClient: SpotifyClient,
    userPlaylists: any
}

const PlaylistHelper = async ({spotifyClient,userPlaylists}:Props) => {
    let playlistNameArray: string[] = [];
    const playlistManager: PlaylistManager = new PlaylistManager(spotifyClient);
    const playlistPromiseArray = userPlaylists.map(async playlist => playlistManager.get(playlist.id).then(res => res?.name));
    playlistNameArray = await Promise.all(playlistPromiseArray);
    //could consider returning index also as key-value for the list that we are making...
    return playlistNameArray;
}

export default PlaylistHelper;