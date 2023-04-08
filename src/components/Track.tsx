import Image from "next/image";

type TrackProps = {
    name: string;
    artists: string[];
    imageUrl?: string;
};

const Track = ({ name, artists, imageUrl }: TrackProps) => {
    return (
        <div className="flex w-full gap-3">
            <Image
                src={imageUrl ?? "/placeholder.png"}
                alt="album image"
                height={48}
                width={48}
                className="w-fit"
            />
            <div className="flex w-[calc(100%-48px-0.75rem)] flex-col gap-1">
                <p className="truncate text-sm text-white-bright">{name}</p>
                <p className="truncate text-sm text-gray-lightest hover:text-white-bright">
                    {artists.join(", ")}
                </p>
            </div>
        </div>
    );
};

export default Track;
