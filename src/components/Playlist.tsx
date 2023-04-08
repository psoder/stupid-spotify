import {useState,useEffect} from "react";
import type { SpotifyClient, PlaylistSimplified, playlists  } from "spotify-api.js";
import getUserPlaylists from "spotify-api.js";
import errorHandler from "@/util/ErrorHandler";
import { execPath } from "process";
import { PlaylistManager } from "spotify-api.js";

interface Props{
    spotifyClient: SpotifyClient
}

const Playlist = ({spotifyClient}: Props) => {//unfinished
    //perform initial search for playlists:
    const [playlistData,setPlaylistData] = useState<{ playlist?: PlaylistSimplified[] }>({})
    async function fetchUserPlaylists(spotifyClient: SpotifyClient) {
        try {
            const userID = spotifyClient?.fetch('/me');//do get the user ID 
            userID.then((user) => {
                const userID = user.id;
                const playlistManager: PlaylistManager = new PlaylistManager(spotifyClient);
                const data = playlistManager.get(userID);
                console.log(data);
            }).catch((e) => {
                console.log(e);
            });
        }
        catch(e){
            console.log(e)
            //errorHandler(e);
        }
    };
    useEffect(() => {fetchUserPlaylists},[spotifyClient]);
    fetchUserPlaylists(spotifyClient);

    return(
        <div>
            <ul>
                <li>hej</li>
                {playlistData.playlist?.map((playlist) => {
                   return <li key = {playlist.id}>{playlist.name}</li>
                })}
            </ul>
        </div>
    );
}

export default Playlist;

