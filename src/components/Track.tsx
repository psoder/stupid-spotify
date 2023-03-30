import Image from "next/image";

type TrackProps = {
    name: string;
    artists: string[];
    imageUrl?: string;
};

const Track = ({ name, artists, imageUrl }: TrackProps) => {
    return (
        <div className="flex gap-3">
            <Image src={imageUrl ?? "/placeholder.png"} alt="album image" height={48} width={48} />
            <div>
                <p className="hide-long-text font-semibold">{name}</p>
                <p className="hide-long-text font-light">{artists.join(", ")}</p>
            </div>
        </div>
    );
};

export default Track;
