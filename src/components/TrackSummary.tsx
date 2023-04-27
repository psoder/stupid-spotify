import Image from "next/image";

type TrackProps = {
    name: string | undefined;
    artists: string[] | undefined;
    imageUrl?: string;
};

export const TrackSummary = ({
    name = "No title",
    artists = ["No artist"],
    imageUrl
}: TrackProps) => {
    return (
        <div className="flex w-full items-center gap-3">
            <div className="w-fill relative h-12 w-12 object-contain">
                <Image
                    src={imageUrl ?? "/placeholder.png"}
                    alt="album image"
                    fill
                    className="w-fit"
                />
            </div>
            <div className="flex w-[calc(100%-3rem-0.75rem)] flex-col gap-0.5">
                <p className="truncate text-sm text-white-bright">{name}</p>
                <p className="truncate text-sm text-gray-lightest hover:text-white-bright">
                    {artists?.join(", ")}
                </p>
            </div>
        </div>
    );
};
