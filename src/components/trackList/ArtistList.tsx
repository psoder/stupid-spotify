import { Artist } from "spotify-api.js";
import ArtistListRow from "./ArtistListRow";
const ArtistList = ({ artists }: { artists: Artist[] }) => {
    //still some work do do // Oskar
    return (
        <div className="flex min-w-[700px] max-w-screen-lg flex-col items-center">
            <h2 className="self-start text-3xl font-bold">Tracks</h2>
            <div className="flex flex-col gap-1">
                {artists.length > 0 ? (
                    artists.map((artist) => <ArtistListRow key={artist.id} artist={artist} />)
                ) : (
                    <>No artists</>
                )}
            </div>
        </div>
    );
};

export default ArtistList;
