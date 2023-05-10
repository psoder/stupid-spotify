import Image from "next/image";
import { useState } from "react";
import { TbX } from "react-icons/tb";
import { Playlist } from "spotify-api.js";
import { Modal } from "../common/Modal";
import { PlaylistDisplay } from "./PlaylistDisplay";

export const PlaylistRow = ({ playlist }: { playlist: Playlist }) => {
    const [showPlaylistContent, setShowPlaylistContent] = useState(false);

    return (
        <>
            <div
                className="card-hover flex items-center gap-2 p-1"
                onClick={() => setShowPlaylistContent(true)}
            >
                <div className="w-fill relative h-12 w-12 object-contain">
                    <Image
                        src={playlist?.images[0]?.url ?? "/placeholder.png"}
                        alt="Playlist cover"
                        fill
                        className="w-fit"
                    />
                </div>
                <p className={`${showPlaylistContent && "text-primary"}`}>{playlist.name}</p>
            </div>

            <Modal
                isOpen={showPlaylistContent}
                onClose={() => setShowPlaylistContent(false)}
                className="items-center justify-center"
            >
                <div className="card h-[900px] w-[1000px] overflow-scroll bg-black-heavy p-16">
                    <div className="relative">
                        <button
                            className="absolute right-0 hover:text-primary"
                            onClick={() => setShowPlaylistContent(false)}
                        >
                            <TbX size={40} />
                        </button>
                        <PlaylistDisplay playlist={playlist} />
                    </div>
                </div>
            </Modal>
        </>
    );
};
