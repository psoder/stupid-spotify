export type SimpleTrack = {
    id: string;
    uri: string;
    href: string;
    name: string;
    album: Omit<SimpleAlbum, "tracks">;
    artists: SimpleArtist[];
    duration_ms: number;
};

export type LinkedTrack = {
    id: string;
};

export type SimpleArtist = {
    id: string;
    uri: string;
    href: string;
    name: string;
};

export type SimpleAlbum = {
    id: string;
    uri: string;
    href: string;
    name: string;
    images: Image[];
    tracks: SimpleTrack[];
    artists: SimpleArtist[];
};

export type Image = {
    url: string;
    height: number;
    width: number;
};
