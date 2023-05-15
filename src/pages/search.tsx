import { Authentication } from "@/components/common/Authentication";
import { TrackList } from "@/components/TrackList";
import { useSpotifyUserClient } from "@/hooks/useSpotifyUserClient";
//import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import type { Track } from "spotify-api.js";
import { TbSearch } from "react-icons/tb";
import { PlaylistList } from "@/components/PlaylistList";
import { getRandomWord } from "./api/luckywords";

const Home = () => {
    //randomword related

    const [wordpresent, setWordPresent] = useState("DH");
    const [manualsearch, setmanualsearch] = useState("");

    const handleLuckyClick = async () => {
        const word = await getRandomWord();

        setSearchKey(word);

        //setWordPresent(word + "+" + randomWord + "+" + searchKey);
        if (searchKey == manualsearch) {
            setWordPresent("");
        } else setWordPresent(searchKey);
    };

    const handleManualClick = async () => {
        setSearchKey(manualsearch);
    };

    const handleinput = (e) => {
        setSearchKey(e.target.value);
        setmanualsearch(e.target.value);
    };

    //spotify related
    const { spotifyUserClient } = useSpotifyUserClient();

    const [spotifyData, setSpotifyData] = useState<{ tracks?: Track[] }>({});

    const [searchKey, setSearchKey] = useState("DH");

    const { status } = useSession();

    if (status !== "authenticated") {
        return (
            <div className="mt-60 flex justify-center">
                <Authentication />
            </div>
        );
    }

    const searchTracks = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await spotifyUserClient?.client?.search(searchKey ?? "", {
                types: ["track"]
            });
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
        <main className="flex flex-col items-center p-5">
            {searchKey !== manualsearch ? (
                <h2 className="my-2 text-2xl font-bold">Your Lucky Word is: {wordpresent}</h2>
            ) : (
                <h2 className="my-2 text-2xl font-bold">
                    You are Manually Searching: {manualsearch}
                </h2>
            )}

            <div className="my-2 flex items-center">
                <i className="float-left bg-white-bright">
                    <TbSearch className="text-gray-lightest" size={24} />
                </i>

                <input
                    placeholder="Search by Yourself or Feel Lucky Again :D"
                    size={40}
                    type="text"
                    onChange={handleinput}
                    className="mr-5 border-spacing-10 "
                />
            </div>
            <form className="my-2 flex items-center" onSubmit={searchTracks}>
                <button
                    onClick={handleManualClick}
                    className="rounded-full bg-gradient-to-r from-green-darkest to-green-deeper p-8 px-4 py-0.5 font-bold text-green-50 shadow-lg hover:scale-105 hover:underline focus:outline-none"
                    type={"submit"}
                >
                    Search Songs
                </button>
                <button
                    onClick={handleLuckyClick}
                    className="ml-10 rounded-full bg-gradient-to-r from-green-darkest to-green-deeper p-8 px-4 py-0.5 font-bold text-green-50 shadow-lg hover:scale-105 hover:underline focus:outline-none"
                    type={"submit"}
                >
                    Lucky Button
                </button>
            </form>

            <h2 className="text-xl">Search Results:</h2>
            <div className="md:w-1/2">
                <TrackList tracks={spotifyData.tracks ?? []} />
            </div>

            <div className="fixed left-2 top-20 h-5/6 md:w-1/5">
                <PlaylistList />
            </div>
        </main>
    );
};

export default Home;
