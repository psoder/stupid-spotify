const PlaylistPrinter = ({ playlists }: { playlists: any }) => {
    console.log("playlist:");
    console.log(playlists);
    const playlistPrintCB = (playlist) => {
        return (
            <li key={playlist.id} className="playlist-item">
                <img
                    src={playlist?.images[0]?.url}
                    alt="album cover Photo"
                    height={48}
                    width={48}
                />
                <span className="playlist-name">{playlist.name}</span>
                <span>{playlist.description}</span>
                <a className="playlist-link" href={playlist.external_urls.spotify}>
                    link to playlist
                </a>
            </li>
        );
    };

    return (
        <div className="playlist-container">
            <ul className="playlist-list">
                {playlists.map((playlist) => playlistPrintCB(playlist))}
            </ul>
        </div>
    );
};

export default PlaylistPrinter;
