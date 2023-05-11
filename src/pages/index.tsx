import { Authentication } from "@/components/common/Authentication";
import { TrackList } from "@/components/TrackList";
import { useSpotifyUserClient } from "@/hooks/useSpotifyUserClient";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import type { Track } from "spotify-api.js";
import { TbSearch } from "react-icons/tb";
import { PlaylistList } from "@/components/PlaylistList";

const Home: NextPage = () => {
    const { spotifyUserClient } = useSpotifyUserClient();

    const [spotifyData, setSpotifyData] = useState<{ tracks?: Track[] }>({});
    const [searchKey, setSearchKey] = useState("");

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
            <h2 className="text-2xl">Search track</h2>
            <form className="flex items-center" onSubmit={searchTracks}>
                <i className="float-left bg-white-bright">
                    <TbSearch className="text-gray-lightest" size={24} />
                </i>
                <input
                    placeholder="Search for interesting properties!"
                    size={40}
                    type="text"
                    onChange={(e) => setSearchKey(e.target.value)}
                    className="mr-5 border-spacing-10"
                />

                <button
                    className="rounded-full bg-green-deeper p-8 px-4 py-0.5 font-bold text-white-bright hover:bg-green-medium"
                    type={"submit"}
                >
                    Search
                </button>
            </form>
            <h2 className="text-3xl font-bold">Tracks</h2>
            <TrackList tracks={spotifyData.tracks ?? []} />

            <div className="fixed left-2 top-20 h-5/6">
                <PlaylistList />
            </div>
        </main>
    );
};

export default Home;
