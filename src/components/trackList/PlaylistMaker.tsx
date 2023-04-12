import { useState, useEffect } from "react";
import type { SpotifyClient, Playlist } from "spotify-api.js";
import PlaylistPrinter from "./PlaylistPrinter";

interface Props {
    spotifyClient: SpotifyClient;
}

const PlaylistMaker = ({ spotifyClient }: Props) => {
    //unfinished
    //perform initial search for playlists:
    const [playlistArray, setPlaylistArray] = useState<Playlist[]>();
    async function fetchUserPlaylists(spotifyClient: SpotifyClient) {
        try {
            const userPlaylists: Promise<Playlist> = spotifyClient?.fetch("/me/playlists"); //get user playlists
            userPlaylists
                .then(async (playlists) => {
                    const userPlaylists = playlists.items;
                    //console.log(userPlaylists[0].name);
                    setPlaylistArray(userPlaylists);
                    //const fetchedPlaylistArray =  await PlaylistHelper({spotifyClient,userPlaylists});
                    //setPlaylistArray(fetchedPlaylistArray);
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
            //errorHandler(e);
        }
    }
    if (!playlistArray) fetchUserPlaylists(spotifyClient);
    useEffect(() => {
        fetchUserPlaylists(spotifyClient);
    }, [spotifyClient]);
    return <div>{playlistArray ? <PlaylistPrinter playlists={playlistArray} /> : null}</div>;
};

export default PlaylistMaker;
