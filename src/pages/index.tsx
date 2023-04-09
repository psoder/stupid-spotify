import TrackList from "@/components/trackList/TrackList";
import useSpotifyClient from "@/hooks/useSpotifyClient";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import type { Track } from "spotify-api.js";
import PlaylistMaker from "@/components/PlaylistMaker";

const Home = () => {
    const { spotifyClient } = useSpotifyClient();

    const [spotifyData, setSpotifyData] = useState<{ tracks?: Track[] }>({});
    const [searchKey, setSearchKey] = useState("");

    const searchTracks = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await spotifyClient?.search(searchKey ?? "", { types: ["track"] });
            setSpotifyData({ ...spotifyData, tracks: res?.tracks });
        } catch (e) {
            let message = `Something went wrong. See the console for more information.`;

            if (e instanceof Error) {
                const { error } = JSON.parse(e.message);

                if (error.message) {
                    message = `${error.message}.`;
                }

                switch (error.status) {
                    case 400:
                        message = `${message} Please search for something.`;
                        break;
                    case 401:
                        message = `${message} Please try signing out and in.`;
                        break;
                }
            }

            console.error(e);
            toast.error(message);
        }
    };

    return (
        <>
            <Head>
                <title>Stupid Spotify</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/doughnut-cat.png" />
            </Head>
            <main className="flex flex-col items-center p-5">
                <h2 className="text-2xl">Search track</h2>
                <form onSubmit={searchTracks}>
                    <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
                    <button className="button" type={"submit"}>
                        Search
                    </button>
                </form>
                <TrackList tracks={spotifyData.tracks ?? []} />
                {spotifyClient? <PlaylistMaker spotifyClient = {spotifyClient}/> : null}
            </main>
        </>
    );
};
export default Home;
