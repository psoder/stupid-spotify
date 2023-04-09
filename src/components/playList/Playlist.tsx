import {useState,useEffect} from "react";
import type { SpotifyClient, PlaylistSimplified, playlists  } from "spotify-api.js";
import getUserPlaylists from "spotify-api.js";
import errorHandler from "@/util/ErrorHandler";
import { execPath } from "process";
import { PlaylistManager } from "spotify-api.js";
import PlaylistHelper from "./PlaylistHelper";

interface Props{
    spotifyClient: SpotifyClient
}

const Playlist = ({spotifyClient}: Props) => {//unfinished
    //perform initial search for playlists:
    const [playlistData,setPlaylistData] = useState<{ playlist?: PlaylistSimplified[] }>({});
    const [playlistArray,setPlaylistArray] = useState<string[]>();
    async function fetchUserPlaylists(spotifyClient: SpotifyClient) {
            try {
                const userPlaylists = spotifyClient?.fetch('/me/playlists');//get user playlists
                userPlaylists.then( async (playlists) => { 
                    const userPlaylists = playlists.items;
                    const fetchedPlaylistArray =  await PlaylistHelper({spotifyClient,userPlaylists});
                    setPlaylistArray(fetchedPlaylistArray);
                }).catch((e) => {
                    console.log(e);
                });
            }
        catch(e){
            console.log(e)
            //errorHandler(e);
        }
    };
    if (!playlistArray) fetchUserPlaylists(spotifyClient);
    useEffect(() => {
        fetchUserPlaylists(spotifyClient);
      }, [spotifyClient]);
    return(
        <div>
            <ul> Current Playlists:
                {playlistArray ? playlistArray.map((playlist,idx) => {
                   return <li key = {idx}>{playlist}</li>
                }): null}
            </ul>
        </div>
    );
}

export default Playlist;

